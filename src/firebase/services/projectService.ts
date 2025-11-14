// services/projectService.ts
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "../firebaseConfig";
import { normalizeString } from "../helpers";
import { uploadFile } from "../cloudinary";
import { Project } from "@/types";

/**
 * Types
 */
export type OrganisationDoc = {
  id: string;
  name: string;
  category: string;
  subcategory?: string | null;
  description?: string | null;
  projects?: string[];
  createdAt?: any;
};

export type ProjectInput = {
  organizationName: string;
  ProjectTitle: string;
  projectDescription: string;
  orgdescription: string;
  status: string;
  specificLocation: string[];
  region: string[];        // e.g. ["Lagos", "Ikeja"]
  images?: File[];   
  pdf?:File;   
  startDate: string;
  endDate: string;
  fundingSource: string;
  budgetAmount: string;
  specificObjectives: string;
  interventionLogic: string;
  programs: string[];     // e.g. ["education", "health"]
  partners: string[];     // e.g. ["Partner A"]
  category: string;
  subcategory?: string | null;
  projectType: string;
   projectReview? : "Pending", 
   projectImpact:string;
    websiteLink:string;
   
};

/**
 * Helper: normalize strings for comparisons
//  */
// function normalizeString(s?: string) {
//   return (s || "").trim().toLowerCase();
// }

/**
 * Helper: Check if organization should be deleted (has no projects)
 */
async function checkAndDeleteOrganizationIfEmpty(orgId: string): Promise<void> {
  try {
    // Get the organization document
    const orgRef = doc(db, "organisations", orgId);
    const orgSnap = await getDoc(orgRef);
    
    if (!orgSnap.exists()) {
      return; // Already deleted or doesn't exist
    }
    
    const orgData = orgSnap.data();
    const projectIds: string[] = orgData.projects || [];
    
    // Check if organization has any projects
    if (projectIds.length === 0) {
      // Delete the organization
      await deleteDoc(orgRef);
      console.log(`Organization ${orgId} deleted - no projects remaining`);
    } else {
      // Double-check: verify that the projects in the array actually exist
      const existingProjects: string[] = [];
      
      for (const projectId of projectIds) {
        const projectRef = doc(db, "projects", projectId);
        const projectSnap = await getDoc(projectRef);
        if (projectSnap.exists()) {
          existingProjects.push(projectId);
        }
      }
      
      // If some projects in the array don't exist, update the organization
      if (existingProjects.length !== projectIds.length) {
        if (existingProjects.length === 0) {
          // No projects exist, delete organization
          await deleteDoc(orgRef);
          console.log(`Organization ${orgId} deleted - no valid projects remaining`);
        } else {
          // Update organization with only existing projects
          await updateDoc(orgRef, { projects: existingProjects });
        }
      }
    }
  } catch (error) {
    console.error(`Error checking organization ${orgId}:`, error);
  }
}

/**
 * Helper: Delete rejected projects older than 10 days
 */
export async function cleanupRejectedProjects(): Promise<void> {
  try {
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
    
    // Query for rejected projects
    const projectsRef = collection(db, "projects");
    const q = query(projectsRef, where("projectReview", "==", "Rejected"));
    const snapshot = await getDocs(q);
    
    const projectsToDelete: string[] = [];
    const organizationsToCheck: Set<string> = new Set();
    
    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      let rejectionDate: Date;
      
      // Check if there's a rejectedAt timestamp, otherwise use createdAt
      if (data.rejectedAt) {
        rejectionDate = data.rejectedAt.toDate();
      } else if (data.createdAt) {
        rejectionDate = data.createdAt.toDate();
      } else {
        // If no date available, assume it's old enough to delete
        rejectionDate = new Date(0);
      }
      
      if (rejectionDate < tenDaysAgo) {
        projectsToDelete.push(doc.id);
        if (data.organizationId) {
          organizationsToCheck.add(data.organizationId);
        }
      }
    });
    
    // Delete the projects
    for (const projectId of projectsToDelete) {
      await deleteDoc(doc(db, "projects", projectId));
      console.log(`Deleted rejected project: ${projectId}`);
    }
    
    // Remove project references from organizations and check if they should be deleted
    for (const orgId of organizationsToCheck) {
      const orgRef = doc(db, "organisations", orgId);
      
      // Remove deleted project IDs from the organization's projects array
      for (const projectId of projectsToDelete) {
        await updateDoc(orgRef, {
          projects: arrayRemove(projectId)
        });
      }
      
      // Check if organization should be deleted
      await checkAndDeleteOrganizationIfEmpty(orgId);
    }
    
    console.log(`Cleanup completed. Deleted ${projectsToDelete.length} rejected projects.`);
  } catch (error) {
    console.error("Error during cleanup:", error);
  }
}

/**
 * Helper: Delete a single project and cleanup organization if needed
 */
export async function deleteProject(projectId: string): Promise<void> {
  try {
    // First get the project to find its organization
    const projectRef = doc(db, "projects", projectId);
    const projectSnap = await getDoc(projectRef);
    
    if (!projectSnap.exists()) {
      throw new Error("Project not found");
    }
    
    const projectData = projectSnap.data();
    const organizationId = projectData.organizationId;
    
    // Delete the project
    await deleteDoc(projectRef);
    
    // Remove project from organization's projects array
    if (organizationId) {
      const orgRef = doc(db, "organisations", organizationId);
      await updateDoc(orgRef, {
        projects: arrayRemove(projectId)
      });
      
      // Check if organization should be deleted
      await checkAndDeleteOrganizationIfEmpty(organizationId);
    }
    
    console.log(`Project ${projectId} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting project ${projectId}:`, error);
    throw error;
  }
}

/**
 * Find existing organisation by name + category + subcategory (case-insensitive)
 * Returns the doc (with id) if exists, otherwise null.
 */
export async function findOrganisationByFields({
  name,
  category,
  subcategory,
}: {
  name: string;
  category: string;
  subcategory?: string | null;
}): Promise<OrganisationDoc | null> {
  const orgsRef = collection(db, "organisations");

   const normalizedName = name.trim().toLowerCase();
  const normalizedSubcategory = subcategory ? subcategory.trim().toLowerCase() : null;


  // Query by category and name (we'll do client-side subcategory match if necessary)
  const q = query(
    orgsRef,
    where("category", "==", category),
    where("normalizedName", "==", normalizedName),
     where("subcategory", "==", subcategory ?? null)
    // we can't index-case-insensitively in Firestore; we'll filter name client-side
  );

   const snap = await getDocs(q);
  if (!snap.empty) {
    const d = snap.docs[0];
    return { id: d.id, ...(d.data() as any) } as OrganisationDoc;
  }

  return null;
}

/**
 * Create organisation document
 */
export async function createOrganisation({
  name,
  category,
  subcategory = null,
  description = null,
}: {
  name: string;
  category: string;
  subcategory?: string | null;
  description?: string | null;
}): Promise<OrganisationDoc & { normalizedName: string }> {
  const orgRef = collection(db, "organisations");
  const docRef = await addDoc(orgRef, {
    name,
    normalizedName: name.trim().toLowerCase(), // Add normalized name for consistent querying
    category,
    subcategory: subcategory ?? null,
    description: description ?? null,
    projects: [],
    createdAt: serverTimestamp(),
  });

  // Return created object with id
  
  return {
    id: docRef.id,
    name,
    normalizedName: name.trim().toLowerCase(),
    category,
    subcategory: subcategory ?? null,
    description: description ?? null,
    projects: [],
    createdAt: null,
  };
}

/**
 * Upload up to 2 images to storage under `projects/{projectId}/img-{n}`
 * Returns array of download URLs
 */
export async function uploadProjectImages(files?: File[]): Promise<string[]> {
    
  if (!files || files.length === 0) return [];

  if (files.length > 2) {
    throw new Error(`Maximum de 2 images autorisées.`);
  }

   const urls: string[] = [];
  for (const file of files) {
    const url = await uploadFile(file, "projects_preset");
    urls.push(url);
  }
  return urls;
}

/**
 * Create project and link to organisation.
 * - If organisation exists (case-insensitive match on name + cat + subcat) -> reuse it
 * - Otherwise create org
 * - Create project doc in `projects` collection
 * - upload images and update project doc with image URLs
 * - add projectId to organisation.projects array via arrayUnion
 *
 * Returns the created project object (including id).
 */
export async function createProjectAndMaybeOrganisation(
  projectInput: ProjectInput
) {
  
  // Validate images count
  if (projectInput.images && projectInput.images.length > 2) {
    throw new Error(`Maximum de 2 images autorisées.`);
  }
  

  // 1. Find or create organisation
  let organisation = await findOrganisationByFields({
    name: projectInput.organizationName,
    category: projectInput.category,
    subcategory: projectInput.subcategory || null,
  });

  if (!organisation) {
    organisation = await createOrganisation({
      name: projectInput.organizationName,
      category: projectInput.category,
      subcategory: projectInput.subcategory || null,
      description: projectInput.orgdescription || null,
    });
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // 2. Create project doc (without images URLs yet)
  const projectsRef = collection(db, "projects");
  const user = auth.currentUser;
  if (!user) throw new Error(`Vous devez être connecté pour créer un projet.`);

  const projectDocRef = await addDoc(projectsRef, {
    organizationName: projectInput.organizationName,
    ProjectTitle: projectInput.ProjectTitle,
    projectDescription: projectInput.projectDescription,
    orgdescription: projectInput.orgdescription,
    status: projectInput.status || "completed",
    specificLocation: projectInput.specificLocation,
    region: projectInput.region,
    images: [], // will fill after upload
    pdf:null,
    startDate: projectInput.startDate,
    endDate: projectInput.endDate,
    fundingSource: projectInput.fundingSource,
    budgetAmount: projectInput.budgetAmount,
    specificObjectives: projectInput.specificObjectives,
    interventionLogic: projectInput.interventionLogic,
    programs: projectInput.programs,
    partners: projectInput.partners,
    category: projectInput.category,
    subcategory: projectInput.subcategory ?? null,
    projectType: projectInput.projectType,
    projectReview : "Pending", 
    projectImpact:projectInput.projectImpact,
    websiteLink: projectInput.websiteLink,
    createdBy: user.uid,
    organizationId: organisation.id,
    createdAt: serverTimestamp(),
  });

  const projectId = projectDocRef.id;

  let pdfUrl = null;

if (projectInput.pdf instanceof File) {
  pdfUrl = await uploadFile(projectInput.pdf, "projects_preset");
}   else if (typeof projectInput.pdf === "string") {
    pdfUrl = projectInput.pdf;
  }

  // 3. Upload images and update project doc with URLs
  const imageUrls = await uploadProjectImages(projectInput.images);
  if (imageUrls.length > 0) {
    await updateDoc(projectDocRef, { ...projectInput, images: imageUrls, pdf: pdfUrl });
  }


  // 4. Add project id to organisation.projects array
  
  const orgDocRef = doc(db, "organisations", organisation.id);

  await updateDoc(orgDocRef, {
    projects: arrayUnion(projectId),
  });

  // 5. Return assembled project object (read from doc to include serverTimestamp fields)
  const createdProjectSnap = await getDoc(projectDocRef);
  if (!createdProjectSnap.exists()) throw new Error(`Échec de la lecture du projet créé.`);

  const createdProject = { id: createdProjectSnap.id, ...(createdProjectSnap.data() as any) };

  return { project: createdProject, organisationId: organisation.id };
}

/**
 * Fetch all organisations
 */
export async function fetchAllOrganisations(): Promise<OrganisationDoc[]> {
  const q = collection(db, "organisations");
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
}

/**
 * Fetch projects for a given organisation id (returns full project docs)
 */
export async function fetchProjectsByOrganisationId(orgId: string) {
   const q = query(
    collection(db, "projects"),
    where("organizationId", "==", orgId)
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as any));
}
// 2. Fetch organisations with no subCategory
export async function fetchOrganisationsWithoutSubcategory() {
  const q = query(collection(db, "organisations"), where("subcategory", "==", null));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// 3. Fetch organisations with subCategory
export async function fetchOrganisationsWithSubcategory() {

  const q = query(collection(db, "organisations"), where("subcategory", "!=", null));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
/**
 * Fetch a particular project under a particular organisation
 * (verifies that the project id belongs to the organisation)
 */
export async function fetchProjectByOrgAndProjectId(orgId: string, projectId: string) {

  const orgSnap = await getDoc(doc(db, "organisations", orgId));
  if (!orgSnap.exists()) throw new Error(`Organisation introuvable`);
  const orgData = orgSnap.data() as any;
  const projectIds: string[] = orgData.projects || [];

  if (!projectIds.includes(projectId)) {
    throw new Error(`Le projet n\'appartient pas à cette organisation.`);
  }

  const pSnap = await getDoc(doc(db, "projects", projectId));
  if (!pSnap.exists()) throw new Error(`Projet introuvable.`);
  return { id: pSnap.id, ...(pSnap.data() as any) };
}

/**
 * Fetch a project directly by its projectId
 * Useful for routes like /projects/:id
 */
export async function fetchProjectById(projectId: string) {

  const projectRef = doc(db, "projects", projectId);
  const projectSnap = await getDoc(projectRef);

  if (!projectSnap.exists()) throw new Error(`Projet introuvable.`);

  return { id: projectSnap.id, ...(projectSnap.data() as any) };
}

export async function fetchAcceptedProjects() {
  const projectsRef = collection(db, "projects");
  const q = query(projectsRef, where("projectReview", "==", "Accepted"));
  const snap = await getDocs(q);

  return snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as any) }));
}
export async function fetchReviewProjects() {
  const projectsRef = collection(db, "projects");
  const q = query(projectsRef, where("projectReview", "==", "Pending"));
  const snap = await getDocs(q);

  return snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as any) }));
}

export async function fetchOrganisationById(orgId: string) {

  const orgRef = doc(db, "organisations", orgId);
  const snap = await getDoc(orgRef);

  if (!snap.exists()) {
    throw new Error('Organisation introuvable.');
  }

  return { id: snap.id, ...snap.data() } as any;
}

export async function updateProjectReview(projectId: string, status: "Accepted" | "Rejected") {
  const projectRef = doc(db, "projects", projectId);
  const updateData: any = {
    projectReview: status,
  };
  
  // Add timestamp when project is rejected for cleanup purposes
  if (status === "Rejected") {
    updateData.rejectedAt = serverTimestamp();
  }
  
  await updateDoc(projectRef, updateData);
}

export async function fetchAllProjects() {
  const snapshot = await getDocs(collection(db, "projects"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * Batch cleanup function - cleans up rejected projects and empty organizations
 * This should be called periodically (e.g., via a cron job or scheduled function)
 */
export async function performScheduledCleanup(): Promise<void> {

  // Clean up rejected projects
  await cleanupRejectedProjects();
  
  // Clean up any remaining empty organizations
  try {
    const orgs = await fetchAllOrganisations();
    for (const org of orgs) {
      await checkAndDeleteOrganizationIfEmpty(org.id);
    }
  } catch (error) {
    console.error("Error during organization cleanup:", error);
  }
  
}
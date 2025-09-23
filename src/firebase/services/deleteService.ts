import {
  collection,
  doc,
  deleteDoc,
  getDoc,
  getDocs,
  updateDoc,
  arrayRemove,
  where,
  query,
  arrayUnion,
} from "firebase/firestore";
import { db, auth } from "../firebaseConfig";



export async function deleteUserAccount(userId: string, actorCategory: string) {
  // delete profile
  await deleteDoc(doc(db, "users", userId));


  // delete projects matching actorCategory
  const projQ = query(
    collection(db, "projects"),
    where("category", "==", actorCategory)
  );
  const projSnap = await getDocs(projQ);
  for (const p of projSnap.docs) {
    await deleteProject(p.id);
  }

  // finally delete Firebase Auth account
  const user = auth.currentUser;
  if (user && user.uid === userId) {
    await user.delete();
  }
}

export async function deleteArticle(articleId: string) {
  const articleRef = doc(db, "articles", articleId);
  const snap = await getDoc(articleRef);
  if (!snap.exists()) return;

  const data = snap.data() as any;
if (data.imageUrl || data.documentUrl) {
    console.warn("Remember to manually delete media from Cloudinary:", {
      imageUrl: data.imageUrl,
      documentUrl: data.documentUrl,
    });
  }
  await deleteDoc(articleRef);
}


export async function deleteDocument(documentId: string) {
  const docRef = doc(db, "documents", documentId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return;

  const data = snap.data() as any;

  if (data.fileUrl) {
    try {
 if (data.documentUrl) {
    console.warn("Remember to manually delete document from Cloudinary:", data.documentUrl);
  }

    } catch (err) {
        
      console.warn("Failed to delete document file:", err);
    }
  }

  await deleteDoc(docRef);
}


export async function deleteProject(projectId: string) {
  const projectRef = doc(db, "projects", projectId);
  const projectSnap = await getDoc(projectRef);
  if (!projectSnap.exists()) throw new Error("Project not found.");
  const projectData = projectSnap.data() as any;

  // Delete images
if (projectData.images?.length) {
    console.warn("Remember to manually delete project images from Cloudinary:", projectData.images);
  }

  // Remove from organisation
  const orgSnap = await getDocs(collection(db, "organisations"));
  for (const orgDoc of orgSnap.docs) {
    const orgData = orgDoc.data() as any;
    if ((orgData.projects || []).includes(projectId)) {
      const orgRef = doc(db, "organisations", orgDoc.id);
      await updateDoc(orgRef, { projects: arrayUnion() });
      await updateDoc(orgRef, { projects: orgData.projects.filter((id: string) => id !== projectId) });
      // delete org if empty
      if ((orgData.projects.length - 1) === 0) await deleteDoc(orgRef);
      break;
    }
  }

  // Delete project doc
  await deleteDoc(projectRef);
}

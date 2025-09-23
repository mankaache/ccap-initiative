import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { uploadFile } from "../cloudinary";

export async function updateProject(
  projectId: string,
  updates: any,
  newImages?: File[]
) {
  const projectRef = doc(db, "projects", projectId);
  const projectSnap = await getDoc(projectRef);

  if (!projectSnap.exists()) {
    throw new Error(`Projet introuvable.`);
  }

  const old = projectSnap.data() as any;

  // Handle images
  let imageUrls = old.images || [];
  if (newImages && newImages.length > 0) {
    imageUrls = await Promise.all(
      newImages.map((file) => uploadFile(file, "projects_preset"))
    );
  }

  await updateDoc(projectRef, {
    ...updates,
    images: imageUrls, // always set images
    updatedAt: serverTimestamp(),
  });

  return { id: projectId, ...updates, images: imageUrls }; // optional return
}



export const updateArticle = async (
      articleId: string,
  updates: any,
  newImage?: File,
  newDoc?: File,

) => {

   const articleRef = doc(db, "articles", articleId);

     const snap = await getDoc(articleRef);
  if (!snap.exists()) throw new Error('Article introuvable.');
  const old = snap.data();

    // Replace files in Cloudinary if new ones are provided
  const imageUrl = newImage ? await uploadFile(newImage, "article_presets") : old.imageUrl || null;
  const documentUrl = newDoc ? await uploadFile(newDoc, "article_presets") : old.documentUrl || null;

    await updateDoc(articleRef, {
    ...updates,
    ...(imageUrl ? { imageUrl } : {}),
    ...(documentUrl ? { documentUrl } : {}),
     updatedAt: new Date().toISOString(),
  });
};




export const updateDocument = async (
  docId: string,
  updates: any,
  newFile?: File
) => {

      const docRef = doc(db, "documents", docId);
        const snap = await getDoc(docRef);
  if (!snap.exists()) throw new Error(`Document introuvable.`);
  const old = snap.data() as any;

  const documentUrl  = newFile
    ? await uploadFile(newFile, "document_preset")
    : old.documentUrl || null;
  await updateDoc(docRef, { ...updates, ...(documentUrl  ? { documentUrl  } : {}) });

};


export const updateUserProfile = async (
  userId: string,
  updates: {
    firstName?: string;
    lastName?: string;
    actorCategory?: string;
    oldAvatarUrl?: string;
  }
) => {
 

  const userRef = doc(db, "users", userId);

  await updateDoc(userRef, {
    ...(updates.firstName && { firstName: updates.firstName }),
    ...(updates.lastName && { lastName: updates.lastName }),
    ...(updates.actorCategory && { actorCategory: updates.actorCategory }),
    // ...(avatarUrl && { avatarUrl }),
    updatedAt: new Date().toISOString(),
  });
};


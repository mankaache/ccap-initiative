// lib/authService.ts

import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export async function signUpAdmin({ firstName, lastName, email, password, inviteKey }: any) {

  if (inviteKey !== process.env.NEXT_PUBLIC_ADMIN_INVITE_KEY) {
    throw new Error(`Clé d\'invitation administrateur`);
  }

  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    firstName,
    lastName,
    email,
    role: "admin",
    createdAt: new Date(),
  });

  await sendEmailVerification(user);

  return user;
}

// ✅ Update project review (Accepted / Rejected)
export async function updateProjectReview(projectId: string, reviewStatus: "Accepted" | "Rejected") {
   
  const projectRef = doc(db, "projects", projectId);


  await updateDoc(projectRef, {
    projectReview: reviewStatus,
  });

  return { success: true, message: `Révision du projet mise à jour vers ${reviewStatus}` };
}
// how to use 
// await updateProjectReview("proj123", "Accepted");

import { collection, getDocs, query, where, getDoc } from "firebase/firestore";


// ✅ 1. Fetch ALL documents (with their IDs)
export async function fetchAllDocuments() {
  const snapshot = await getDocs(collection(db, "documents"));
  const docs = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return docs;
}

// ✅ 2. Fetch documents by category
export async function fetchDocumentsByCategory(category: string) {
  const q = query(
    collection(db, "documents"),
    where("category", "==", category)
  );
  const snapshot = await getDocs(q);
  const docs = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return docs;
}

// ✅ 3. Fetch a single document by ID
export async function fetchDocumentById(id: string) {
  const docRef = doc(db, "documents", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return {
    id: docSnap.id,
    ...docSnap.data(),
  };
}

export async function fetchAllArticles() {
  const snapshot = await getDocs(collection(db, "articles"));
  const articles = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return articles;
}


export async function fetchArticleById(id: string) {
  const docRef = doc(db, "articles", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return {
    id: docSnap.id,
    ...docSnap.data(),
  };
}
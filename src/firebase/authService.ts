// lib/authService.ts
import { auth, db } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export async function signUpActor({ fullName, email, password, actorCategory }: any) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
    if (!user)  return console.log("No user signed in yet!");

  // save profile in Firestore
  await setDoc(doc(db, "users", user.uid), {
    fullName,
    email,
    role: "actor",
    actorCategory,
    createdAt: new Date(),
  });

  // send email verification
  await sendEmailVerification(user);

  return user;
}

export async function loginUser(email: string, password: string) {
  
   const userCredential = await signInWithEmailAndPassword(auth, email, password); 
   const user = userCredential.user; 
   if (!user.emailVerified) 
    { 
      toast.error('vVeuillez vérifier votre adresse e-mail avant de vous connecter.'); 
      throw new Error('Veuillez vérifier votre adresse e-mail avant de vous connecter.'); } 
      // fetch role from Firestore 
      const docRef = doc(db, "users", user.uid); 
      const snap = await getDoc(docRef); if (!snap.exists()) 
        throw new Error('utilisateur introuvable'); 
        return { ...user, ...snap.data() }; 
    }



export async function resetPassword(email: string) {
  await sendPasswordResetEmail(auth, email);
}

export async function logout() {
  await signOut(auth);
}


//whenever you need logged in user 
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

export function watchUser(callback: (user: any | null) => void) {
  return onAuthStateChanged(auth, async (user) => {
    if (!user)  return console.log("No user signed in yet!");

    if (user) {
      const snap = await getDoc(doc(db, "users", user.uid));
      callback({ uid: user.uid, email: user.email, ...snap.data() });
    } else {
      callback(null);
    }
  });
}

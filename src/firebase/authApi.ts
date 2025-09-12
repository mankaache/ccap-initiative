// // src/firebase/authApi.js
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   sendEmailVerification,
//   sendPasswordResetEmail,
//   updateProfile,
//   onAuthStateChanged,
//   signOut,
//   getIdToken,
//   setPersistence,
//   browserLocalPersistence
// } from "firebase/auth";

// import { doc, setDoc, serverTimestamp, query, where, getDocs, collection } from "firebase/firestore";
// import { auth, db } from "./clientApp";

// // OPTIONAL: set persistence (keeps user logged in across reloads)
// setPersistence(auth, browserLocalPersistence).catch(e => {
//   console.warn("Failed to set persistence:", e);
// });

// /* SIGN UP */
// //@ts-ignore
// export async function signUpWithEmail({ name, email, password }) {
//   // 1) create auth user
//   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//   const user = userCredential.user;

//   // 2) set displayName in the Auth profile (so user.displayName is available)
//   await updateProfile(user, { displayName: name });

//   // 3) OPTIONAL: create a user doc in Firestore for app data (organization, profile, etc.)
//   await setDoc(doc(db, "users", user.uid), {
//     displayName: name,
//     email,
//     createdAt: serverTimestamp()
//   });

//   // 4) send verification email
//   await sendEmailVerification(user);

//   return user;
// }



// /* SIGN IN (email + password) */
// export async function signInWithEmail({ email, password }) {
//   const userCredential = await signInWithEmailAndPassword(auth, email, password);
//   return userCredential.user;
// }

// /* SIGN IN by "name + password" (OPTIONAL) 
//    - This requires that 'users' collection stores unique displayName -> email mapping.
//    - CAVEATS: displayName must be unique; this is less common than email login.
// */
// export async function signInWithName({ name, password }) {
//   // find the matching user document
//   const q = query(collection(db, "users"), where("displayName", "==", name));
//   const snap = await getDocs(q);
//   if (snap.empty) throw new Error("No user found with that name");
//   if (snap.size > 1) throw new Error("Multiple users found with that name; use email to sign in");

//   const userDoc = snap.docs[0].data();
//   const email = userDoc.email;
//   return signInWithEmail({ email, password });
// }

// /* SEND PASSWORD RESET */
// export async function sendPasswordReset(email) {
//   await sendPasswordResetEmail(auth, email);
// }

// /* SIGN OUT */
// export async function logout() {
//   await signOut(auth);
// }

// /* GET ID TOKEN (useful for backend) */
// export async function getUserToken() {
//   const user = auth.currentUser;
//   if (!user) return null;
//   return user.getIdToken(); // or getIdToken(true) to force refresh
// }

// /* AUTH STATE LISTENER - you will use onAuthStateChanged in a provider (below) */
// export function attachAuthListener(callback) {
//   return onAuthStateChanged(auth, callback);
// }

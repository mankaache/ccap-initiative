import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setLoading(false);

      // redirect if on login/signup page
      handleRedirect(parsedUser);
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        let fullUser = null;

        if (!storedUser) {
          const docRef = doc(db, "users", firebaseUser.uid);
          const snap = await getDoc(docRef);

          if (snap.exists()) {
            fullUser = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              emailVerified: firebaseUser.emailVerified,
              ...snap.data(),
            };
            localStorage.setItem("userProfile", JSON.stringify(fullUser));
          } else {
            fullUser = firebaseUser; // fallback
          }
        } else {
          fullUser = JSON.parse(storedUser);
        }

        setUser(fullUser);
        handleRedirect(fullUser);
      } else {
        setUser(null);
        localStorage.removeItem("userProfile");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  function handleRedirect(userData: any) {
    if (!userData) return;

    // only redirect from login or signup pages
    const path = window.location.pathname;
    if (path.startsWith("/auth")) {
      if (userData.role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/actor/dashboard");
      }
    }
  }

  return { user, loading };
}

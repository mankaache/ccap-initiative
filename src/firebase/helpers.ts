import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebaseConfig";

export function normalizeString(s?: string) {
  return (s || "").trim().toLowerCase();
}


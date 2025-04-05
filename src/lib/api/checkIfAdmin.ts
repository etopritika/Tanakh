import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useUserStore } from "@/store/use-user-store";

export const checkIfAdmin = async (): Promise<void> => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.log("[checkIfAdmin] No authenticated user found.");
    useUserStore.getState().setUserRole("user");
    return;
  }

  try {
    const docRef = doc(db, "admins", user.uid);
    const docSnap = await getDoc(docRef);
    const isAdmin = docSnap.exists();

    const role = isAdmin ? "admin" : "user";
    useUserStore.getState().setUserRole(role);
  } catch {
    useUserStore.getState().setUserRole("user");
  }
};

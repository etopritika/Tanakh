import { FirebaseError } from "firebase/app";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { UseFormSetError } from "react-hook-form";

import { getFirebaseErrorMessage } from "@/components/Auth/firebaseError";
import { facebookAuthProvider, googleAuthProvider, app } from "@/lib/firebase";
import { useUserStore } from "@/store/use-user-store";

const { setUserName } = useUserStore.getState();

type SetErrorType = UseFormSetError<{ email: string; password: string }>;

export const signInWithGoogle = async (
  event: React.MouseEvent<HTMLButtonElement>,
  setError: SetErrorType,
  navigate: (path: string, options?: { replace?: boolean }) => void,
) => {
  event.preventDefault();
  const auth = getAuth(app);
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const token = await result.user.getIdToken();
    localStorage.setItem("token", token);
    localStorage.setItem("uid", result.user.uid);
    setUserName(result.user.displayName || null);

    navigate("/", { replace: true });
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      setError("email", { message: getFirebaseErrorMessage(error.code) });
    } else {
      setError("email", {
        message: "Неизвестная ошибка, попробуйте ещё раз позже.",
      });
    }
  }
};

export const signInWithFacebook = async (
  event: React.MouseEvent<HTMLButtonElement>,
  setError: SetErrorType,
  navigate: (path: string, options?: { replace?: boolean }) => void,
) => {
  event.preventDefault();
  const auth = getAuth(app);
  try {
    const result = await signInWithPopup(auth, facebookAuthProvider);
    const token = await result.user.getIdToken();
    localStorage.setItem("token", token);
    localStorage.setItem("uid", result.user.uid);
    setUserName(result.user.displayName || null);

    navigate("/", { replace: true });
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      setError("email", { message: getFirebaseErrorMessage(error.code) });
    } else {
      setError("email", {
        message: "Неизвестная ошибка, попробуйте ещё раз позже.",
      });
    }
  }
};

export const sendResetPasswordEmail = async (email: string) => {
  const auth = getAuth(app);
  await sendPasswordResetEmail(auth, email);
};

import { auth, db } from "@/lib/firebase";
import User, { USER_COLLECTION } from "@/modules/auth/entities/User";
import { setCurrentUser } from "@/modules/auth/store";
import { useAppDispatch } from "@/store/hooks";
import {
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useEffect } from "react";

export default function useAuthService() {
  const dispatch = useAppDispatch();

  const storeUser = async (data: User) => {
    await addDoc(collection(db, USER_COLLECTION), {
      ...data,
    });
  };

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return auth.signOut();
  }

  async function signInWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();

    return await signInWithPopup(auth, provider);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, []);

  return {
    storeUser,
    signup,
    login,
    logout,
    signInWithGoogle,
  };
}

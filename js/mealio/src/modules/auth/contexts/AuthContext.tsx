import React, { useContext, useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

interface Props {
  children: React.ReactNode;
}

type AuthContextType = {
  currentUser: User | null | undefined;
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<UserCredential>;
};

const AuthContext = React.createContext<AuthContextType>({
  currentUser: null,
  signup: () => new Promise<UserCredential>((_, reject) => reject()),
  login: () => new Promise<UserCredential>((_, reject) => reject()),
  logout: () => new Promise<void>((resolve) => resolve()),
  signInWithGoogle: () => new Promise<UserCredential>((_, reject) => reject()),
});

export function useAuth() {
  return useContext<AuthContextType>(AuthContext);
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);

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
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, signup, login, logout, signInWithGoogle }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

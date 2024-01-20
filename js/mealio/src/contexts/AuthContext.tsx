import React, { useContext, useState, useEffect } from "react";
import { auth } from "../vendor/firebase";
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

interface Props {
  children: React.ReactNode;
}

type AuthContextType = {
  currentUser: User | null | undefined;
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextType>({
  currentUser: null,
  signup: () => new Promise<UserCredential>((_, reject) => reject()),
  login: () => new Promise<UserCredential>((_, reject) => reject()),
  logout: () => new Promise<void>((resolve) => resolve()),
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

import React from "react";
import {
  User,
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../config/firebase";

interface IAppContextDefaultValue {
  user: User | null;
  registerUser: (email: string, password: string) => void;
  loginUser: (email: string, password: string) => void;
}

export const AppContext = React.createContext<IAppContextDefaultValue>(
  {} as IAppContextDefaultValue
);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);

  onAuthStateChanged(auth, (userAuth) => {
    setUser(userAuth);
  });

  const registerUser = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  const value = {
    user,
    registerUser,
    loginUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

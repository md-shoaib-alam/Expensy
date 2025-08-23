import { auth, firestore } from "@/config/firebase";
import { AuthContextType, UserType } from "@/types";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType>(null);
  const router = useRouter();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Try to get name from Firestore if displayName is missing
        let name = firebaseUser.displayName;
        if (!name) {
          const docRef = doc(firestore, "users", firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          name = docSnap.exists() ? docSnap.data().name : null;
        }
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name,
        });
        // @ts-ignore
        router.replace("/(tabs)");
      } else {
        setUser(null);
        router.replace("/(auth)/welcome");
      }
    });

    return () => unsub();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      console.log("error message", msg);
      if (msg.includes("(auth/invalid-credential)")) msg = "wrong credentials";
      if (msg.includes("(auth/invalid-email)")) msg = "Invalid Email";

      return { success: false, msg };
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      let response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(response.user, { displayName: name });
      await setDoc(doc(firestore, "users", response?.user?.uid), {
        name,
        email,
        uid: response.user?.uid,
      });
      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      console.log("error message", msg);
      if (msg.includes("(auth/email-already-in-use)"))
        msg = "This email is already used";
      if (msg.includes("(auth/invalid-email)")) msg = "Invalid Email";
      return { success: false, msg };
    }
  };

  const updateUserData = async (uid: string) => {
    try {
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const userData: UserType = {
          uid: data?.uid || null,
          email: data?.email || null,
          name: data?.name || null,
          image: data.image || null,
        };
        setUser({ ...userData });
      }
    } catch (error: any) {
      const msg = error.message;
      //   return { success: false, msg }
      console.log("error", error);
    }
  };

  const contextValue: AuthContextType = {
    user,
    setUser,
    login,
    register,
    updateUserData,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be wrapped inside the AuthWrapper");
  }
  return context;
};

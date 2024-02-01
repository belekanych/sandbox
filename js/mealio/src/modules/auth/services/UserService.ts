import { db } from "@/lib/firebase";
import User, { USER_COLLECTION } from "@/modules/auth/entities/User";
import { addDoc, collection } from "firebase/firestore";

export const useUserService = () => {
  const storeUser = async (data: User) => {
    await addDoc(collection(db, USER_COLLECTION), {
      ...data,
    });
  };

  return {
    storeUser,
  };
};

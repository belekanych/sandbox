import { db } from "@/lib/firebase";
import { USER_COLLECTION } from "@/modules/auth/entities/User";
import { LIST_MEMBER_COLLECTION } from "@/modules/lists/entities/ListMembers";
import {
  DocumentData,
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const useListMemberService = () => {
  const attachListMember = async (listId: string, email: string) => {
    const userResult = await getDocs(
      query(collection(db, USER_COLLECTION), where("email", "==", email))
    );

    if (userResult.empty) {
      return;
    }

    const userId = userResult.docs[0].data()["uid"];

    const listMemberResult = await getDocs(
      query(
        collection(db, LIST_MEMBER_COLLECTION),
        where("userId", "==", userId)
      )
    );

    if (!listMemberResult.empty) {
      return;
    }

    await addDoc(collection(db, LIST_MEMBER_COLLECTION), {
      userId,
      listId,
    });
  };

  const destroyListMember = async (userId: string) => {
    await deleteDocs(
      await getDocs(
        query(
          collection(db, LIST_MEMBER_COLLECTION),
          where("userId", "==", userId)
        )
      )
    );
  };

  async function deleteDocs(result: QuerySnapshot<DocumentData, DocumentData>) {
    const deletePromises: Promise<void>[] = [];
    result.forEach((item) => deletePromises.push(deleteDoc(item.ref)));
    await Promise.all(deletePromises);
  }

  return {
    attachListMember,
    destroyListMember,
  };
};

import { db } from "@/lib/firebase";
import { USER_COLLECTION } from "@/modules/auth/entities/User";
import { selectCurrentUser } from "@/modules/auth/store";
import ListMember, {
  LIST_MEMBER_COLLECTION,
} from "@/modules/lists/entities/ListMembers";
import { selectListMembers, setListMembers } from "@/modules/lists/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  DocumentData,
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";

export const useListMemberService = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const listMembers = useAppSelector(selectListMembers);

  useEffect(() => {
    if (!currentUser) {
      if (listMembers.length) {
        dispatch(setListMembers([]));
      }

      return;
    }

    const listMembersQuery = query(
      collection(db, LIST_MEMBER_COLLECTION),
      where("userId", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(listMembersQuery, (querySnapshot) => {
      const items = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as ListMember;
      });
      dispatch(setListMembers(items));
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser, dispatch, listMembers.length]);

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

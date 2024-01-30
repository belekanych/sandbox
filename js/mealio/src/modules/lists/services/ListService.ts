import { useAuth } from "@/modules/auth/contexts/AuthContext";
import { db } from "@/lib/firebase";
import {
  collection,
  documentId,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import List, { LIST_COLLECTION } from "@/modules/lists/entities/List";
import ListMember, {
  LIST_MEMBER_COLLECTION,
} from "@/modules/lists/entities/ListMembers";

export const useListService = () => {
  const { currentUser } = useAuth();
  const [lists, setLists] = useState<List[]>([]);
  const [listMembers, setListMembers] = useState<ListMember[]>([]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const listMembersQuery = query(
      collection(db, LIST_MEMBER_COLLECTION),
      where("userId", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(listMembersQuery, (querySnapshot) => {
      const items = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
        } as ListMember;
      });
      setListMembers(items);
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser || !listMembers.length) {
      return;
    }

    const listsQuery = query(
      collection(db, LIST_COLLECTION),
      where(
        documentId(),
        "in",
        listMembers.map((item) => item.listId)
      )
    );

    const unsubscribe = onSnapshot(listsQuery, (querySnapshot) => {
      const items = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as List;
      });
      setLists(items);
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser, listMembers]);

  return {
    lists,
    listMembers,
  };
};

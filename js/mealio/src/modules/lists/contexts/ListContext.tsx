import React, { useContext, useState, useEffect } from "react";
import { db, id } from "@/lib/firebase";
import { query, where, onSnapshot, collection } from "firebase/firestore";
import { useAuth } from "@/modules/auth/contexts/AuthContext";
import List, { LIST_COLLECTION } from "@/modules/lists/entities/List";
import ListMember, {
  LIST_MEMBER_COLLECTION,
} from "@/modules/lists/entities/ListMembers";

type ListContextType = {
  lists: List[];
  listMembers: ListMember[];
  activeList?: List;
  setActiveList: React.Dispatch<React.SetStateAction<List | undefined>>;
};

const ListContext = React.createContext<ListContextType>({
  lists: [],
  listMembers: [],
  setActiveList: () => {},
});

export function useList() {
  return useContext<ListContextType>(ListContext);
}

interface Props {
  children: React.ReactNode;
}

export const ListProvider: React.FC<Props> = ({ children }) => {
  const { currentUser } = useAuth();
  const [lists, setLists] = useState<List[]>([]);
  const [listMembers, setListMembers] = useState<ListMember[]>([]);
  const [activeList, setActiveList] = useState<List>();

  useEffect(() => {
    if (!currentUser) {
      setListMembers([]);

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
      setListMembers(items);
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser || !listMembers.length) {
      setLists([]);

      return;
    }

    const listsQuery = query(
      collection(db, LIST_COLLECTION),
      where(
        id,
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

  useEffect(() => {
    if (lists.length === 0) {
      setActiveList(undefined);
      return;
    }

    if (activeList || lists.length === 0) {
      return;
    }

    setActiveList(lists[0]);
  }, [lists, activeList]);

  return (
    <ListContext.Provider
      value={{ lists, listMembers, activeList, setActiveList }}
    >
      {children}
    </ListContext.Provider>
  );
};

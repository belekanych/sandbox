import { db, id } from "@/lib/firebase";
import { selectCurrentUser } from "@/modules/auth/store";
import List, { LIST_COLLECTION } from "@/modules/lists/entities/List";
import { LIST_MEMBER_COLLECTION } from "@/modules/lists/entities/ListMembers";
import {
  selectActiveList,
  selectListMembers,
  selectLists,
  setActiveList,
  setLists,
} from "@/modules/lists/store";
import { PRODUCT_COLLECTION } from "@/modules/product/entities/Product";
import { SHOPPING_LIST_ITEM_COLLECTION } from "@/modules/shoppingList/entities/ShoppingListItem";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  DocumentData,
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect } from "react";

export const useListService = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const listMembers = useAppSelector(selectListMembers);
  const lists = useAppSelector(selectLists);
  const activeList = useAppSelector(selectActiveList);

  useEffect(() => {
    if (!currentUser || !listMembers.length) {
      if (lists.length) {
        dispatch(setLists([]));
      }

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
      dispatch(setLists(items));
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser, dispatch, listMembers, lists.length]);

  useEffect(() => {
    if (lists.length === 0) {
      if (activeList) {
        dispatch(setActiveList(null));
      }
      return;
    }

    if (activeList || lists.length === 0) {
      return;
    }

    dispatch(setActiveList(lists[0]));
  }, [lists, activeList, dispatch]);

  const storeList = async (data: List) => {
    const listResult = await addDoc(collection(db, LIST_COLLECTION), {
      ...data,
      ownerId: currentUser!.uid,
    });

    await addDoc(collection(db, LIST_MEMBER_COLLECTION), {
      userId: currentUser!.uid,
      listId: listResult.id,
    });
  };

  const updateList = async (list: List) => {
    await updateDoc(doc(db, [LIST_COLLECTION, list.id].join("/")), {
      ...list,
    });
  };

  const destroyList = async (list: List) => {
    if (list.ownerId !== currentUser?.uid) {
      return;
    }

    const listId = list.id;

    await deleteDoc(doc(db, [LIST_COLLECTION, listId].join("/")));

    await deleteDocs(
      await getDocs(
        query(
          collection(db, LIST_MEMBER_COLLECTION),
          where("listId", "==", listId)
        )
      )
    );
    await deleteDocs(
      await getDocs(
        query(collection(db, PRODUCT_COLLECTION), where("listId", "==", listId))
      )
    );
    await deleteDocs(
      await getDocs(
        query(
          collection(db, SHOPPING_LIST_ITEM_COLLECTION),
          where("listId", "==", listId)
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
    storeList,
    updateList,
    destroyList,
  };
};

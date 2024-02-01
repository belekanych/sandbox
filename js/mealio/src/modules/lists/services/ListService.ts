import { db } from "@/lib/firebase";
import { useAuth } from "@/modules/auth/contexts/AuthContext";
import List, { LIST_COLLECTION } from "@/modules/lists/entities/List";
import { LIST_MEMBER_COLLECTION } from "@/modules/lists/entities/ListMembers";
import { PRODUCT_COLLECTION } from "@/modules/product/entities/Product";
import { SHOPPING_LIST_ITEM_COLLECTION } from "@/modules/shoppingList/entities/ShoppingListItem";
import {
  DocumentData,
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const useListService = () => {
  const { currentUser } = useAuth();

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

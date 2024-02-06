import { PRODUCT_COLLECTION } from "@/modules/product/entities/Product";
import ShoppingListItem, {
  SHOPPING_LIST_ITEM_COLLECTION,
} from "@/modules/shoppingList/entities/ShoppingListItem";
import { db } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectListMembers } from "@/modules/lists/store";
import { useEffect } from "react";
import { setShoppingCartItems } from "@/modules/shoppingList/store";

export const useCartService = () => {
  const dispatch = useAppDispatch();
  const listMembers = useAppSelector(selectListMembers);

  const finishShopping = async () => {
    const result = await getDocs(
      query(
        collection(db, SHOPPING_LIST_ITEM_COLLECTION),
        where(
          "listId",
          "in",
          listMembers.map((item) => item.listId)
        ),
        where("checked", "==", true)
      )
    );

    result.forEach(async (data) => {
      const item = {
        id: data.id,
        ...data.data(),
      } as ShoppingListItem;

      const product = await getDoc(doc(db, PRODUCT_COLLECTION, item.productId));

      if (!product.exists) {
        return;
      }

      await updateDoc(doc(db, [PRODUCT_COLLECTION, product.id].join("/")), {
        remained: product.data()?.remained + item.amount,
      });

      await deleteDoc(
        doc(db, [SHOPPING_LIST_ITEM_COLLECTION, item.id].join("/"))
      );
    });
  };

  useEffect(() => {
    if (!listMembers.length) {
      dispatch(setShoppingCartItems([]));

      return;
    }

    const shoppingQuery = query(
      collection(db, "shoppingLists"),
      where(
        "listId",
        "in",
        listMembers.map((item) => item.listId)
      )
    );

    const unsubscribe = onSnapshot(shoppingQuery, (querySnapshot) => {
      const items = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as ShoppingListItem;
      });
      dispatch(setShoppingCartItems(items));
    });

    return () => {
      unsubscribe();
    };
  }, [listMembers]);

  return {
    finishShopping,
  };
};

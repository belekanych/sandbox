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
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useList } from "@/modules/lists/contexts/ListContext";

export const useCartService = () => {
  const { activeList } = useList();

  const finishShopping = async () => {
    const result = await getDocs(
      query(
        collection(db, SHOPPING_LIST_ITEM_COLLECTION),
        where("listId", "==", activeList?.id),
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

  return {
    finishShopping,
  };
};

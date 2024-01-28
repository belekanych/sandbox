import { useAuth } from "@/modules/auth/contexts/AuthContext";
import { PRODUCT_COLLECTION } from "@/modules/product/entities/Product";
import ShoppingListItem, {
  SHOPPING_LIST_ITEM_COLLECTION,
} from "@/modules/shoppingList/entities/ShoppingListItem";
import { db } from "@/vendor/firebase";
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

export const useCartService = () => {
  const { currentUser } = useAuth();

  const finishShopping = async () => {
    const result = await getDocs(
      query(
        collection(db, SHOPPING_LIST_ITEM_COLLECTION),
        where("userId", "==", currentUser?.uid),
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
        left: product.data()?.left + item.amount,
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

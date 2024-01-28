import { useAuth } from "@/modules/auth/contexts/AuthContext";
import Product, {
  PRODUCT_COLLECTION,
} from "@/modules/product/entities/Product";
import ShoppingListItem, {
  SHOPPING_LIST_ITEM_COLLECTION,
} from "@/modules/shoppingList/entities/ShoppingListItem";
import { db } from "@/vendor/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const useProductService = () => {
  const { currentUser } = useAuth();

  const storeProduct = async (data: Product) => {
    const userId = currentUser?.uid;

    const result = await addDoc(collection(db, PRODUCT_COLLECTION), {
      ...data,
      userId,
    });

    return handleShoppingCart({
      ...data,
      id: result.id,
    });
  };

  const updateProduct = async (product: Product) => {
    await updateDoc(doc(db, [PRODUCT_COLLECTION, product.id].join("/")), {
      ...product,
    });

    return await handleShoppingCart(product);
  };

  const destroyProduct = async (product: Product) => {
    await deleteDoc(doc(db, [PRODUCT_COLLECTION, product.id].join("/")));

    return handleShoppingCart({
      ...product,
      plan: 0,
      left: 1,
    });
  };

  const handleShoppingCart = async (product: Product) => {
    const difference = product.left - product.plan;

    const productId = product.id;

    const item = await checkShoppingCartExists(productId);

    // Still have enough
    if (difference > 0) {
      if (!item) {
        return;
      }

      return await deleteDoc(
        doc(db, [SHOPPING_LIST_ITEM_COLLECTION, item.id].join("/"))
      );
    }

    // Do not add if already added
    if (item) {
      return;
    }

    return await addDoc(collection(db, SHOPPING_LIST_ITEM_COLLECTION), {
      productId,
      userId: currentUser?.uid,
      checked: false,
      amount: difference * -1,
      amountType: "шт",
    });
  };

  const checkShoppingCartExists = async (
    productId: string
  ): Promise<ShoppingListItem | null> => {
    const result = await getDocs(
      query(
        collection(db, SHOPPING_LIST_ITEM_COLLECTION),
        where("userId", "==", currentUser?.uid),
        where("productId", "==", productId)
      )
    );

    return result.empty
      ? null
      : ({
          ...result.docs[0].data(),
          id: result.docs[0].id,
        } as ShoppingListItem);
  };

  return {
    storeProduct,
    updateProduct,
    destroyProduct,
  };
};

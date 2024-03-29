import Product, {
  PRODUCT_COLLECTION,
} from "@/modules/product/entities/Product";
import ShoppingListItem, {
  SHOPPING_LIST_ITEM_COLLECTION,
} from "@/modules/shoppingList/entities/ShoppingListItem";
import { db } from "@/lib/firebase";
import {
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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectActiveList, selectListMembers } from "@/modules/lists/store";
import { useEffect } from "react";
import { setProducts } from "@/modules/product/store";

export const useProductService = () => {
  const dispatch = useAppDispatch();
  const listMembers = useAppSelector(selectListMembers);

  const activeList = useAppSelector(selectActiveList);

  const storeProduct = async (data: Product) => {
    const listId = activeList?.id;

    const result = await addDoc(collection(db, PRODUCT_COLLECTION), {
      ...data,
      listId,
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
      min: 0,
      remained: 1,
    });
  };

  const handleShoppingCart = async (product: Product) => {
    const difference = product.remained - product.min;

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
      listId: activeList?.id,
      checked: false,
      amount: difference * -1,
    });
  };

  const checkShoppingCartExists = async (
    productId: string
  ): Promise<ShoppingListItem | null> => {
    const result = await getDocs(
      query(
        collection(db, SHOPPING_LIST_ITEM_COLLECTION),
        where("listId", "==", activeList?.id),
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

  useEffect(() => {
    if (!listMembers.length) {
      dispatch(setProducts([]));

      return;
    }

    const productQuery = query(
      collection(db, "products"),
      where(
        "listId",
        "in",
        listMembers.map((item) => item.listId)
      )
    );

    const unsubscribe = onSnapshot(productQuery, (querySnapshot) => {
      const items = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as Product;
      });
      dispatch(setProducts(items));
    });

    return () => {
      unsubscribe();
    };
  }, [listMembers]);

  return {
    storeProduct,
    updateProduct,
    destroyProduct,
  };
};

import Product from "@/modules/product/entities/Product";
import React, { useContext, useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { query, where, onSnapshot, collection } from "firebase/firestore";
import ShoppingListItem from "@/modules/shoppingList/entities/ShoppingListItem";
import { useList } from "@/modules/lists/contexts/ListContext";

type StoreContextType = {
  products: Product[];
  shoppingListItems: ShoppingListItem[];
};

const StoreContext = React.createContext<StoreContextType>({
  products: [],
  shoppingListItems: [],
});

export function useStore() {
  return useContext<StoreContextType>(StoreContext);
}

interface Props {
  children: React.ReactNode;
}

export const StoreProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [shoppingListItems, setShoppingListItems] = useState<
    ShoppingListItem[]
  >([]);
  const { activeList } = useList();

  useEffect(() => {
    if (!activeList) {
      return;
    }

    const productQuery = query(
      collection(db, "products"),
      where("listId", "==", activeList.id)
    );

    const unsubscribe = onSnapshot(productQuery, (querySnapshot) => {
      const items = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as Product;
      });
      setProducts(items);
    });

    return () => {
      unsubscribe();
    };
  }, [activeList]);

  useEffect(() => {
    if (!activeList) {
      return;
    }

    const shoppingQuery = query(
      collection(db, "shoppingLists"),
      where("listId", "==", activeList.id)
    );

    const unsubscribe = onSnapshot(shoppingQuery, (querySnapshot) => {
      const items = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as ShoppingListItem;
      });
      setShoppingListItems(items);
    });

    return () => {
      unsubscribe();
    };
  }, [activeList]);

  return (
    <StoreContext.Provider value={{ products, shoppingListItems }}>
      {children}
    </StoreContext.Provider>
  );
};

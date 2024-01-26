import Product from "../modules/product/entities/Product";
import React, { useContext, useState, useEffect } from "react";
import { db } from "../vendor/firebase";
import { query, where, onSnapshot, collection } from "firebase/firestore";
import { useAuth } from "../modules/auth/contexts/AuthContext";
import ShoppingListItem from "../modules/shoppingList/entities/ShoppingListItem";

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
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const productQuery = query(
      collection(db, "products"),
      where("userId", "==", currentUser.uid)
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
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const shoppingQuery = query(
      collection(db, "shoppingLists"),
      where("userId", "==", currentUser.uid)
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
  }, [currentUser]);

  return (
    <StoreContext.Provider value={{ products, shoppingListItems }}>
      {children}
    </StoreContext.Provider>
  );
};

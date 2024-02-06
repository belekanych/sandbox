import useAuthService from "@/modules/auth/services/AuthService";
import { useListMemberService } from "@/modules/lists/services/ListMemberService";
import { useListService } from "@/modules/lists/services/ListService";
import { useProductService } from "@/modules/product/services/ProductService";
import { useCartService } from "@/modules/shoppingList/services/CartService";
import React from "react";

type FirebaseContextType = {
  //
};

const FirebaseContext = React.createContext<FirebaseContextType>({
  //
});

interface Props {
  children: React.ReactNode;
}

export const FirebaseProvider: React.FC<Props> = ({ children }) => {
  useAuthService();
  useListMemberService();
  useListService();
  useProductService();
  useCartService();

  return (
    <FirebaseContext.Provider value={{}}>{children}</FirebaseContext.Provider>
  );
};

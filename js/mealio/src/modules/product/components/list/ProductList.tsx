import Product from "../../entities/Product";
import ProductListItem from "./ProductListItem";
import * as stylex from "@stylexjs/stylex";
import { db } from "../../../../vendor/firebase";
import { query, where, onSnapshot, collection } from "firebase/firestore";
import { useAuth } from "../../../auth/contexts/AuthContext";
import { useState, useEffect } from "react";

const styles = stylex.create({
  list: {
    listStyle: "none",
    padding: 0,
  },
});

const productsRef = collection(db, "products");

interface Props {
  //
}

const ProductList: React.FC<Props> = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const productQuery = query(
      productsRef,
      where("userId", "==", currentUser!.uid)
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

  return products.length ? (
    <ul {...stylex.props(styles.list)}>
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </ul>
  ) : null;
};

export default ProductList;

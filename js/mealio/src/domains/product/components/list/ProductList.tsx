import { query, where, onSnapshot, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import Product from "../../entities/Product";
import { db } from "../../../../vendor/firebase";
import ProductListItem from "./ProductListItem";

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
    <ul>
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </ul>
  ) : null;
};

export default ProductList;

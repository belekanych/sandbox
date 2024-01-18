import { Link, useParams } from "react-router-dom";
import MainLayout from "../../../components/layouts/MainLayout";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../vendor/firebase";
import { useEffect, useState } from "react";
import Product from "../entities/Product";
import ProductEditForm from "../components/form/ProductEditForm";

function List() {
  const { id } = useParams();

  const [product, setProduct] = useState<Product>();

  const loadData = async () => {
    const result = await getDoc(doc(db, "products", id!));

    if (result.exists()) {
      setProduct({
        id: result.id,
        name: result.data().name,
        plan: result.data().plan,
        left: result.data().left,
        userId: result.data().userId,
      });
    }
  };

  useEffect(() => {
    loadData();
  });

  return (
    <MainLayout title="Products > Edit">
      <Link to="/products">Back</Link>
      {product ? (
        <ProductEditForm product={product} />
      ) : (
        <span>Loading...</span>
      )}
    </MainLayout>
  );
}

export default List;

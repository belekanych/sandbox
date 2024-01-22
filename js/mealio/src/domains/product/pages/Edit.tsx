import { useParams } from "react-router-dom";
import MainLayout from "../../../components/layout/MainLayout";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../vendor/firebase";
import { useEffect, useState } from "react";
import Product from "../entities/Product";
import ProductEditForm from "../components/form/ProductEditForm";
import Link from "../../../components/controls/Link";

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
      <Link to="/products">&#8678; Back</Link>
      {product ? (
        <ProductEditForm product={product} />
      ) : (
        <span>Loading...</span>
      )}
    </MainLayout>
  );
}

export default List;

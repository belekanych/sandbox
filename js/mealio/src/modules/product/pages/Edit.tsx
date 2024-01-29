import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ProductEditForm from "@/modules/product/components/form/ProductEditForm";
import Product from "@/modules/product/entities/Product";
import ProductDeleteForm from "@/modules/product/components/form/ProductDeleteForm";

function Edit() {
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
      {product ? (
        <>
          <ProductEditForm product={product} />
          <ProductDeleteForm product={product} />
        </>
      ) : (
        <span>Loading...</span>
      )}
    </MainLayout>
  );
}

export default Edit;

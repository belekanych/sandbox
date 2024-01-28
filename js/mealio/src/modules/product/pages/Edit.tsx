import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/vendor/firebase";
import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Card from "@/components/layout/blocks/Card";
import ProductEditForm from "@/modules/product/components/form/ProductEditForm";
import Product from "@/modules/product/entities/Product";

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
      <Card>
        <Link to="/products">&#8678; Back</Link>
        {product ? (
          <ProductEditForm product={product} />
        ) : (
          <span>Loading...</span>
        )}
      </Card>
    </MainLayout>
  );
}

export default Edit;

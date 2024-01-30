import { useParams } from "react-router-dom";
import { useMemo } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ProductEditForm from "@/modules/product/components/form/ProductEditForm";
import ProductDeleteForm from "@/modules/product/components/form/ProductDeleteForm";
import { useStore } from "@/contexts/StoreContext";

function Edit() {
  const { id } = useParams();
  const { products } = useStore();

  const product = useMemo(() => {
    return products.filter((product) => product.id === id)[0];
  }, [id, products]);

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

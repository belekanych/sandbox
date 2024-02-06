import { useParams } from "react-router-dom";
import { useMemo } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ProductEditForm from "@/modules/product/components/form/ProductEditForm";
import ProductDeleteForm from "@/modules/product/components/form/ProductDeleteForm";
import Loading from "@/modules/auth/pages/Loading";
import { useAppSelector } from "@/store/hooks";
import { selectProducts } from "@/modules/product/store";

function Edit() {
  const { id } = useParams();
  const products = useAppSelector(selectProducts);

  const product = useMemo(() => {
    return products.filter((product) => product.id === id)[0];
  }, [id, products]);

  return (
    <MainLayout
      title="Products > Edit"
      header={product ? <ProductDeleteForm product={product} /> : undefined}
    >
      {product ? (
        <>
          <ProductEditForm product={product} />
        </>
      ) : (
        <Loading />
      )}
    </MainLayout>
  );
}

export default Edit;

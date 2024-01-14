import MainLayout from "../../components/layouts/MainLayout";
import ProductList from "../../domains/product/components/ProductList";

function List() {
  return (
    <MainLayout title="Products">
      <ProductList />
    </MainLayout>
  );
}

export default List;

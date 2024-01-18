import { Link } from "react-router-dom";
import MainLayout from "../../../components/layouts/MainLayout";
import ProductList from "../components/list/ProductList";

function List() {
  return (
    <MainLayout title="Products">
      <Link to="/product/create">Create</Link>
      <ProductList />
    </MainLayout>
  );
}

export default List;

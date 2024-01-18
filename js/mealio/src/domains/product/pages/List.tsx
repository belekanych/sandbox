import { Link } from "react-router-dom";
import MainLayout from "../../../components/layouts/MainLayout";
import ProductList from "../components/list/ProductList";
import { MdOutlineAddCircle as CreateIcon } from "react-icons/md";

function List() {
  return (
    <MainLayout title="Products">
      <Link to="/products/create">
        <CreateIcon />
      </Link>
      <ProductList />
    </MainLayout>
  );
}

export default List;

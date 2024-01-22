import Link from "../../../components/controls/Link";
import MainLayout from "../../../components/layout/MainLayout";
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

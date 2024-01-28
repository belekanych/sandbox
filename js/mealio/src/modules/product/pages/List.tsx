import Link from "@/components/controls/Link";
import MainLayout from "@/components/layout/MainLayout";
import Card from "@/components/layout/blocks/Card";
import ProductList from "@/modules/product/components/list/ProductList";
import { MdOutlineAddCircle as CreateIcon } from "react-icons/md";

function List() {
  return (
    <MainLayout title="Products">
      <Card>
        <Link to="/products/create">
          <CreateIcon />
        </Link>
        <ProductList />
      </Card>
    </MainLayout>
  );
}

export default List;

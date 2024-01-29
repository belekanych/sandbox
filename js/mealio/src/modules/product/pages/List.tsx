import Link from "@/components/controls/Link";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import ProductList from "@/modules/product/components/list/ProductList";
import { MdOutlineAddCircle as CreateIcon } from "react-icons/md";

function List() {
  return (
    <MainLayout title="Products">
      <ProductList />
      <Button asChild className="w-full mt-4">
        <Link to="/products/create">
          <CreateIcon className="mr-2" /> Create new
        </Link>
      </Button>
    </MainLayout>
  );
}

export default List;

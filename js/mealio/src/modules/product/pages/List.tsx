import Link from "@/components/controls/Link";
import MainLayout from "@/components/layout/MainLayout";
import ProductList from "@/modules/product/components/list/ProductList";
import ProductListSelect from "@/modules/product/components/list/ProductListSelect";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { useAppSelector } from "@/store/hooks";
import { selectActiveList } from "@/modules/lists/store";

function List() {
  const activeList = useAppSelector(selectActiveList);

  return (
    <MainLayout
      title="Products"
      header={
        activeList ? (
          <Button asChild className="rounded-full">
            <Link to="/products/create">
              <PlusIcon />
            </Link>
          </Button>
        ) : undefined
      }
    >
      <ProductListSelect />
      <ProductList />
    </MainLayout>
  );
}

export default List;

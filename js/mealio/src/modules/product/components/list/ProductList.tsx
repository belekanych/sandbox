import { selectActiveList } from "@/modules/lists/store";
import ProductListItem from "@/modules/product/components/list/ProductListItem";
import { selectProducts } from "@/modules/product/store";
import { ArchiveIcon } from "@radix-ui/react-icons";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export default function ProductList() {
  const activeList = useSelector(selectActiveList);
  const products = useSelector(selectProducts);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return product.listId === activeList?.id;
    });
  }, [activeList, products]);

  return filteredProducts.length ? (
    <ul className="space-y-4">
      {filteredProducts.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </ul>
  ) : (
    <div className="flex flex-col items-center text-muted-foreground py-10">
      <ArchiveIcon className="h-32 w-full p-4" />
      <span className="text-xl">No products yet</span>
    </div>
  );
}

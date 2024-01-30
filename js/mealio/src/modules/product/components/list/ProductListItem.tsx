import Link from "@/components/controls/Link";
import Product from "@/modules/product/entities/Product";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@radix-ui/react-icons";

interface Props {
  product: Product;
}

const ProductListItem: React.FC<Props> = ({ product }) => {
  return (
    <Button asChild className="w-full justify-start" variant={"outline"}>
      <Link to={"/products/" + product.id}>
        <div className="flex justify-between items-center w-full">
          <span>{product.name}</span>
          <ChevronRightIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
        </div>
      </Link>
    </Button>
  );
};

export default ProductListItem;

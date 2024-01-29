import Link from "@/components/controls/Link";
import Product from "@/modules/product/entities/Product";
import { Button } from "@/components/ui/button";

interface Props {
  product: Product;
}

const ProductListItem: React.FC<Props> = ({ product }) => {
  return (
    <Button asChild className="w-full my-2 justify-start" variant={"outline"}>
      <Link to={"/products/" + product.id}>{product.name}</Link>
    </Button>
  );
};

export default ProductListItem;

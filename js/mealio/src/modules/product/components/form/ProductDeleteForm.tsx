import Product from "@/modules/product/entities/Product";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProductService } from "@/modules/product/services/ProductService";

type Props = {
  product: Product;
};

const ProductDeleteForm: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const { destroyProduct } = useProductService();

  const onDelete = async () => {
    await destroyProduct(props.product);

    navigate("/products");
  };

  return (
    <div className="my-4 border-t py-4">
      <Button className="w-full" variant={"destructive"} onClick={onDelete}>
        Delete
      </Button>
    </div>
  );
};

export default ProductDeleteForm;

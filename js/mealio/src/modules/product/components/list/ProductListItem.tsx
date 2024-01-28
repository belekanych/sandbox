import Card from "@/components/layout/blocks/Card";
import Link from "@/components/controls/Link";
import Product from "@/modules/product/entities/Product";
import { MdEdit as EditIcon, MdDelete as DeleteIcon } from "react-icons/md";
import { useProductService } from "@/modules/product/services/ProductService";

interface Props {
  product: Product;
}

const ProductListItem: React.FC<Props> = ({ product }) => {
  const { destroyProduct } = useProductService();

  async function onDelete() {
    return await destroyProduct(product);
  }

  return (
    <Card el="li">
      <p>{product.name}</p>
      <div>
        <Link to={"/products/" + product.id}>
          <EditIcon />
        </Link>
        <button type="button" onClick={onDelete}>
          <DeleteIcon />
        </button>
      </div>
    </Card>
  );
};

export default ProductListItem;

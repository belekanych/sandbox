import * as stylex from "@stylexjs/stylex";
import Card from "@/components/layout/blocks/Card";
import Link from "@/components/controls/Link";
import Product from "@/modules/product/entities/Product";
import { MdEdit as EditIcon, MdDelete as DeleteIcon } from "react-icons/md";
import { spacing } from "../../../../styles/tokens.stylex";
import { useProductService } from "@/modules/product/services/ProductService";

const styles = stylex.create({
  item: {
    padding: spacing.base,
    margin: `calc(${spacing.base} * 4) 0`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

interface Props {
  product: Product;
}

const ProductListItem: React.FC<Props> = ({ product }) => {
  const { destroyProduct } = useProductService();

  async function onDelete() {
    return await destroyProduct(product);
  }

  return (
    <Card el="li" {...stylex.props(styles.item)}>
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

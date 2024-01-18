import * as stylex from "@stylexjs/stylex";
import Product from "../../entities/Product";
import { Link } from "react-router-dom";
import { db } from "../../../../vendor/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { colors, spacing } from "../../../../styles/tokens.stylex";
import { MdEdit as EditIcon, MdDelete as DeleteIcon } from "react-icons/md";

const styles = stylex.create({
  item: {
    backgroundColor: colors.background,
    borderRadius: spacing.borderRadius,
    padding: spacing.base,
    boxShadow: colors.boxShadow,
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
  async function onDelete() {
    await deleteDoc(doc(db, `//${product.id}`));
  }

  return (
    <li {...stylex.props(styles.item)}>
      <p>{product.name}</p>
      <div>
        <Link to={"/products/" + product.id}>
          <EditIcon />
        </Link>
        <button type="button" onClick={onDelete}>
          <DeleteIcon />
        </button>
      </div>
    </li>
  );
};

export default ProductListItem;

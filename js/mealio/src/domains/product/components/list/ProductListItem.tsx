import { deleteDoc, doc } from "firebase/firestore";
import Product from "../../entities/Product";
import { db } from "../../../../vendor/firebase";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

const ProductListItem: React.FC<Props> = ({ product }) => {
  async function onDelete() {
    await deleteDoc(doc(db, `/products/${product.id}`));
  }

  return (
    <li>
      <p>{product.name}</p>
      <Link to={"/product/" + product.id}>Edit</Link>
      <button type="button" onClick={onDelete}>
        Delete
      </button>
    </li>
  );
};

export default ProductListItem;

import Product from "../entities/Product";

interface Props {
  product: Product;
}

const ProductListItem: React.FC<Props> = ({ product }) => {
  return <li>{product.name}</li>;
};

export default ProductListItem;

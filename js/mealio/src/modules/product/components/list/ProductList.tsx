import * as stylex from "@stylexjs/stylex";
import { useStore } from "@/contexts/StoreContext";
import ProductListItem from "@/modules/product/components/list/ProductListItem";

const styles = stylex.create({
  list: {
    listStyle: "none",
    padding: 0,
  },
});

interface Props {
  //
}

const ProductList: React.FC<Props> = () => {
  const { products } = useStore();

  return products.length ? (
    <ul {...stylex.props(styles.list)}>
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </ul>
  ) : null;
};

export default ProductList;

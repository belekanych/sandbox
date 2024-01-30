import { useStore } from "@/contexts/StoreContext";
import ProductListItem from "@/modules/product/components/list/ProductListItem";

interface Props {
  //
}

const ProductList: React.FC<Props> = () => {
  const { products } = useStore();

  return products.length ? (
    <ul className="space-y-4">
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </ul>
  ) : null;
};

export default ProductList;

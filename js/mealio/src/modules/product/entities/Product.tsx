import ProductUnit from "@/modules/product/entities/ProductUnit";

type Product = {
  id: string;
  name: string;
  min: number;
  remained: number;
  listId: string;
  unit: ProductUnit;
};

export default Product;

export const PRODUCT_COLLECTION = "products";

import Product from "@/modules/product/entities/Product";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface State {
  products: Product[];
}

// Define the initial state using that type
const initialState: State = {
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
  selectors: {
    selectProducts: (state) => state.products,
  },
});

export const { setProducts } = productSlice.actions;

export const { selectProducts } = productSlice.selectors;

export default productSlice.reducer;

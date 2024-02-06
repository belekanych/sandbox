import ShoppingListItem from "@/modules/shoppingList/entities/ShoppingListItem";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface State {
  shoppingCartItems: ShoppingListItem[];
}

// Define the initial state using that type
const initialState: State = {
  shoppingCartItems: [],
};

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    setShoppingCartItems: (
      state,
      action: PayloadAction<ShoppingListItem[]>
    ) => {
      state.shoppingCartItems = action.payload;
    },
  },
  selectors: {
    selectShoppingCartItems: (state) => state.shoppingCartItems,
  },
});

export const { setShoppingCartItems } = shoppingCartSlice.actions;

export const { selectShoppingCartItems } = shoppingCartSlice.selectors;

export default shoppingCartSlice.reducer;

type ShoppingListItem = {
  id: string;
  productId: string;
  checked: boolean;
  amount: number;
  amountType: string;
};

export default ShoppingListItem;

export const SHOPPING_LIST_ITEM_COLLECTION = "shoppingLists";

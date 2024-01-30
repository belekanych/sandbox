import { useStore } from "@/contexts/StoreContext";
import { useMemo } from "react";
import ShoppingListItem from "@/modules/shoppingList/entities/ShoppingListItem";
import ShoppingCartListItem from "@/modules/shoppingList/components/list/ShoppingCartListItem";

interface Props {
  //
}

const ShoppingCartList: React.FC<Props> = () => {
  const { shoppingListItems } = useStore();

  const sortedItems = useMemo<ShoppingListItem[]>(() => {
    return shoppingListItems.sort((a) => (!a.checked ? -1 : 1));
  }, [shoppingListItems]);

  return shoppingListItems.length ? (
    <ul className="space-y-4">
      {sortedItems.map((item) => (
        <ShoppingCartListItem key={item.id} item={item} />
      ))}
    </ul>
  ) : null;
};

export default ShoppingCartList;

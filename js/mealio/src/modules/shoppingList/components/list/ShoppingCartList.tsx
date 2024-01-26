import * as stylex from "@stylexjs/stylex";
import ShoppingCartListItem from "./ShoppingCartListItem";
import { useStore } from "../../../../contexts/StoreContext";
import { useMemo } from "react";
import ShoppingListItem from "../../entities/ShoppingListItem";

const styles = stylex.create({
  list: {
    listStyle: "none",
    padding: 0,
  },
});

interface Props {
  //
}

const ShoppingCartList: React.FC<Props> = () => {
  const { shoppingListItems } = useStore();

  const sortedItems = useMemo<ShoppingListItem[]>(() => {
    return shoppingListItems.sort((a) => (!a.checked ? -1 : 1));
  }, [shoppingListItems]);

  return shoppingListItems.length ? (
    <ul {...stylex.props(styles.list)}>
      {sortedItems.map((item) => (
        <ShoppingCartListItem key={item.id} item={item} />
      ))}
    </ul>
  ) : null;
};

export default ShoppingCartList;

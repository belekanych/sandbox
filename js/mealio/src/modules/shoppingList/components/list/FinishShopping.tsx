import { useStore } from "@/contexts/StoreContext";
import { useMemo } from "react";
import Button from "@/components/controls/Button";
import { useCartService } from "@/modules/shoppingList/services/CartService";

const FinishShopping: React.FC = () => {
  const { shoppingListItems } = useStore();

  const hasChecked = useMemo<boolean>(() => {
    return shoppingListItems.filter((item) => item.checked).length > 0;
  }, [shoppingListItems]);

  const { finishShopping } = useCartService();
  const onClick = () => {
    finishShopping();
  };

  return shoppingListItems.length ? (
    <Button onClick={onClick} type="submit" disabled={!hasChecked}>
      Finish
    </Button>
  ) : null;
};

export default FinishShopping;

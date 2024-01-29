import { useStore } from "@/contexts/StoreContext";
import { useMemo } from "react";
import { useCartService } from "@/modules/shoppingList/services/CartService";
import { Button } from "@/components/ui/button";

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
    <Button onClick={onClick} disabled={!hasChecked} className="w-full mt-4">
      Finish
    </Button>
  ) : null;
};

export default FinishShopping;

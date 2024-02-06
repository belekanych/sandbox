import { useMemo } from "react";
import { useCartService } from "@/modules/shoppingList/services/CartService";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@radix-ui/react-icons";
import { useAppSelector } from "@/store/hooks";
import { selectShoppingCartItems } from "@/modules/shoppingList/store";

export default function FinishShopping() {
  const shoppingListItems = useAppSelector(selectShoppingCartItems);

  const hasChecked = useMemo<boolean>(() => {
    return shoppingListItems.filter((item) => item.checked).length > 0;
  }, [shoppingListItems]);

  const { finishShopping } = useCartService();
  const onClick = () => {
    finishShopping();
  };

  return (
    <Button onClick={onClick} disabled={!hasChecked} className="rounded-full">
      <CheckIcon />
    </Button>
  );
}

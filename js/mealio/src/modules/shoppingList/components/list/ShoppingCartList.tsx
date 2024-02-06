import ShoppingCartListItem from "@/modules/shoppingList/components/list/ShoppingCartListItem";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useAppSelector } from "@/store/hooks";
import { selectShoppingCartItems } from "@/modules/shoppingList/store";
import { selectProducts } from "@/modules/product/store";

export default function ShoppingCartList() {
  const shoppingListItems = useAppSelector(selectShoppingCartItems);
  const products = useAppSelector(selectProducts);

  return shoppingListItems.length && products.length ? (
    <ul className="space-y-4">
      {shoppingListItems.map((item) => (
        <ShoppingCartListItem key={item.id} item={item} />
      ))}
    </ul>
  ) : (
    <div className="flex flex-col items-center text-muted-foreground py-10">
      <CheckCircledIcon className="h-32 w-full p-4" />
      <span className="text-xl">Nothing to buy</span>
    </div>
  );
}

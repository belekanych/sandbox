import MainLayout from "@/components/layout/MainLayout";
import FinishShopping from "@/modules/shoppingList/components/list/FinishShopping";
import ShoppingCartList from "@/modules/shoppingList/components/list/ShoppingCartList";

function List() {
  return (
    <MainLayout title="Shopping Cart">
      <ShoppingCartList />
      <FinishShopping />
    </MainLayout>
  );
}

export default List;

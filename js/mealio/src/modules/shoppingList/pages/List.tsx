import MainLayout from "@/components/layout/MainLayout";
import Card from "@/components/layout/blocks/Card";
import FinishShopping from "@/modules/shoppingList/components/list/FinishShopping";
import ShoppingCartList from "@/modules/shoppingList/components/list/ShoppingCartList";

function List() {
  return (
    <MainLayout title="Shopping Cart">
      <Card>
        <ShoppingCartList />
      </Card>
      <FinishShopping />
    </MainLayout>
  );
}

export default List;

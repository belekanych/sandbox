import MainLayout from "../../../components/layout/MainLayout";
import Card from "../../../components/layout/blocks/Card";
import ShoppingCartList from "../components/list/ShoppingCartList";

function List() {
  return (
    <MainLayout title="Shopping Cart">
      <Card>
        <ShoppingCartList />
      </Card>
    </MainLayout>
  );
}

export default List;

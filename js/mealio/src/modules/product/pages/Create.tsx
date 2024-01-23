import Link from "../../../components/controls/Link";
import MainLayout from "../../../components/layout/MainLayout";
import Card from "../../../components/layout/blocks/Card";
import ProductCreateForm from "../components/form/ProductCreateForm";

function Create() {
  return (
    <MainLayout title="Products > Create">
      <Card>
        <Link to="/products">&#8678; Back</Link>
        <ProductCreateForm />
      </Card>
    </MainLayout>
  );
}

export default Create;

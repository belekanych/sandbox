import Link from "../../../components/controls/Link";
import MainLayout from "../../../components/layout/MainLayout";
import ProductCreateForm from "../components/form/ProductCreateForm";

function Create() {
  return (
    <MainLayout title="Products > Create">
      <Link to="/products">&#8678; Back</Link>
      <ProductCreateForm />
    </MainLayout>
  );
}

export default Create;

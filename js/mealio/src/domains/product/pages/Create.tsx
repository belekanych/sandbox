import { Link } from "react-router-dom";
import MainLayout from "../../../components/layouts/MainLayout";
import ProductCreateForm from "../components/form/ProductCreateForm";

function Create() {
  return (
    <MainLayout title="Products > Create">
      <Link to="/product">Back</Link>
      <ProductCreateForm />
    </MainLayout>
  );
}

export default Create;

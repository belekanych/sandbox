import MainLayout from "@/components/layout/MainLayout";
import ProductCreateForm from "@/modules/product/components/form/ProductCreateForm";

function Create() {
  return (
    <MainLayout title="Products > Create">
      <ProductCreateForm />
    </MainLayout>
  );
}

export default Create;

import Product from "@/modules/product/entities/Product";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProductService } from "@/modules/product/services/ProductService";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { TrashIcon } from "@radix-ui/react-icons";

type Props = {
  product: Product;
};

const ProductDeleteForm: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const { destroyProduct } = useProductService();

  const onDelete = async () => {
    await destroyProduct(props.product);

    navigate("/products");
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="rounded-full" variant={"destructive"}>
          <TrashIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>
              Are you sure you want to delete the product?
            </DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={onDelete}>Delete</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ProductDeleteForm;

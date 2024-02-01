import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
import List from "@/modules/lists/entities/List";
import { useListService } from "@/modules/lists/services/ListService";

type Props = {
  list: List;
};

const ListDeleteForm: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const { destroyList } = useListService();

  const onDelete = async () => {
    await destroyList(props.list);

    navigate("/profile");
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="my-4 border-t py-4">
          <Button className="w-full" variant={"destructive"}>
            Delete
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Are you sure you want to delete the list?</DrawerTitle>
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

export default ListDeleteForm;

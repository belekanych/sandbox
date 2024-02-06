import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateListForm from "@/modules/lists/components/CreateListForm";
import ListItem from "@/modules/lists/components/ListItem";
import { selectLists } from "@/modules/lists/store";
import { useAppSelector } from "@/store/hooks";

const Lists: React.FC = () => {
  const lists = useAppSelector(selectLists);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="relative">
          Lists
          <CreateListForm />
        </CardTitle>
        <CardDescription>Lists you have access to</CardDescription>
      </CardHeader>
      <CardContent>
        {lists.length ? (
          <div className="space-y-4">
            {lists.map((list) => (
              <ListItem key={list.id} list={list} />
            ))}
          </div>
        ) : (
          <span>No lists yet</span>
        )}
      </CardContent>
    </Card>
  );
};

export default Lists;

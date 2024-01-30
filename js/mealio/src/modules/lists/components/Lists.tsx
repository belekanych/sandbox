import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useList } from "@/modules/lists/contexts/ListContext";

const Lists: React.FC = () => {
  const { lists } = useList();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lists</CardTitle>
        <CardDescription>Lists you have access to</CardDescription>
      </CardHeader>
      <CardContent>
        {lists.length ? (
          lists.map((list) => <span key={list.id}>{list.name}</span>)
        ) : (
          <span>No items</span>
        )}
      </CardContent>
    </Card>
  );
};

export default Lists;

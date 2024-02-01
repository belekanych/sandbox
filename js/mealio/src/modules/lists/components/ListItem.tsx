import Link from "@/components/controls/Link";
import { Button } from "@/components/ui/button";
import List from "@/modules/lists/entities/List";
import { ChevronRightIcon } from "@radix-ui/react-icons";

export default function ListItem(props: { list: List }) {
  return (
    <Button asChild className="w-full justify-start" variant={"outline"}>
      <Link to={`/lists/${props.list.id}`}>
        <div className="flex justify-between items-center w-full">
          <span>{props.list.name}</span>
          <ChevronRightIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
        </div>
      </Link>
    </Button>
  );
}

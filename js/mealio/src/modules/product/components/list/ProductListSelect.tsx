import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  selectActiveList,
  selectLists,
  setActiveList,
} from "@/modules/lists/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ProductListSelect() {
  const dispatch = useAppDispatch();
  const activeList = useAppSelector(selectActiveList);
  const lists = useAppSelector(selectLists);

  const schema = z.object({
    list: z.string().optional(),
  });

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return lists.length ? (
    <Form {...form}>
      <FormField
        control={form.control}
        name="list"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select list</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                dispatch(
                  setActiveList(lists.filter((list) => list.id === value)[0])
                );
              }}
              value={activeList?.id}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a list" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {lists.map((list) => (
                  <SelectItem value={list.id} key={list.id}>
                    {list.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <Separator className="my-4" />
    </Form>
  ) : null;
}

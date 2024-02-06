import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import List from "@/modules/lists/entities/List";
import { useListService } from "@/modules/lists/services/ListService";

type Props = {
  list: List;
};

const ListEditForm: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  const schema = z.object({
    name: z.string().min(1).max(32),
  });

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: props.list.name,
    },
  });

  const { updateList } = useListService();
  async function submit(data: FormData) {
    await updateList({
      id: props.list.id,
      ...data,
    } as List);

    navigate("/profile");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
        <Card className="p-6 space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter name of the list"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormDescription>e.g. Products</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>
        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    </Form>
  );
};

export default ListEditForm;

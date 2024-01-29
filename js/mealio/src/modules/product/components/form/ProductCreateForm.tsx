import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useProductService } from "@/modules/product/services/ProductService";
import Product from "@/modules/product/entities/Product";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  //
};

const ProductCreateForm: React.FC<Props> = () => {
  const navigate = useNavigate();

  const schema = z.object({
    name: z.string().min(1).max(32),
    plan: z.number().min(1).max(10000),
    left: z.number().min(0).max(10000),
  });

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      plan: 0,
      left: 0,
    },
  });

  const { storeProduct } = useProductService();
  async function submit(data: FormData) {
    await storeProduct(data as Product);

    navigate("/products");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
        <Card className="p-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter name of the product"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormDescription>e.g. Milk, Bread or Coffee</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="plan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plan</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter plan here"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Minimum amount of product you should keep in storage.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="left"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Left</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter left here"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>How much do you still have?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>
        <Button type="submit" className="w-full">
          Create
        </Button>
      </form>
    </Form>
  );
};

export default ProductCreateForm;

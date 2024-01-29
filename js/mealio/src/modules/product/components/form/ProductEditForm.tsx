import Product from "@/modules/product/entities/Product";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProductService } from "@/modules/product/services/ProductService";
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

type Props = {
  product: Product;
};

const ProductEditForm: React.FC<Props> = (props) => {
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
      name: props.product.name,
      plan: props.product.plan,
      left: props.product.left,
    },
  });

  const { updateProduct } = useProductService();
  async function submit(data: FormData) {
    await updateProduct({
      id: props.product.id,
      ...data,
    } as Product);

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
          Save
        </Button>
      </form>
    </Form>
  );
};

export default ProductEditForm;

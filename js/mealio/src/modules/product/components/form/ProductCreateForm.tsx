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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductUnit from "@/modules/product/entities/ProductUnit";
import { useTranslation } from "react-i18next";

type Props = {
  //
};

const ProductCreateForm: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const schema = z.object({
    name: z.string().min(1).max(32),
    min: z.coerce.number().min(1).max(10000),
    remained: z.coerce.number().min(0).max(10000),
    unit: z.string(),
  });

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      min: 0,
      remained: 0,
    },
  });

  const { storeProduct } = useProductService();
  async function submit(data: FormData) {
    await storeProduct(data as Product);

    navigate("/products");
  }

  const units = [
    ProductUnit.g,
    ProductUnit.kg,
    ProductUnit.ml,
    ProductUnit.l,
    ProductUnit.pcs,
    ProductUnit.pack,
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
        <Card className="p-4 space-y-4">
          {/* NAME */}
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

          {/* UNITS */}
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Units</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem value={unit} key={unit}>
                        {t(`labels.units.${unit}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  How do you measure the product?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* MIN */}
          <FormField
            control={form.control}
            name="min"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter min here"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Minimum amount of product you want keep in the storage
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* REMAINED */}
          <FormField
            control={form.control}
            name="remained"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remained</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter remained here"
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

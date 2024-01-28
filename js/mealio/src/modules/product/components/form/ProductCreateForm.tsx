import * as stylex from "@stylexjs/stylex";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "@/components/controls/Button";
import Fieldset from "@/components/form/Fieldset";
import NumberInput from "@/components/form/NumberInput";
import TextInput from "@/components/form/TextInput";
import { useProductService } from "@/modules/product/services/ProductService";
import Product from "@/modules/product/entities/Product";

const styles = stylex.create({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { storeProduct } = useProductService();
  async function submit(data: FormData) {
    await storeProduct(data as Product);

    navigate("/products");
  }

  return (
    <form {...stylex.props(styles.form)} onSubmit={handleSubmit(submit)}>
      <Fieldset>
        <TextInput label="Name" {...register("name")} error={errors.name} />
        <NumberInput
          label="Plan"
          {...register("plan", { valueAsNumber: true })}
          error={errors.plan}
        />
        <NumberInput
          label="Left"
          {...register("left", { valueAsNumber: true })}
          error={errors.left}
        />
      </Fieldset>
      <Button type="submit">Create</Button>
    </form>
  );
};

export default ProductCreateForm;

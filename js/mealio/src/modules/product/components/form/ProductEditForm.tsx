import * as stylex from "@stylexjs/stylex";
import { useNavigate } from "react-router-dom";
import Fieldset from "../../../../components/form/Fieldset";
import Button from "../../../../components/controls/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TextInput from "../../../../components/form/TextInput";
import NumberInput from "../../../../components/form/NumberInput";
import { db } from "../../../../vendor/firebase";
import { doc, updateDoc } from "firebase/firestore";
import Product from "../../entities/Product";

const styles = stylex.create({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

type Props = {
  product: Product;
};

const ProductEditForm: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  const schema = z.object({
    name: z.string().min(1).max(32),
    plan: z.number().min(1).max(10000),
    left: z.number().min(1).max(10000),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function submit(data: FormData) {
    await updateDoc(doc(db, `/products/${props.product.id}`), {
      ...data,
    });

    navigate("/products");
  }

  return (
    <form {...stylex.props(styles.form)} onSubmit={handleSubmit(submit)}>
      <Fieldset>
        <TextInput
          label="Name"
          {...register("name")}
          error={errors.name}
          defaultValue={props.product.name}
        />
        <NumberInput
          label="Plan"
          {...register("plan", { valueAsNumber: true })}
          error={errors.plan}
          defaultValue={props.product.plan}
        />
        <NumberInput
          label="Left"
          {...register("left", { valueAsNumber: true })}
          error={errors.left}
          defaultValue={props.product.left}
        />
      </Fieldset>
      <Button type="submit">Save</Button>
    </form>
  );
};

export default ProductEditForm;

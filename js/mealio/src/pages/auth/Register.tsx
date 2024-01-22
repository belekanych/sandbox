import * as stylex from "@stylexjs/stylex";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import GuestLayout from "../../components/layout/GuestLayout";
import Button from "../../components/controls/Button";
import EmailInput from "../../components/form/EmailInput";
import Fieldset from "../../components/form/Fieldset";
import PasswordInput from "../../components/form/PasswordInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "../../components/controls/Link";

const styles = stylex.create({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

function Register() {
  const auth = useAuth();
  const navigate = useNavigate();

  const schema = z
    .object({
      email: z.string().email(),
      password: z.string().min(6).max(64),
      passwordConfirmation: z.string().min(6).max(64),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Passwords do not match",
      path: ["passwordConfirmation"],
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
    if (!auth) {
      return;
    }

    await auth.signup(data.email, data.password);
    navigate("/");
  }

  return (
    <GuestLayout title="Register" footer={<Footer />}>
      <form {...stylex.props(styles.form)} onSubmit={handleSubmit(submit)}>
        <Fieldset>
          <EmailInput
            label="Email"
            {...register("email")}
            error={errors.email}
          />
          <PasswordInput
            label="Password"
            {...register("password")}
            error={errors.password}
          />
          <PasswordInput
            label="Confirm password"
            {...register("passwordConfirmation")}
            error={errors.passwordConfirmation}
          />
        </Fieldset>
        <Button type="submit">Register</Button>
      </form>
    </GuestLayout>
  );
}

export default Register;

function Footer() {
  return (
    <>
      Have an account? <Link to="/login">Login</Link>
    </>
  );
}

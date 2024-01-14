import * as stylex from "@stylexjs/stylex";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import GuestLayout from "../../components/layouts/GuestLayout";
import Fieldset from "../../components/form/Fieldset";
import Button from "../../components/controls/Button";
import EmailInput from "../../components/form/EmailInput";
import PasswordInput from "../../components/form/PasswordInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const styles = stylex.create({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(64),
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

    await auth.login(data.email, data.password);
    navigate("/");
  }

  return (
    <GuestLayout title="Login" footer={<Footer />}>
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
        </Fieldset>
        <Button type="submit">Register</Button>
      </form>
    </GuestLayout>
  );
}

function Footer() {
  return (
    <>
      Don't have an account? <Link to="/register">Register</Link>
    </>
  );
}

export default Login;

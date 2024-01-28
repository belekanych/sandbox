import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "@/components/controls/Button";
import EmailInput from "@/components/form/EmailInput";
import Fieldset from "@/components/form/Fieldset";
import PasswordInput from "@/components/form/PasswordInput";
import GuestLayout from "@/components/layout/GuestLayout";
import { useAuth } from "@/modules/auth/contexts/AuthContext";
import Link from "@/components/controls/Link";

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
      <form onSubmit={handleSubmit(submit)}>
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

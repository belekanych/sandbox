import * as stylex from "@stylexjs/stylex";
import Button from "../../../components/controls/Button";
import EmailInput from "../../../components/form/EmailInput";
import Fieldset from "../../../components/form/Fieldset";
import GuestLayout from "../../../components/layout/GuestLayout";
import Link from "../../../components/controls/Link";
import PasswordInput from "../../../components/form/PasswordInput";
import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { colors, spacing } from "../../../styles/tokens.stylex";

const styles = stylex.create({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  socialContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: spacing.md,
    borderStyle: "solid",
    borderColor: colors.gray90,
    borderWidth: spacing.none,
    borderTopWidth: spacing.one,
    paddingTop: spacing.md,
  },
});

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(64),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function submit(data: FormData) {
    if (!auth) {
      return;
    }

    try {
      await auth.login(data.email, data.password);
      navigate("/");
    } catch {
      setError("email", { type: "custom", message: t("errors.auth.failed") });
    }
  }

  async function submitGoogle() {
    if (!auth) {
      return;
    }

    try {
      await auth.signInWithGoogle();
      navigate("/");
    } catch {
      setError("email", { type: "custom", message: t("errors.auth.failed") });
    }
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
        <Button type="submit">{t("actions.login")}</Button>
      </form>
      <div {...stylex.props(styles.socialContainer)}>
        <Button type="button" onClick={submitGoogle}>
          Google
        </Button>
      </div>
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

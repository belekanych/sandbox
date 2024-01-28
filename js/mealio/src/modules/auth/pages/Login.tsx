import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import GuestLayout from "@/components/layout/GuestLayout";
import { useAuth } from "@/modules/auth/contexts/AuthContext";
import Link from "@/components/controls/Link";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(64),
  });

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function submit(data: FormData) {
    if (!auth) {
      return;
    }

    try {
      await auth.login(data.email, data.password);
      navigate("/");
    } catch {
      form.setError("email", {
        type: "custom",
        message: t("errors.auth.failed"),
      });
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
      form.setError("email", {
        type: "custom",
        message: t("errors.auth.failed"),
      });
    }
  }

  return (
    <GuestLayout title="Login" footer={<Footer />}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email here"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is your personal email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password here"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is secret phrase.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{t("actions.login")}</Button>
        </form>
      </Form>
      <div className="border-t mt-4 pt-4">
        <Button type="button" onClick={submitGoogle} variant={"secondary"}>
          Google
        </Button>
      </div>
    </GuestLayout>
  );
}

function Footer() {
  return (
    <>
      Don't have an account?{" "}
      <Button variant={"link"} asChild>
        <Link to="/register">Register</Link>
      </Button>
    </>
  );
}

export default Login;

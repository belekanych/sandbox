import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import GuestLayout from "@/components/layout/GuestLayout";
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
import SignInWithGoogle from "@/modules/auth/components/SignInWithGoogle";
import useAuthService from "@/modules/auth/services/AuthService";

function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login } = useAuthService();

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

  const onError = () => {
    form.setError("email", {
      type: "custom",
      message: t("errors.auth.failed"),
    });
  };

  async function submit(data: FormData) {
    try {
      await login(data.email, data.password);
      navigate("/");
    } catch {
      onError();
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
          <Button type="submit" className="w-full">
            {t("actions.login")}
          </Button>
        </form>
      </Form>
      <div className="border-t mt-4 pt-4">
        <SignInWithGoogle onError={onError} />
      </div>
    </GuestLayout>
  );
}

function Footer() {
  return (
    <>
      <span className="text-sm">Don't have an account?</span>
      <Button variant={"link"} asChild>
        <Link to="/register">Register</Link>
      </Button>
    </>
  );
}

export default Login;

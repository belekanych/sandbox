import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import GuestLayout from "@/components/layout/GuestLayout";
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
import { Button } from "@/components/ui/button";
import Link from "@/components/controls/Link";
import SignInWithGoogle from "@/modules/auth/components/SignInWithGoogle";
import { useTranslation } from "react-i18next";
import User from "@/modules/auth/entities/User";
import useAuthService from "@/modules/auth/services/AuthService";

function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { storeUser, signup } = useAuthService();

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

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
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
      const result = await signup(data.email, data.password);

      await storeUser({
        uid: result.user.uid,
        email: result.user.email,
      } as User);

      navigate("/");
    } catch {
      onError();
    }
  }

  return (
    <GuestLayout title="Register" footer={<Footer />}>
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
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Re-enter your password here"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Re-enter your password here to make sure it is the same.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </Form>
      <div className="border-t mt-4 pt-4">
        <SignInWithGoogle onError={onError} />
      </div>
    </GuestLayout>
  );
}

export default Register;

function Footer() {
  return (
    <>
      <span className="text-sm">Have an account?</span>
      <Button variant={"link"} asChild>
        <Link to="/login">Login</Link>
      </Button>
    </>
  );
}

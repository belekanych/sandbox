import { Button } from "@/components/ui/button";
import { useAuth } from "@/modules/auth/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignInWithGoogle(props: { onError: () => void }) {
  const auth = useAuth();
  const navigate = useNavigate();

  async function submitGoogle() {
    if (!auth) {
      return;
    }

    try {
      await auth.signInWithGoogle();
      navigate("/");
    } catch {
      props.onError();
    }
  }

  return (
    <Button
      type="button"
      onClick={submitGoogle}
      variant={"outline"}
      className="w-full"
    >
      Sign in with Google
    </Button>
  );
}

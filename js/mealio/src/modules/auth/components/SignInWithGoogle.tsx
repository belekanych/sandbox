import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { useAuth } from "@/modules/auth/contexts/AuthContext";
import User, { USER_COLLECTION } from "@/modules/auth/entities/User";
import { useUserService } from "@/modules/auth/services/UserService";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function SignInWithGoogle(props: { onError: () => void }) {
  const auth = useAuth();
  const navigate = useNavigate();
  const { storeUser } = useUserService();

  async function submitGoogle() {
    if (!auth) {
      return;
    }

    try {
      const authResult = await auth.signInWithGoogle();

      const userResult = await getDocs(
        query(
          collection(db, USER_COLLECTION),
          where("uid", "==", authResult.user.uid)
        )
      );

      if (!userResult.empty) {
        return;
      }

      await storeUser({
        uid: authResult.user.uid,
        email: authResult.user.email,
      } as User);

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

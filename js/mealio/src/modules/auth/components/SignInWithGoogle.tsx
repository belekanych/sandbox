import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import User, { USER_COLLECTION } from "@/modules/auth/entities/User";
import useAuthService from "@/modules/auth/services/AuthService";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function SignInWithGoogle(props: { onError: () => void }) {
  const navigate = useNavigate();
  const { storeUser, signInWithGoogle } = useAuthService();

  async function submitGoogle() {
    try {
      const authResult = await signInWithGoogle();

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

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExitIcon } from "@radix-ui/react-icons";
import useAuthService from "@/modules/auth/services/AuthService";

export default function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuthService();

  const submit = async () => {
    await logout();

    navigate("/");
  };

  return (
    <Button variant={"default"} onClick={submit} className="rounded-full">
      <ExitIcon />
    </Button>
  );
}

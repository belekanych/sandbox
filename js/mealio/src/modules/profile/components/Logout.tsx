import { useNavigate } from "react-router-dom";
import { useAuth } from "@/modules/auth/contexts/AuthContext";
import { Button } from "@/components/ui/button";

function Profile() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const submit = async () => {
    await logout();

    navigate("/");
  };

  return (
    <Button variant={"default"} onClick={submit} className="w-full mt-4">
      Logout
    </Button>
  );
}

export default Profile;

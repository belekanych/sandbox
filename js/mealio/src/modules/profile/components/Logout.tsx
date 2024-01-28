import { useNavigate } from "react-router-dom";
import { useAuth } from "@/modules/auth/contexts/AuthContext";

function Profile() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const submit = async () => {
    await logout();

    navigate("/");
  };

  return (
    <button type="button" onClick={submit}>
      Logout
    </button>
  );
}

export default Profile;

import { useAuth } from "../../contexts/AuthContext";
import GuestLayout from "../../components/layouts/GuestLayout";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const submit = async () => {
    await logout();

    navigate("/");
  };

  return (
    <GuestLayout title="Dashboard">
      Welcome, {currentUser ? currentUser.email : "Guest"}!
      <button type="button" onClick={submit}>
        Logout
      </button>
    </GuestLayout>
  );
}

export default Dashboard;

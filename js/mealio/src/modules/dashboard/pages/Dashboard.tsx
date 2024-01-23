import MainLayout from "../../../components/layout/MainLayout";
import { useAuth } from "../../auth/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const submit = async () => {
    await logout();

    navigate("/");
  };

  return (
    <MainLayout title="Dashboard">
      Welcome, {currentUser ? currentUser.email : "Guest"}!
      <button type="button" onClick={submit}>
        Logout
      </button>
    </MainLayout>
  );
}

export default Dashboard;

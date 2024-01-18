import MainLayout from "../../components/layouts/MainLayout";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

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
      <Link to="/products">Products</Link>
      <button type="button" onClick={submit}>
        Logout
      </button>
    </MainLayout>
  );
}

export default Dashboard;

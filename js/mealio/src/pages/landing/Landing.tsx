import { Link } from "react-router-dom";
import GuestLayout from "../../components/layouts/GuestLayout";

function Landing() {
  return (
    <GuestLayout title="Landing page">
      <Link to="/login">Login</Link>
    </GuestLayout>
  );
}

export default Landing;

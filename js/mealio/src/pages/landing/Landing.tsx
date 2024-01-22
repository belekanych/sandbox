import Link from "../../components/controls/Link";
import GuestLayout from "../../components/layout/GuestLayout";

function Landing() {
  return (
    <GuestLayout title="Landing page">
      <Link to="/login">Login</Link>
    </GuestLayout>
  );
}

export default Landing;

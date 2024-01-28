import MainLayout from "@/components/layout/MainLayout";
import Card from "@/components/layout/blocks/Card";
import { useAuth } from "@/modules/auth/contexts/AuthContext";
import Logout from "@/modules/profile/components/Logout";

function Profile() {
  const { currentUser } = useAuth();

  return (
    <MainLayout title="Profile">
      {currentUser ? (
        <Card>
          <div>
            {currentUser.photoURL ? <img src={currentUser.photoURL} /> : null}
            <div>
              <p>{currentUser.displayName}</p>
              <p>{currentUser.email}</p>
            </div>
          </div>
        </Card>
      ) : null}
      <Logout />
    </MainLayout>
  );
}

export default Profile;

import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/modules/auth/contexts/AuthContext";
import Lists from "@/modules/lists/components/Lists";
import Logout from "@/modules/profile/components/Logout";

function Profile() {
  const { currentUser } = useAuth();

  return (
    <MainLayout title="Profile">
      {currentUser ? (
        <div className="space-y-4">
          <Card>
            <div className="flex items-center p-4">
              {currentUser.photoURL ? (
                <img src={currentUser.photoURL} className="rounded-full" />
              ) : null}
              <div className="pl-4">
                <p className="font-bold text-md mb-2">
                  {currentUser.displayName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {currentUser.email}
                </p>
              </div>
            </div>
          </Card>
          <Lists />
        </div>
      ) : null}
      <Logout />
    </MainLayout>
  );
}

export default Profile;

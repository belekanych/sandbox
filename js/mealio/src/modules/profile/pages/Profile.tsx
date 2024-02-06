import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { selectCurrentUser } from "@/modules/auth/store";
import Lists from "@/modules/lists/components/Lists";
import Logout from "@/modules/profile/components/Logout";
import { useAppSelector } from "@/store/hooks";

export default function Profile() {
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <MainLayout title="Profile" header={<Logout />}>
      {currentUser ? (
        <div className="space-y-4">
          <Card>
            <div className="flex items-center p-4">
              {currentUser.photoURL ? (
                <img src={currentUser.photoURL} className="rounded-full mr-4" />
              ) : null}
              <div>
                {currentUser.displayName ? (
                  <p className="font-bold text-md mb-2">
                    {currentUser.displayName}
                  </p>
                ) : null}
                <p className="text-sm text-muted-foreground">
                  {currentUser.email}
                </p>
              </div>
            </div>
          </Card>
          <Lists />
        </div>
      ) : null}
    </MainLayout>
  );
}

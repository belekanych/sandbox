import * as stylex from "@stylexjs/stylex";
import { colors, fonts, spacing } from "../../../styles/tokens.stylex";
import MainLayout from "@/components/layout/MainLayout";
import Card from "@/components/layout/blocks/Card";
import { useAuth } from "@/modules/auth/contexts/AuthContext";
import Logout from "@/modules/profile/components/Logout";

const styles = stylex.create({
  userContainer: {
    display: "flex",
    alignItems: "center",
  },
  userImage: {
    borderRadius: spacing.borderRadius,
    marginRight: spacing.md,
  },
  userDisplayName: {
    fontWeight: "bold",
    fontSize: fonts.lg,
  },
  userEmail: {
    color: colors.gray15,
  },
});

function Profile() {
  const { currentUser } = useAuth();

  return (
    <MainLayout title="Profile">
      {currentUser ? (
        <Card>
          <div {...stylex.props(styles.userContainer)}>
            {currentUser.photoURL ? (
              <img
                src={currentUser.photoURL}
                {...stylex.props(styles.userImage)}
              />
            ) : null}
            <div>
              <p {...stylex.props(styles.userDisplayName)}>
                {currentUser.displayName}
              </p>
              <p {...stylex.props(styles.userEmail)}>{currentUser.email}</p>
            </div>
          </div>
        </Card>
      ) : null}
      <Logout />
    </MainLayout>
  );
}

export default Profile;

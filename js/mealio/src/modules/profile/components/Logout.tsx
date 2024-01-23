import * as stylex from "@stylexjs/stylex";
import { useAuth } from "../../auth/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { colors, spacing } from "../../../styles/tokens.stylex";

const styles = stylex.create({
  button: {
    display: "block",
    background: colors.gray100,
    border: spacing.none,
    width: "100%",
    borderRadius: spacing.borderRadius,
    boxShadow: colors.boxShadow,
    cursor: "pointer",
    padding: spacing.md,
    marginTop: spacing.lg,
    color: colors.gray0,
  },
});

function Profile() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const submit = async () => {
    await logout();

    navigate("/");
  };

  return (
    <button type="button" onClick={submit} {...stylex.props(styles.button)}>
      Logout
    </button>
  );
}

export default Profile;

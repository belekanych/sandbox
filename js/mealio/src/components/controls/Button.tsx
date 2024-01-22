import * as stylex from "@stylexjs/stylex";
import { colors, spacing } from "../../styles/tokens.stylex";

const styles = stylex.create({
  button: {
    border: spacing.none,
    padding: `${spacing.md} ${spacing.xl}`,
    borderRadius: spacing.sm,
    backgroundColor: colors.gray20,
    cursor: "pointer",
    color: colors.gray95,
    ":hover": {
      backgroundColor: colors.gray10,
    },
  },
});

interface Props {
  children: React.ReactNode;
  type: "submit" | "button";
  onClick?: () => void;
}

const Button: React.FC<Props> = (props) => {
  function onClick() {
    props.onClick && props.onClick();
  }

  return (
    <button
      {...stylex.props(styles.button)}
      type={props.type}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;

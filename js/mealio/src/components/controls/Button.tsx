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

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  type: "submit" | "button";
  disabled?: boolean;
}

const Button: React.FC<Props> = (props) => {
  return (
    <button
      {...stylex.props(styles.button)}
      {...props}
      type={props.type}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;

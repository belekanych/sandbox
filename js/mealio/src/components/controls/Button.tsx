import * as stylex from "@stylexjs/stylex";
import { colors, spacing } from "../../styles/tokens.stylex";

const styles = stylex.create({
  button: {
    border: spacing.none,
    padding: `${spacing.md} ${spacing.xl}`,
    borderRadius: spacing.sm,
    backgroundColor: colors.gray,
    color: colors.white,
  },
});

interface Props {
  children: React.ReactNode;
  type: "submit" | "button";
}

const Button: React.FC<Props> = (props) => {
  return (
    <button {...stylex.props(styles.button)} type={props.type}>
      {props.children}
    </button>
  );
};

export default Button;

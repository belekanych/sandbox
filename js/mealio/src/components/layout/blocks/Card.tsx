import * as stylex from "@stylexjs/stylex";
import { colors, spacing } from "../../../styles/tokens.stylex";

const styles = stylex.create({
  card: {
    backgroundColor: colors.gray100,
    borderRadius: spacing.lg,
    padding: spacing.lg,
    boxShadow: colors.boxShadow,
    width: "100%",
    boxSizing: "border-box",
  },
});

export default function Card(props: {
  children: React.ReactNode;
  el?: string;
}) {
  const El = (props.el || "div") as keyof JSX.IntrinsicElements;

  return (
    <El {...stylex.props(styles.card)} {...props}>
      {props.children}
    </El>
  );
}

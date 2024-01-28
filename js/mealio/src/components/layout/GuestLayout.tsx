import * as stylex from "@stylexjs/stylex";
import { colors, spacing } from "../../styles/tokens.stylex";
import Card from "@/components/layout/blocks/Card";

const styles = stylex.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: colors.gray90,
    padding: spacing.md,
    boxSizing: "border-box",
    color: colors.gray0,
  },
  heading: {
    textAlign: "center",
    color: colors.gray5,
  },
  footer: {
    padding: spacing.lg,
  },
});

interface Props {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const GuestLayout: React.FC<Props> = (props) => {
  return (
    <div {...stylex.props(styles.container)}>
      <Card el="main">
        <h1 {...stylex.props(styles.heading)}>{props.title}</h1>
        {props.children}
      </Card>
      {props.footer ? (
        <footer {...stylex.props(styles.footer)}>{props.footer}</footer>
      ) : null}
    </div>
  );
};

export default GuestLayout;

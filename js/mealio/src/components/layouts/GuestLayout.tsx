import * as stylex from "@stylexjs/stylex";
import { colors, spacing } from "../../styles/tokens.stylex";

const styles = stylex.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    backgroundColor: colors.background,
    borderRadius: spacing.lg,
    padding: spacing.base,
    boxShadow: colors.boxShadow,
    width: "100%",
  },
  heading: {
    textAlign: "center",
    color: colors.gray,
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
      <main {...stylex.props(styles.main)}>
        <h1 {...stylex.props(styles.heading)}>{props.title}</h1>
        {props.children}
      </main>
      {props.footer ? (
        <footer {...stylex.props(styles.footer)}>{props.footer}</footer>
      ) : null}
    </div>
  );
};

export default GuestLayout;

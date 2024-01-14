import * as stylex from "@stylexjs/stylex";
import { colors, spacing } from "../../styles/tokens.stylex";

const styles = stylex.create({
  main: {
    backgroundColor: colors.background,
    borderRadius: spacing.borderRadius,
    padding: spacing.base,
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
  },
});

interface Props {
  title: string;
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = (props) => {
  return (
    <>
      <main {...stylex.props(styles.main)}>
        <h1 {...stylex.props(styles.heading)}>{props.title}</h1>
        {props.children}
      </main>
    </>
  );
};

export default MainLayout;

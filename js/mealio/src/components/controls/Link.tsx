import * as stylex from "@stylexjs/stylex";
import { colors } from "../../styles/tokens.stylex";
import { Link as RouterLink } from "react-router-dom";

const styles = stylex.create({
  link: {
    textDecoration: "none",
    color: colors.gray20,
    ":hover": {
      color: colors.gray10,
    },
  },
});

interface Props {
  children: React.ReactNode;
  to: string;
}

const Link = (props: Props) => {
  return (
    <RouterLink
      unstable_viewTransition
      {...stylex.props(styles.link)}
      {...props}
    >
      {props.children}
    </RouterLink>
  );
};

export default Link;

import * as stylex from "@stylexjs/stylex";
import { colors } from "../../styles/tokens.stylex";
import { Link as RouterLink } from "react-router-dom";

const styles = stylex.create({
  link: {
    color: colors.gray,
    textDecoration: "none",
  },
});

interface Props {
  children: React.ReactNode;
  to: string;
}

const Link = (props: Props) => {
  return (
    <RouterLink {...props} {...stylex.props(styles.link)}>
      {props.children}
    </RouterLink>
  );
};

export default Link;

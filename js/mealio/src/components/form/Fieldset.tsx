import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  fieldset: {
    border: "none",
    width: "100%",
    padding: "0",
    margin: "0",
  },
});

interface Props {
  children: React.ReactNode;
}

const Fieldset: React.FC<Props> = ({ children }) => {
  return <fieldset {...stylex.props(styles.fieldset)}>{children}</fieldset>;
};

export default Fieldset;

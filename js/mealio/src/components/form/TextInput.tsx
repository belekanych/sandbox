import * as stylex from "@stylexjs/stylex";
import { colors } from "../../styles/tokens.stylex";

const styles = stylex.create({
  label: {
    display: "block",
  },
  input: {
    display: "block",
    width: "100%",
    borderRadius: "0",
    borderColor: colors.black,
    borderWidth: "1px",
    borderStyle: "solid",
  },
});

export interface InputProps {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

interface TextInputProps extends InputProps {
  type?: "text" | "email" | "password";
}

const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <>
      <label htmlFor={props.name} {...stylex.props(styles.label)}>
        {props.label}:
      </label>
      <input
        type={props.type || "text"}
        id={props.name}
        name={props.name}
        defaultValue={props.value}
        required={props.required}
        onChange={(e) => props.onChange(e.currentTarget.value)}
        {...stylex.props(styles.input)}
      />
    </>
  );
};

export default TextInput;

import * as stylex from "@stylexjs/stylex";
import { colors } from "../../styles/tokens.stylex";
import { ChangeHandler, FieldError } from "react-hook-form";
import { forwardRef } from "react";

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
  error: {
    color: colors.red,
  },
});

export interface InputProps {
  name: string;
  label: string;
  defaultValue?: string | number | readonly string[] | undefined;
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  min?: string | number;
  max?: string | number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  required?: boolean;
  disabled?: boolean;
  error?: FieldError;
}

interface TextInputProps extends InputProps {
  type?: "text" | "email" | "password" | "number";
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  return (
    <>
      <label htmlFor={props.name} {...stylex.props(styles.label)}>
        {props.label}:
      </label>
      <input
        type={props.type || "text"}
        id={props.name}
        ref={ref}
        aria-invalid={!!props.error}
        defaultValue={props.defaultValue}
        {...props}
        {...stylex.props(styles.input)}
      />
      {props.error ? (
        <span {...stylex.props(styles.error)}>{props.error.message}</span>
      ) : null}
    </>
  );
});

export default TextInput;

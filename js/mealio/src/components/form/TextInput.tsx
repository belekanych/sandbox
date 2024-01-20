import * as stylex from "@stylexjs/stylex";
import { colors, spacing } from "../../styles/tokens.stylex";
import { ChangeHandler, FieldError } from "react-hook-form";
import { forwardRef } from "react";

const styles = stylex.create({
  group: {
    marginBottom: spacing.xl,
  },
  label: {
    display: "block",
    fontWeight: "bolder",
    color: colors.gray5,
  },
  input: {
    display: "block",
    width: "100%",
    borderRadius: spacing.xs,
    borderColor: colors.gray5,
    borderWidth: "1px",
    borderStyle: "solid",
    boxSizing: "border-box",
    padding: spacing.sm,
    margin: `${spacing.sm} ${spacing.none}`,
    background: colors.none,
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
    <div {...stylex.props(styles.group)}>
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
    </div>
  );
});

export default TextInput;

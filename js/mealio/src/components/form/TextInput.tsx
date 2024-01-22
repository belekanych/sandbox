import * as stylex from "@stylexjs/stylex";
import { colors, fonts, spacing } from "../../styles/tokens.stylex";
import { ChangeHandler, FieldError } from "react-hook-form";
import { forwardRef } from "react";

const styles = stylex.create({
  group: {
    marginBottom: spacing.xl,
    position: "relative",
  },
  label: {
    display: "block",
    fontWeight: "bolder",
    color: colors.gray5,
    paddingBottom: spacing.sm,
  },
  input: {
    display: "block",
    width: "100%",
    borderRadius: spacing.xs,
    borderColor: colors.gray5,
    borderWidth: "1px",
    borderStyle: "solid",
    boxSizing: "border-box",
    padding: `${spacing.none} ${spacing.sm}`,
    background: colors.none,
    fontSize: fonts.base,
    height: spacing.xl,
    color: "inherit",
  },
  inputError: {
    borderColor: colors.red,
  },
  error: {
    paddingTop: spacing.xs,
    color: colors.red,
    fontSize: fonts.sm,
    position: "absolute",
    top: "100%",
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
        {...stylex.props(styles.input, props.error && styles.inputError)}
      />
      {props.error ? (
        <span {...stylex.props(styles.error)}>{props.error.message}</span>
      ) : null}
    </div>
  );
});

export default TextInput;

import { ChangeHandler, FieldError } from "react-hook-form";
import { forwardRef } from "react";

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
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor="email">{props.label}</label>
      <input
        ref={ref}
        type={props.type || "text"}
        aria-invalid={!!props.error}
        id={props.name}
        {...props}
      />
      {props.error ? <span>{props.error.message}</span> : null}
    </div>
  );
});

export default TextInput;

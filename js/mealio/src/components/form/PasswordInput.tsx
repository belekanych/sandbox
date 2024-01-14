import { forwardRef } from "react";
import TextInput, { InputProps } from "./TextInput";

const PasswordInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <TextInput ref={ref} {...props} type="password" />;
});

export default PasswordInput;

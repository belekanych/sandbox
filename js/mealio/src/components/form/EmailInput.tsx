import { forwardRef } from "react";
import TextInput, { InputProps } from "./TextInput";

const EmailInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <TextInput ref={ref} {...props} type="email" />;
});

export default EmailInput;

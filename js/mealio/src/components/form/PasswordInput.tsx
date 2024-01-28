import TextInput, { InputProps } from "@/components/form/TextInput";
import { forwardRef } from "react";

const PasswordInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <TextInput ref={ref} {...props} type="password" />;
});

export default PasswordInput;

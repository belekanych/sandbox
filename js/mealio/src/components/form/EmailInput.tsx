import TextInput, { InputProps } from "@/components/form/TextInput";
import { forwardRef } from "react";

const EmailInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <TextInput ref={ref} {...props} type="email" />;
});

export default EmailInput;

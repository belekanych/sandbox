import TextInput, { InputProps } from "@/components/form/TextInput";
import { forwardRef } from "react";

const NumberInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <TextInput ref={ref} {...props} type="number" />;
});

export default NumberInput;

import { forwardRef } from "react";
import TextInput, { InputProps } from "./TextInput";

const NumberInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <TextInput ref={ref} {...props} type="number" />;
});

export default NumberInput;

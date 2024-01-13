import TextInput, { InputProps } from "./TextInput";

const EmailInput: React.FC<InputProps> = (props) => {
  return TextInput({
    type: "email",
    ...props,
  });
};

export default EmailInput;

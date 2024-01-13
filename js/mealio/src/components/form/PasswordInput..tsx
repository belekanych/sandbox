import TextInput, { InputProps } from "./TextInput";

const PasswordInput: React.FC<InputProps> = (props) => {
  return TextInput({
    type: "password",
    ...props,
  });
};

export default PasswordInput;

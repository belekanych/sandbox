interface Props {
  children: React.ReactNode;
  type: "submit" | "button";
}

const Button: React.FC<Props> = (props) => {
  return <button type={props.type}>{props.children}</button>;
};

export default Button;

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  type: "submit" | "button";
  disabled?: boolean;
}

const Button: React.FC<Props> = (props) => {
  return (
    <button {...props} type={props.type} disabled={props.disabled}>
      {props.children}
    </button>
  );
};

export default Button;

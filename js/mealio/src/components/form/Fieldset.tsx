interface Props {
  children: React.ReactNode;
}

const Fieldset: React.FC<Props> = ({ children }) => {
  return <fieldset>{children}</fieldset>;
};

export default Fieldset;

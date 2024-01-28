import { Link as RouterLink } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  to: string;
}

const Link = (props: Props) => {
  return (
    <RouterLink unstable_viewTransition {...props}>
      {props.children}
    </RouterLink>
  );
};

export default Link;

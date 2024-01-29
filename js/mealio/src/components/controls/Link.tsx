import { Link as RouterLink } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  to: string;
  className?: string | undefined;
}

const Link = (props: Props) => {
  return (
    <RouterLink unstable_viewTransition {...props} className={props.className}>
      {props.children}
    </RouterLink>
  );
};

export default Link;

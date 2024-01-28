export default function Card(props: {
  children: React.ReactNode;
  el?: string;
}) {
  const El = (props.el || "div") as keyof JSX.IntrinsicElements;

  return <El {...props}>{props.children}</El>;
}

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const GuestLayout: React.FC<Props> = (props) => {
  return (
    <div className="flex justify-center items-center min-h-screen min-w-full p-4">
      <Card className="min-w-full">
        <CardHeader>
          <CardTitle className="text-2xl">{props.title}</CardTitle>
        </CardHeader>
        <CardContent>{props.children}</CardContent>
        {props.footer ? <CardFooter>{props.footer}</CardFooter> : null}
      </Card>
    </div>
  );
};

export default GuestLayout;

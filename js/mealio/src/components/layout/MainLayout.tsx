import { RiFridgeFill as ProductsIcon } from "react-icons/ri";
import { GiHotMeal as RecepiesIcon } from "react-icons/gi";
import { IoCalendar as CalendarIcon } from "react-icons/io5";
import { FaShoppingBasket as ShoppingListIcon } from "react-icons/fa";
import { FaUser as AccountIcon } from "react-icons/fa6";
import Link from "@/components/controls/Link";
import { useLocation } from "react-router-dom";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  header?: React.ReactElement;
}

const MainLayout: React.FC<Props> = ({
  title,
  header,
  children,
  ...restProps
}) => {
  const location = useLocation();

  const navItems = [
    {
      url: "/products",
      component: ProductsIcon,
    },
    {
      url: "/",
      component: RecepiesIcon,
    },
    {
      url: "/",
      component: CalendarIcon,
    },
    {
      url: "/shopping-list",
      component: ShoppingListIcon,
    },
    {
      url: "/profile",
      component: AccountIcon,
    },
  ];

  return (
    <div className="min-h-screen min-w-full relative" {...restProps}>
      <header className="w-full text-2xl font-bold pt-4 px-4 pb-0 flex justify-between">
        <h1>{title}</h1>
        {header ? header : null}
      </header>
      <main className="p-4">{children}</main>
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 flex px-4 bg-card text-muted-foreground shadow rounded-full">
        {navItems.map((item, key) => (
          <Link
            to={item.url}
            key={key}
            className={`p-4 text-2xl ${
              location.pathname === item.url && "text-accent-foreground"
            }`}
          >
            <item.component />
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MainLayout;

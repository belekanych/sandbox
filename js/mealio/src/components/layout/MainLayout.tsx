import { RiFridgeFill as ProductsIcon } from "react-icons/ri";
import { GiHotMeal as RecepiesIcon } from "react-icons/gi";
import { IoCalendar as CalendarIcon } from "react-icons/io5";
import { FaShoppingBasket as ShoppingListIcon } from "react-icons/fa";
import { FaUser as AccountIcon } from "react-icons/fa6";
import Link from "@/components/controls/Link";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

const MainLayout: React.FC<Props> = ({ title, children, ...restProps }) => {
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
    <div {...restProps}>
      <header>
        <h1>{title}</h1>
      </header>
      <main>{children}</main>
      <nav>
        {navItems.map((item, key) => (
          <Link to={item.url} key={key}>
            <item.component />
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MainLayout;

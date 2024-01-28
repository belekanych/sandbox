import * as stylex from "@stylexjs/stylex";
import { colors, spacing } from "../../styles/tokens.stylex";
import { RiFridgeFill as ProductsIcon } from "react-icons/ri";
import { GiHotMeal as RecepiesIcon } from "react-icons/gi";
import { IoCalendar as CalendarIcon } from "react-icons/io5";
import { FaShoppingBasket as ShoppingListIcon } from "react-icons/fa";
import { FaUser as AccountIcon } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import Link from "@/components/controls/Link";

const styles = stylex.create({
  container: {
    backgroundColor: colors.gray90,
    padding: spacing.md,
    color: colors.gray0,
    minHeight: "100vh",
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
  },
  heading: {
    textAlign: "center",
  },
  nav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: colors.gray100,
    display: "flex",
    boxShadow: colors.boxShadow,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  navLink: {
    color: colors.gray70,
  },
  navIcon: {
    width: "1.5rem",
    height: "1.5rem",
    padding: `calc(${spacing.base} * 4)`,
  },
  navIconActive: {
    color: colors.gray30,
  },
});

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

  const { pathname } = useLocation();

  return (
    <div {...stylex.props(styles.container)} {...restProps}>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.heading)}>{title}</h1>
      </header>
      <main>{children}</main>
      <nav {...stylex.props(styles.nav)}>
        {navItems.map((item, key) => (
          <Link to={item.url} {...stylex.props(styles.navLink)} key={key}>
            <item.component
              {...stylex.props(
                styles.navIcon,
                item.url === pathname && styles.navIconActive
              )}
            />
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MainLayout;

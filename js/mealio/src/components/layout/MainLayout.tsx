import * as stylex from "@stylexjs/stylex";
import { colors, spacing } from "../../styles/tokens.stylex";
import { NavLink } from "react-router-dom";
import { RiFridgeFill as ProductsIcon } from "react-icons/ri";
import { GiHotMeal as RecepiesIcon } from "react-icons/gi";
import { IoCalendar as CalendarIcon } from "react-icons/io5";
import { FaShoppingBasket as ShoppingListIcon } from "react-icons/fa";
import { FaUser as AccountIcon } from "react-icons/fa6";
import Card from "./blocks/Card";

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

interface Props {
  title: string;
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = (props) => {
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
      url: "/",
      component: ShoppingListIcon,
    },
    {
      url: "/dashboard",
      component: AccountIcon,
    },
  ];

  return (
    <div {...stylex.props(styles.container)}>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.heading)}>{props.title}</h1>
      </header>
      <Card el="main">{props.children}</Card>
      <nav {...stylex.props(styles.nav)}>
        {navItems.map((item, key) => (
          <NavLink to={item.url} {...stylex.props(styles.navLink)} key={key}>
            {({ isActive }) => (
              <item.component
                {...stylex.props(
                  styles.navIcon,
                  isActive && styles.navIconActive
                )}
              />
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default MainLayout;
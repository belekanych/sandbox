import * as stylex from "@stylexjs/stylex";

export const colors = stylex.defineVars({
  background: "white",
  black: "hsl(0 1% 5%)",
  white: "white",
  red: "hsl(0 70% 50%)",
  lightGray: "hsl(0 10% 70%)",
  gray: "hsl(0 10% 40%)",
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
});

export const spacing = stylex.defineVars({
  borderRadius: "16px",
  base: "4px",
  none: "0px",
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "20px",
  xl: "32px",
  xl2: "48px",
  xl3: "96px",
});

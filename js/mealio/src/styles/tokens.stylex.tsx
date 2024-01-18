import * as stylex from "@stylexjs/stylex";

export const colors = stylex.defineVars({
  background: "white",
  black: "hsl(0 1% 5%)",
  red: "hsl(0 70% 50%)",
  lightGray: "hsl(0 10% 70%)",
  gray: "hsl(0 10% 40%)",
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
});

export const spacing = stylex.defineVars({
  borderRadius: "16px",
  base: "4px",
});

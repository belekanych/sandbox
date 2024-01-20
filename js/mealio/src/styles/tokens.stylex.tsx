import * as stylex from "@stylexjs/stylex";

// A constant can be used to avoid repeating the media query
const DARK = "@media (prefers-color-scheme: dark)";

export const colors = stylex.defineVars({
  none: "none",
  background: "white",
  black: "hsl(var(--base-hue), 1%, 5%)",
  white: "white",
  red: "0, 70%, 50%)",
  lightGray: "hsl(var(--base-hue), var(--base-sat-low), 70%)",
  gray: {
    default: "hsl(var(--base-hue), var(--base-sat-low), 40%)",
    [DARK]: "hsl(var(--base-hue), var(--base-sat-low), 40%)",
  },
  gray0: {
    default: "hsl(var(--base-hue), var(--base-sat-low), 0%)",
    [DARK]: "hsl(var(--base-hue), var(--base-sat-low), 100%)",
  },
  gray5: {
    default: "hsl(var(--base-hue), var(--base-sat-low), 5%)",
    [DARK]: "hsl(var(--base-hue), var(--base-sat-low), 95%)",
  },
  gray10: {
    default: "hsl(var(--base-hue), var(--base-sat-low), 10%)",
    [DARK]: "hsl(var(--base-hue), var(--base-sat-low), 90%)",
  },
  gray15: {
    default: "hsl(var(--base-hue), var(--base-sat-low), 15%)",
    [DARK]: "hsl(var(--base-hue), var(--base-sat-low), 85%)",
  },
  gray20: {
    default: "hsl(var(--base-hue), var(--base-sat-low), 20%)",
    [DARK]: "hsl(var(--base-hue), var(--base-sat-low), 80%)",
  },
  gray30: {
    default: "hsl(var(--base-hue), var(--base-sat-low), 30%)",
    [DARK]: "hsl(var(--base-hue), var(--base-sat-low), 70%)",
  },
  gray40: {
    default: "hsl(var(--base-hue), var(--base-sat-low), 40%)",
    [DARK]: "hsl(var(--base-hue), var(--base-sat-low), 60%)",
  },
  gray50: {
    default: "hsl(var(--base-hue), var(--base-sat-low), 50%)",
    [DARK]: "hsl(var(--base-hue), var(--base-sat-low), 50%)",
  },
  gray60: {
    default: "hsl(var(--base-hue), var(--base-sat-low), 60%)",
    [DARK]: "hsl(var(--base-hue), var(--base-sat-low), 40%)",
  },
  gray70: {
    default: "hsl(var(--base-hue), var(--base-sat-low), 70%)",
    [DARK]: "hsl(var(--base-hue), var(--base-sat-low), 30%)",
  },
  gray80: {
    default: "hsl(var(--base-hue), var(--base-sat-low), 80%)",
    [DARK]: "hsl(var(--base-hue), var(--base-sat-low), 20%)",
  },
  gray85: {
    default: "hsl(var(--base-hue), var(--base-sat-low), 85%)",
    [DARK]: "hsl(var(--base-hue), var(--base-sat-low), 15%)",
  },
  gray90: {
    default: "hsl(var(--base-hue), var(--base-sat-low), 90%)",
    [DARK]: "hsl(var(--base-hue), var(--base-sat-low), 10%)",
  },
  gray95: {
    default: "hsl(var(--base-hue), var(--base-sat-low), 95%)",
    [DARK]: "hsl(var(--base-hue), var(--base-sat-low), 5%)",
  },
  gray100: {
    default: "hsl(var(--base-hue), var(--base-sat-low), 100%)",
    [DARK]: "hsl(var(--base-hue), var(--base-sat-low), 0%)",
  },
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

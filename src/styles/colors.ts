export type tColor =
  | "green200"
  | "green100"
  | "grey160"
  | "grey140"
  | "grey120"
  | "grey100"
  | "grey80"
  | "grey60"
  | "grey40"
  | "grey20"
  | "red100"
  | "blue100"
  | "black"
  | "white";

export const Color: Record<tColor, string> = {
  green200: "#20C895",
  green100: "#27fbbc33",
  grey160: "#f5f5f7",
  grey140: "#EEF0F6",
  grey120: "#EAEAEA",
  grey100: "#E0E0E0",
  grey80: "#B8BCC8",
  grey60: "#5C5C5C",
  grey40: "#222222",
  grey20: "rgba(0, 0, 0, 0.45)",
  red100: "#EA3928",
  blue100: "#508DE9",
  black: "#000000",
  white: "#FFFFFF"
};

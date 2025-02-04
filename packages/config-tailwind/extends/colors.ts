import tailwindColors from "tailwindcss/colors";

const extendedTailwindColors = {
  amber: tailwindColors.amber,
  current: "currentColor",
  indigo: tailwindColors.indigo,
  transparent: "transparent",
  white: "#ffffff",
  yellow: tailwindColors.yellow,
};

export const staticColors = {
  black: "#000000",
  cyan: {
    50: "#E0F7FA",
    100: "#B3ECEF",
    200: "#80E1E3",
    300: "#4DD6D8",
    400: "#26CCCE",
    500: "#00C2C3",
    600: "#00A0A1",
    700: "#00777A",
    800: "#004F52",
    900: "#002729",
  },
  blue: {
    50: "#EBF8FF",
    100: "#BEE3F8",
    200: "#90CDF4",
    300: "#63B3ED",
    400: "#4299E1",
    500: "#0078D4",
    600: "#2B6CB0",
    700: "#2C5282",
    800: "#2A4365",
    900: "#1A365D",
  },
  olive: {
    50: "#FAF9E0",
    100: "#F5F2C2",
    200: "#EBE586",
    300: "#E0D849",
    400: "#D7CF1A",
    500: "#C0B60B",
    600: "#A39B09",
    700: "#807707",
    800: "#5D5405",
    900: "#3A3203",
    950: "#1A1A00",
  },
  coral: {
    50: "#FFE2D9",
    400: "#FF7042",
  },
  gray: {
    50: "#F7F7F7",
    100: "#E1E1E1",
    200: "#CFCFCF",
    300: "#B1B1B1",
    400: "#9E9E9E",
    500: "#7E7E7E",
    600: "#626262",
    700: "#515151",
    800: "#3B3B3B",
    900: "#222222",
  },
  green: {
    50: "#DEFBEC",
    100: "#BEF8D9",
    300: "#5DEDA2",
    400: "#19BA80",
    500: "#149566",
    600: "#0F704D",
  },
  mint: {
    50: "#B9F6EB",
    200: "#29E3C1",
    300: "#5DEDA2",
  },
  ocean: {
    50: "#D1DCF0",
    100: "#A8BCE1",
    300: "#557DC4",
    400: "#2B5DB6",
    500: "#234C95",
    600: "#1B3B74",
    700: "#183362",
    800: "#0C1A32",
  },
  orange: {
    50: "#FBE5D4",
    200: "#F4B785",
    300: "#F1A05D",
    400: "#FF820F",
    500: "#CC752C",
  },
  pink: {
    50: "#FED7F3",
    100: "#FEB2E9",
    200: "#FD8CDE",
    300: "#FD67D4",
    400: "#FC42C9",
  },
  purple: {
    50: "#E2DBF7",
    100: "#CABCF1",
    200: "#B19CEA",
    300: "#997DE4",
    400: "#805EDD",
  },
  red: {
    50: "#FCD3D3",
    100: "#FAADAD",
    200: "#F88989",
    300: "#F56260",
    400: "#F23C3A",
    500: "#D43130",
    600: "#B52725",
    700: "#941C1C",
    800: "#731414",
    900: "#520D0D",
  },
  sky: {
    50: "#D4E7FC",
    100: "#AED1F9",
    300: "#6DB0FC",
    400: "#3D91F0",
    600: "#2769B4",
    500: "#327DD2",
    700: "#1D5696",
    900: "#072E5A",
  },
  space: {
    300: "#4D5D8A",
    500: "#202F57",
    600: "#1F2942",
    700: "#182134",
  },
  stone: {
    50: "#F1F3F8",
    100: "#D7D8DF",
    300: "#9C9FB1",
    400: "#7C8099",
    500: "#5D6280",
    600: "#4C5068",
    700: "#3B3E51",
  },
  storm: {
    50: "#A4C3DA",
    200: "#7A96AB",
    500: "#354C5C",
    600: "#192E3D",
    700: "#142631",
    800: "#101D27",
  },
};

const colors = {
  ...staticColors,
  ...extendedTailwindColors,
};

export default colors;

import type { Config } from "tailwindcss";

const config: Pick<Config, "content" | "presets" | "theme" | "plugins"> = {
  theme: {
    extend: {
      fontSize: {
        "dv-tabs-font": "13px",
      },
      spacing: {
        "dv-tabs-height": "35px",
      },
      boxShadow: {
        "dv-floating": "8px 8px 8px 0px rgba(83, 89, 93, 0.5)",
      },
      zIndex: {
        "dv-overlay": "999",
      },
      borderWidth: {
        "dv-tab-divider": "1px",
      },
      opacity: {
        "dv-dragging": "0.5",
      },
      outline: {
        "dv-focus-outline": "1px solid var(--moss-paneview-active-outline-color)",
      },
    },
  },
};

export default config;

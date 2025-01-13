// Default
import { Theme } from "@repo/moss-theme";

import { linearGradient, rgb, rgba } from "../color.ts";

export const defaultDarkTheme: Theme = {
  name: "Moss Dark Default",
  slug: "moss-dark",
  type: "dark",
  isDefault: false,
  colors: {
    "primary": { "type": "solid", "value": rgba(255, 255, 255, 1) }, // prettier-ignore
    "sideBar.background": { type: "solid", value: rgba(39, 39, 42, 1) },
    "toolBar.background": { type: "solid", value: rgba(30, 32, 33, 1) },
    "page.background": { type: "solid", value: rgba(22, 24, 25, 1) },
    "statusBar.background": {
      type: "gradient",
      value: linearGradient(
        "90deg",
        [rgba(255, 0, 0, 1), 0],
        [rgba(224, 0, 41, 1), 16],
        [rgba(190, 0, 87, 1), 34],
        [rgba(155, 0, 133, 1), 51],
        [rgba(63, 0, 255, 1), 100]
      ),
    },
    "windowsCloseButton.background": { type: "solid", value: rgba(196, 43, 28, 1) },
    "windowControlsLinux.background": { type: "solid", value: rgba(55, 55, 55, 1) },
    "windowControlsLinux.text": { type: "solid", value: rgba(255, 255, 255, 1) },
    "windowControlsLinux.hoverBackground": { type: "solid", value: rgba(66, 66, 66, 1) },
    "windowControlsLinux.activeBackground": { type: "solid", value: rgba(86, 86, 86, 1) },

    "paneview.active.outline.color": { type: "solid", value: "dodgerblue" },
    "drag.over.background.color": { type: "solid", value: rgba(83, 89, 93, 0.5) },
    "drag.over.border.color": { type: "solid", value: "white" },
    "tabs.container.scrollbar.color": { type: "solid", value: "#888" },
    "icon.hover.background.color": { type: "solid", value: rgba(90, 93, 94, 0.31) },
    "group.view.background.color": { type: "solid", value: "#1E1E1E" },
    "tabs.and.actions.container.background.color": { type: "solid", value: "#252526" },
    "activegroup.visiblepanel.tab.background.color": { type: "solid", value: "#1E1E1E" },
    "activegroup.hiddenpanel.tab.background.color": { type: "solid", value: "#2D2D2D" },
    "inactivegroup.visiblepanel.tab.background.color": { type: "solid", value: "#1E1E1E" },
    "inactivegroup.hiddenpanel.tab.background.color": { type: "solid", value: "#2D2D2D" },
    "tab.divider.color": { type: "solid", value: "#1E1E1E" },
    "activegroup.visiblepanel.tab.color": { type: "solid", value: "white" },
    "activegroup.hiddenpanel.tab.color": { type: "solid", value: "#969696" },
    "inactivegroup.visiblepanel.tab.color": { type: "solid", value: "#8F8F8F" },
    "inactivegroup.hiddenpanel.tab.color": { type: "solid", value: "#626262" },
    "separator.border": { type: "solid", value: rgb(68, 68, 68) },
    "paneview.header.border.color": { type: "solid", value: rgba(204, 204, 204, 0.2) },

    "tabs.and.actions.container.font.size": { type: "solid", value: "13px" },
    "tabs.and.actions.container.height": { type: "solid", value: "35px" },
    "floating.box.shadow": { type: "solid", value: "8px 8px 8px 0px rgba(83, 89, 93, 0.5)" },
    "overlay.z.index": { type: "solid", value: "999" },
  },
};

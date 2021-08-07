import { FigmaIcon, InvalidIcon } from "@bbbottle/bbicons";

import { EmptyApp, FigmaDesignApp } from "../apps";

export const XTERM_THEME = {
  red: "#ff8888",
  yellow: "#fdd587",
  green: "#51c49f",
};

export const EMPTY_APP_ID = "empty";

/**
 * 画布应用配置信息
 */
export const CANVAS_APPLICATIONS = [
  {
    id: EMPTY_APP_ID,
    name: "empty",
    icon: InvalidIcon,
    component: EmptyApp,
    description: "nothing",
    widthRange: [0, 300],
    heightRange: [0, 300],
  },
  {
    id: "fgm-design",
    name: "zjh.im design live",
    icon: FigmaIcon,
    component: FigmaDesignApp,
    description: "photo gallery",
    widthRange: [500, 800],
    heightRange: [500, 600],
  }
];

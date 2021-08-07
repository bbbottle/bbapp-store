import React from "react";
import { AbsolutePositionedBox } from "./absolute_positioned_box";
import { quadrantHorizontalFlip } from "../utils";

const centerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const VerticalTick = (props) => {
  const {
    cursorQuadrant,
    hostInfo,
    rectHeight,
    tickWidth,
    tickHeight,
    offset = 0,
    children,
    style = {},
    ...rest
  } = props;

  const [x, y] = hostInfo.startPos;

  const negQud = new Set([4, 3]);
  const yOffset = negQud.has(cursorQuadrant)
    ? rectHeight - tickHeight / 2
    : -1 * rectHeight + tickHeight / 2;

  return (
    <AbsolutePositionedBox
      {...rest}
      style={{ ...style, ...centerStyle }}
      quadrant={quadrantHorizontalFlip(cursorQuadrant)}
      width={tickWidth}
      height={tickHeight}
      fixedPointCoordinate={[x, y + yOffset]}
    >
      {children}
    </AbsolutePositionedBox>
  );
};

import React from "react";
import { AbsolutePositionedBox } from "./absolute_positioned_box";
import { quadrantVerticalFlip } from "../utils";

const centerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const HorizontalTick = (props) => {
  const {
    cursorQuadrant,
    hostInfo,
    rectWidth,
    tickWidth,
    tickHeight,
    offset = 0,
    children,
    style = {},
    ...rest
  } = props;

  const [x, y] = hostInfo.startPos;

  const topQud = new Set([1, 2]);
  const negQud = new Set([2, 3]);

  const xOffset = negQud.has(cursorQuadrant)
    ? -1 * rectWidth + tickWidth / 2
    : 1 * rectWidth - tickWidth / 2;

  const yOffset = topQud.has(cursorQuadrant) ? offset : -1 * offset;

  return (
    <AbsolutePositionedBox
      {...rest}
      style={{ ...style, ...centerStyle }}
      quadrant={quadrantVerticalFlip(cursorQuadrant)}
      width={tickWidth}
      height={tickHeight}
      fixedPointCoordinate={[x + xOffset, y + yOffset]}
    >
      {children}
    </AbsolutePositionedBox>
  );
};

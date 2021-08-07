import React from "react";
import { AbsolutePositionedBox } from "./absolute_positioned_box";
import { HorizontalTick } from "./hrizontal_tick";

export const AppLivableZoneEdge = (props) => {
  const { app, hostInfo, cursorQuadrant } = props;
  const appIconSize = 24;

  const edgeColor = app.isEmpty() ? "#ddd" : "#51c49f";

  return (
    <>
      <HorizontalTick
        style={{ opacity: 0.5 }}
        hostInfo={hostInfo}
        cursorQuadrant={cursorQuadrant}
        rectWidth={app.livableZone.maxZone.width}
        tickWidth={appIconSize}
        tickHeight={appIconSize}
      >
        {app.renderIcon()}
      </HorizontalTick>
      <AbsolutePositionedBox
        quadrant={cursorQuadrant}
        fixedPointCoordinate={hostInfo.startPos}
        originCalibrateValue={1}
        width={app.livableZone.maxZone.width}
        height={app.livableZone.maxZone.height}
        style={{
          border: `dashed 1px ${edgeColor}`,
        }}
      />
    </>
  );
};

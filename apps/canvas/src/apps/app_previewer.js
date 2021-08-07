import React from "react";
import cn from "classnames";
import CLS from "./style.scss";
import TOKEN from "../style/token.scss";
import { AppAxis } from "./app_axis";
import { AbsolutePositionedBox } from "./absolute_positioned_box";
import { HorizontalTick } from "./hrizontal_tick";
import { VerticalTick } from "./vertial_tick";

export const AppPreviewer = (props) => {
  const { boxInfo, availableApp, cursorQuadrant } = props;

  const commonTickProps = {
    className: TOKEN.docFont,
    hostInfo: boxInfo,
    offset: 25,
    tickWidth: 50,
    tickHeight: 20,
    style: { zIndex: 3 },
    cursorQuadrant,
  };

  return (
    <div className={cn(CLS.previewer)}>
      <AbsolutePositionedBox
        className={cn(CLS.previewBox, TOKEN.green2, TOKEN.docFont, {
          [CLS.active]: !availableApp.isEmpty(),
        })}
        quadrant={cursorQuadrant}
        originCalibrateValue={AppAxis.thick}
        fixedPointCoordinate={boxInfo.startPos}
        width={boxInfo.width}
        height={boxInfo.height}
      />
      {props.children}
      <HorizontalTick {...commonTickProps} rectWidth={boxInfo.width}>
        {boxInfo.width}
      </HorizontalTick>
      <VerticalTick {...commonTickProps} rectHeight={boxInfo.height}>
        {boxInfo.height}
      </VerticalTick>
      <AppAxis originCoordinate={boxInfo.startPos} />
    </div>
  );
};

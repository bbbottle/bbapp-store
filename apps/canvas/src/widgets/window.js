import React, { useEffect, useState } from "react";
import Cls from "classnames";

import { WindowTitleBar } from "./window_title_bar";
import Style from "./window.scss";

export const Window = (props) => {
  const {
    style,
    children,
    onMinimizeBtnClick,
    onZoomBtnClick,
    onDidMount = () => null,
    onClick = () => null,
    onDragStart = () => null,
    onDragEnd = () => null,
    ...rest
  } = props;

  const [isDragging, setDrag] = useState(false);

  useEffect(() => {
    onDidMount();
  }, []);

  return (
    <div
      className={Cls(Style.window, {
        [Style.topLayer]: rest.active,
      })}
      onClick={onClick}
    >
      <WindowTitleBar
        onMinimizeBtnClick={(e) => {
          onMinimizeBtnClick && onMinimizeBtnClick(e);
        }}
        onZoomBtnClick={(e) => {
          onZoomBtnClick && onZoomBtnClick(e);
        }}
        onDragStart={(e) => {
          setDrag(true);
          onDragStart(e);
        }}
        onDragEnd={(e) => {
          setDrag(false);
          onDragEnd(e);
        }}
        {...rest}
      />
      <div
        className={Cls(Style.windowBody, {
          [Style.noPointerEvent]: isDragging,
        })}
      >
        {children}
      </div>
    </div>
  );
};

Window.TITLE_BAR_HEIGHT = 38;

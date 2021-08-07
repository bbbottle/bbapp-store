import React from "react";
import classname from "classnames";

import CLS from "./index.scss";

export const BlinkDot = () => {
  return <span className={CLS.blinkDot}>·</span>;
};

export const TickLoader = ({ absCenter, style }) => {
  return (
    <div
      style={style}
      className={classname(CLS.tickLoader, {
        [CLS.center]: absCenter,
      })}
    />
  );
};

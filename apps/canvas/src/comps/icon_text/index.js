import React from "react";
import cn from "classnames";
import cls from "./index.module.scss";

export const IconText = (props) => {
  const noop = () => null;
  return (
    <span
      className={cn(cls.IconText, props.className || "")}
      style={{ color: props.color || "black" }}
      onClick={props.onClick || noop}
    >
      <span className={cls.icon}>{props.icon}</span>
      {props.text || props.children}
    </span>
  );
};

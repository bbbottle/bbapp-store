import React from "react";
// import PropTypes from 'prop-types';
import Cls from "classnames";

import Style from "./window.scss";

import { IconText } from "../comps/icon_text";
import { createDragObservable } from "../utils";

export const WindowOptionButton = (props) => {
  const { className, onClick, disabled, title } = props;

  const classnames = Cls(
    className,
    Style.hoverAbsAfterAndBefore,
    Style.windowOptionButton,
    {
      [Style.disabledButton]: disabled,
    }
  );
  return (
    <button
      title={title}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      className={classnames}
    />
  );
};

export class WindowTitleBar extends React.PureComponent {
  componentDidMount() {
    this.dragObservable$ = createDragObservable(
      this.titleBar,
      this.handleDragStart,
      this.handleDragEnd
    );
    this.dragObservable$.subscribe(this.handleMove);
  }

  handleDragStart = (e) => {
    const onDragStart = this.props.onDragStart || (() => null);
    onDragStart(e);
  };

  handleDragEnd = (e) => {
    const onDragEnd = this.props.onDragEnd || (() => null);
    onDragEnd(e);
  };

  handleMove = (e) => {
    const onDrag = this.props.onDrag || (() => null);
    onDrag(e);
  };

  render() {
    const noop = () => null;
    const {
      onCloseBtnClick = noop,
      onMinimizeBtnClick = noop,
      onZoomBtnClick = noop,
      icon = null,
      title = "",
      active,
    } = this.props;

    return (
      <div className={Style.windowTitleBar}>
        <div
          className={Cls(Style.windowTitle, {
            [Style.halfTransparent]: !active,
          })}
          ref={(r) => {
            this.titleBar = r;
          }}
        >
          <IconText icon={icon} text={title} />
        </div>
        <div className={Style.windowOptionButtonGroup}>
          <WindowOptionButton
            title="close"
            disabled={!active}
            className={Style.close}
            onClick={onCloseBtnClick}
          />
          <WindowOptionButton
            title="minimize"
            disabled={!active}
            className={Style.minimize}
            onClick={onMinimizeBtnClick}
          />
          <WindowOptionButton
            title="zoom"
            disabled={!active}
            className={Style.zoom}
            onClick={onZoomBtnClick}
          />
        </div>
      </div>
    );
  }
}

import React from "react";
import { EMPTY_APP_ID } from "../const";
import { AppLivableZoneEdge } from "../apps/app_livable_zone_edge";
import { Window } from "../widgets/window";

export class Zone {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  isLargerThan = (zone) => {
    return this.width > zone.width && this.height > zone.height;
  };

  isSmallerThan = (zone) => {
    return this.width < zone.width && this.height < zone.height;
  };
}

export class HostZone extends Zone {
  constructor(left, top, width, height) {
    super(width, height);
    this.left = left;
    this.top = top;
  }
}

export class LivableZone {
  constructor(minZone, maxZone) {
    this.minZone = minZone;
    this.maxZone = maxZone;
  }

  static create(widthRang, heightRange) {
    const [minW, maxW] = widthRang;
    const [minH, maxH] = heightRange;
    const minZone = new Zone(minW, minH);
    const maxZone = new Zone(maxW, maxH);
    return new LivableZone(minZone, maxZone);
  }
}

/**
 * 画布应用
 */
export class CanvasApp {
  constructor(
    id,
    name,
    Icon,
    CompClass,
    description,
    livableZone,
    extras = {}
  ) {
    this.id = id;
    this.name = name;
    this.icon = Icon;
    this.description = description;
    this.livableZone = livableZone;
    this.Component = CompClass;

    this.installed = false;
    this.minimized = false;
    this.extras = extras;
  }

  canLiveIn = (hostZone) => {
    return (
      this.livableZone.minZone.isSmallerThan(hostZone) &&
      this.livableZone.maxZone.isLargerThan(hostZone)
    );
  };

  isEmpty = () => {
    return this.id === EMPTY_APP_ID;
  };

  minimize = (box) => {
    box.boxStyle.transition = "width, height .3s";
    box.boxStyle.height = 38;
    box.boxStyle.width = 300;
  };

  zoomTo = (width, height) => (box) => {
    box.boxStyle.width = width;
    box.boxStyle.height = height;
  };

  move = (movementX, movementY) => (box) => {
    const dx = movementX / window.devicePixelRatio;
    const dy = movementY / window.devicePixelRatio;
    box.boxStyle.left += dx;
    box.boxStyle.top += dy;
  };

  renderIcon = () => {
    const Icon = this.icon;
    return <Icon />;
  };

  active = (box) => {
    box.updateTime = Date.now();
  };

  renderLivableZoneEdge = (hostInfo, cursorQuadrant) => {
    return (
      <AppLivableZoneEdge
        app={this}
        hostInfo={hostInfo}
        cursorQuadrant={cursorQuadrant}
      />
    );
  };

  render = (props) => {
    const Component = this.Component;
    const isWinActive = this.extras.isActive(this);
    return (
      <Window
        active={isWinActive}
        onClick={() => {
          this.extras.active(this);
          props.update(this.active);
        }}
        onDrag={(e) => {
          this.extras.active(this);
          props.update(this.move(e.movementX, e.movementY));
        }}
        onMinimizeBtnClick={() => {
          if (this.minimized) {
            return;
          }
          this.minimized = true;
          this.originHeight = props.boxStyle.height;
          this.originWidth = props.boxStyle.width;
          props.update(this.minimize);
        }}
        onZoomBtnClick={() => {
          if (!this.minimized) {
            return;
          }
          this.minimized = false;
          props.update(this.zoomTo(this.originWidth, this.originHeight));
        }}
        onCloseBtnClick={() => {
          props.remove();
          this.extras.uninstall(this);
        }}
        title={this.name}
        icon={this.renderIcon()}
        style={props.boxStyle}
      >
        <Component
          {...props}
          windowBodyHeight={props.boxStyle.height - Window.TITLE_BAR_HEIGHT}
          windowBodyWidth={props.boxStyle.width}
          active={isWinActive}
          destroy={() => {
            props.remove();
            this.extras.uninstall(this);
          }}
        />
      </Window>
    );
  };
}

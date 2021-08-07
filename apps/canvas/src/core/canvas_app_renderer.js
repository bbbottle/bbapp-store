import React from "react";
import { CanvasAppRegistry } from "./canvas_app_registry";
import { AppPreviewer } from "../apps";
import { SlotMachine } from "../comps/slot_machine";
import { getQuadrantByStartEndPos } from "../utils";
import { AbsolutePositionedBox } from "../apps/absolute_positioned_box";

/**
 * 画布应用渲染器
 */
export class CanvasAppRenderer extends CanvasAppRegistry {
  constructor(external) {
    super();
    this.addSitePage = external.addSitePage;
  }

  isDrawingPreviewer = () => {
    return this._isPreview;
  };

  enterPreviewMode = () => {
    this._isPreview = true;
  };

  exitPreviewMode = () => {
    this._isPreview = false;
  };

  canRenderApp = (hostInfo) => {
    return !this.availableApp(hostInfo).isEmpty();
  };

  renderCursorTracker = (content, hostInfo, cursorQuadrant) => {
    return (
      <AbsolutePositionedBox
        offset={10}
        fixedPointCoordinate={hostInfo.endPos}
        quadrant={cursorQuadrant}
      >
        {content}
      </AbsolutePositionedBox>
    );
  };

  renderAvailableAppsLivableZoneEdge = (hostInfo, cursorQuadrant) => {
    const apps = this.availableApps();
    if (apps.length === 1 && apps[0].isEmpty()) {
      return null;
    }
    return apps.map((app) => {
      return app.renderLivableZoneEdge(hostInfo, cursorQuadrant);
    });
  };

  renderClearButton = () => null;

  renderApp = (props) => {
    const options = {
      isDrawingPreviewer: this.isDrawingPreviewer(),
    };
    const app = this.getInstalledApp(props.id);
    if (!app) {
      return null;
    }
    return app.render(
      {
        ...props,
        addSitePage: this.addSitePage,
        addCanvasApp: this._registerApp,
      },
      options
    );
  };

  renderSlotMachine = (app) => {
    const slotMachineSize = 24;
    const slotMachinePatterns = this.availableApps()
      .filter((a) => !a.installed)
      .map((a) => ({ id: a.id, renderer: a.renderIcon }));
    return (
      <SlotMachine
        size={slotMachineSize}
        luckyPatternId={app.id}
        patterns={slotMachinePatterns}
      />
    );
  };

  renderAppPreviewer = (hostInfo) => {
    const availableApp = this.availableApp(hostInfo);
    const cursorQuadrant = getQuadrantByStartEndPos(
      hostInfo.startPos,
      hostInfo.endPos
    );
    return (
      <AppPreviewer
        cursorQuadrant={cursorQuadrant}
        boxInfo={hostInfo}
        availableApp={availableApp}
      >
        {this.renderCursorTracker(
          this.renderSlotMachine(availableApp, hostInfo),
          hostInfo,
          cursorQuadrant
        )}
        {this.renderAvailableAppsLivableZoneEdge(hostInfo, cursorQuadrant)}
      </AppPreviewer>
    );
  };
}

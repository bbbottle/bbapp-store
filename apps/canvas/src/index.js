import React from "react";
import classnames from "classnames";
import { BoxCanvas } from "@bbbottle/box-canvas";
import { BoxIcon } from "@bbbottle/bbicons";
import { CanvasAppRenderer } from "./core";
import CLS from "./index.scss";

class CanvasPage extends React.PureComponent {
  constructor(props) {
    super(props);
    const { addSitePage } = props;
    this.canvasAppRenderer = new CanvasAppRenderer({
      addSitePage,
    });
  }

  componentDidMount() {
    console.log("mount", this.context);
  }

  render() {
    return (
      <div className={classnames(CLS.canvasPage)}>
        <BoxCanvas
          onPreviewStart={this.canvasAppRenderer.enterPreviewMode}
          onPreviewDone={this.canvasAppRenderer.exitPreviewMode}
          onBeforeAddBox={this.canvasAppRenderer.installApp}
          boxValidator={this.canvasAppRenderer.canRenderApp}
          staticBoxRenderer={this.canvasAppRenderer.renderApp}
          clearButtonRenderer={this.canvasAppRenderer.renderClearButton}
          previewBoxRenderer={this.canvasAppRenderer.renderAppPreviewer}
        />
      </div>
    );
  }
}

export default {
  title: '画布',
  icon: BoxIcon,
  component: CanvasPage,
}
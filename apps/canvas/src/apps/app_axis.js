import React from "react";
import PropTypes from "prop-types";

const COLOR = "#ccc";
const THICK = 1;

export class AppAxis extends React.PureComponent {
  static thick = THICK;
  static propTypes = {
    originCoordinate: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  };

  renderXAxis = () => {
    const [, y] = this.props.originCoordinate;
    const xStyle = {
      position: "absolute",
      width: "100%",
      height: THICK,
      background: COLOR,
      left: 0,
      top: y,
      zIndex: 0,
    };
    return <div style={xStyle} />;
  };

  renderYAxis = () => {
    const [x] = this.props.originCoordinate;
    const yStyle = {
      position: "absolute",
      width: THICK,
      height: "100%",
      background: COLOR,
      top: 0,
      zIndex: 0,
      left: x,
    };
    return <div style={yStyle} />;
  };

  render() {
    return (
      <>
        {this.renderXAxis()}
        {this.renderYAxis()}
      </>
    );
  }
}

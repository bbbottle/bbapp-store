import React from "react";
import PropTypes from "prop-types";

const getPositionedStyleByProps = (props) => {
  const {
    fixedPointCoordinate = [],
    quadrant = 3,
    width,
    height,
    offset = 0,
    originCalibrateValue = 0,
  } = props;

  const rightQuadSet = new Set([1, 4]);
  const topQuadSet = new Set([1, 2]);

  const [x0, y0] = fixedPointCoordinate;
  let [x, y] = fixedPointCoordinate;
  if (originCalibrateValue) {
    x = rightQuadSet.has(quadrant) ? x0 : x0 + originCalibrateValue;
    y = topQuadSet.has(quadrant) ? y0 + originCalibrateValue : y0;
  }

  const style = {
    width,
    height,
    position: "absolute",
  };

  if (quadrant === 1) {
    style.top = y - height - offset;
    style.left = x + offset;
    return style;
  }

  if (quadrant === 2) {
    style.left = x - width - offset;
    style.top = y - height - offset;
    return style;
  }

  if (quadrant === 3) {
    style.top = y + offset;
    style.left = x - width - offset;
    return style;
  }

  if (quadrant === 4) {
    style.left = x + offset;
    style.top = y + offset;
    return style;
  }
};

export const AbsolutePositionedBox = (props) => {
  const { style = {}, ...rest } = props;

  const positionedStyle = getPositionedStyleByProps(props);
  return (
    <div {...rest} style={Object.assign({}, style, positionedStyle)}>
      {props.children}
    </div>
  );
};

AbsolutePositionedBox.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.shape({}),
  fixedPointCoordinate: PropTypes.arrayOf(PropTypes.number.isRequired),
  originCalibrateValue: PropTypes.number,
  quadrant: PropTypes.oneOf([1, 2, 3, 4]),
  size: PropTypes.number,
  offset: PropTypes.number,
};

AbsolutePositionedBox.defaultProps = {
  height: 24,
  width: 24,
  style: {},
  fixedPointCoordinate: [0, 0],
  originCalibrateValue: 0,
  offset: 0,
};

import React from "react";
import PropTypes from "prop-types";
import Style from "./index.scss";

export const SlotMachine = (props) => {
  const { patterns, luckyPatternId, size } = props;

  const sizeStyle = { width: size, height: size };
  const luckPatternIndex = patterns.findIndex((p) => p.id === luckyPatternId);
  const transformStyle = {
    transform: `translateY(${luckPatternIndex * size * -1}px)`,
  };
  return (
    <div style={sizeStyle} className={Style.slotMachine}>
      <div style={transformStyle} className={Style.pattersWrapper}>
        {patterns.map((p) => {
          return (
            <div key={p.id} style={sizeStyle} className={Style.pattern}>
              {p.renderer()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

SlotMachine.propTypes = {
  size: PropTypes.number.isRequired,
  patterns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      renderer: PropTypes.func.isRequired,
    })
  ),
  luckyPatternId: PropTypes.string.isRequired,
};

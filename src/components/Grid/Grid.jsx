import PropTypes from "prop-types";
import React from "react";

function Grid(props) {
  const { col, mdCol, smCol, gap, children, className } = props;
  const style = {
    gap: gap ? `${gap}px` : "0px",
  };

  const colCls = col ? `grid-col-${col}` : "";
  const mdColCls = mdCol ? `grid-col-${mdCol}` : "";
  const smColCls = smCol ? `grid-col-${smCol}` : "";

  return (
    <div
      className={`grid ${colCls} ${mdColCls} ${smColCls} ${
        className ? className : ""
      }`}
      style={style}
    >
      {children}
    </div>
  );
}

Grid.propTypes = {
  col: PropTypes.number.isRequired,
  mdCol: PropTypes.number,
  smCol: PropTypes.number,
  gap: PropTypes.number,
};

export default Grid;

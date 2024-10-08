import React from "react";

const Point = ({ number, x, y, onClick, color }) => {
  return (
    <div
      className="point"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        cursor: "pointer",
        backgroundColor: color || "#fff",
      }}
      onClick={onClick}
    >
      {number}
    </div>
  );
};

export default Point;

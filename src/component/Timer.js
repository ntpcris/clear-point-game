import React from "react";

const Timer = ({ time }) => {
  return (
    <div>
      <label>Time: </label>
      <span>{time}s</span>
    </div>
  );
};

export default Timer;

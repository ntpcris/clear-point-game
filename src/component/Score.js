import React from "react";

const Score = ({ points, setPoints }) => {
  return (
    <div className="input-section">
      <label>Points: </label>
      <input
        type="number"
        value={points}
        onChange={(e) => setPoints(Number(e.target.value))}
      />
    </div>
  );
};

export default Score;

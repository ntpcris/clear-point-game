import React, { useState } from "react";
import Timer from "./Timer";
import Score from "./Score";
import Point from "./Point";

const Game = () => {
  const [points, setPoints] = useState("");
  const [time, setTime] = useState(0);
  const [pointNumbers, setPointNumbers] = useState([]);
  const [intervalId, setIntervalId] = useState(null);
  const [nextPoint, setNextPoint] = useState(1);
  const [message, setMessage] = useState("LET'S PLAY");
  const [gameOver, setGameOver] = useState(false);
  const [isFirstPlay, setIsFirstPlay] = useState(true);
  const [messageColor, setMessageColor] = useState("#000");

  const generateRandomPoints = (points) => {
    const pointsArray = [];
    for (let i = points; i >= 1; i--) {
      const x = Math.random() * 90;
      const y = Math.random() * 90;
      pointsArray.push({ number: i, x, y, color: "#fff" });
    }

    setPointNumbers(pointsArray);
    console.log(pointsArray);
  };

  const handleRestart = () => {
    if (points > 0) {
      if (intervalId) {
        clearInterval(intervalId);
      }

      setTime(0);
      setNextPoint(1);
      setGameOver(false);
      setMessage("LET'S PLAY");
      setMessageColor("#000");
      generateRandomPoints(points);
      startTimer();

      if (isFirstPlay) {
        setIsFirstPlay(false);
      }
    }
  };

  const startTimer = () => {
    const start = Date.now();
    const id = setInterval(() => {
      setTime(((Date.now() - start) / 1000).toFixed(2));
    }, 100);

    setIntervalId(id);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const handlePointClick = (number) => {
    if (gameOver) return;

    if (number === nextPoint) {
      setPointNumbers((prev) =>
        prev.map((point) =>
          point.number === number ? { ...point, color: "#28a745" } : point
        )
      );

      if (number === points) {
        setMessage("ALL CLEARED");
        setMessageColor("#28a745");
        stopTimer();
      } else {
        setNextPoint(nextPoint + 1);
        setTimeout(() => {
          setPointNumbers((prev) =>
            prev.filter((point) => point.number !== number)
          );
        }, 300);
      }
    } else {
      setPointNumbers((prev) =>
        prev.map((point) =>
          point.number === number ? { ...point, color: "#dc3545" } : point
        )
      );
      setMessage("GAME OVER");
      setMessageColor("#dc3545");
      setGameOver(true);
      stopTimer();
    }
  };

  // useEffect(() => {
  //   if (points > 0) {
  //     generateRandomPoints(points);
  //     startTimer();
  //   }
  // }, [points]);

  return (
    <div className="game">
      <h1 style={{ color: messageColor }}>{message}</h1>
      <div className="control">
        <Score points={points} setPoints={setPoints} />
        <Timer time={time} />
        <button onClick={handleRestart}>
          {isFirstPlay ? "Play" : "Restart"}
        </button>
      </div>
      <div className="game-board">
        {pointNumbers.map((point) => (
          <Point
            key={point.number}
            number={point.number}
            x={point.x}
            y={point.y}
            color={point.color}
            onClick={() => handlePointClick(point.number)}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;

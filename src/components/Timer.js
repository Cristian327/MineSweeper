import React, { useState, useEffect } from "react";

let timeIntervalId;
export default function Timer({ gameOver, sendTime }) {
  let [timer, setTime] = useState(0);
  let [sTime, setSTime] = useState(0);

  useEffect(() => {
    if (timer > 0 && gameOver) {
      setSTime(timer);
      setTime(0);
    }
  }, [gameOver, timer]);

  useEffect(() => {
    const incrementTime = () => {
      let newTime = timer + 1;
      setTime(newTime);
    };
    timeIntervalId = setTimeout(() => {
      incrementTime();
    }, 1000);
    if (gameOver) {
      //   let updatedTime = JSON.parse(JSON.stringify(timer));

      clearInterval(timeIntervalId);
    }
  }, [timer, setTime, gameOver, sendTime]);

  return (
    <div style={{ color: "white", fontSize: 20, background: "green" }}>
      <span role="img" aria-label="clock" style={{ paddingRight: 10 }}>
        ⏰
      </span>
      {gameOver ? sTime : timer}
    </div>
  );
}

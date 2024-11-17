import React, { useState, useEffect } from "react";
import "./style.css";

function Counter() {
  const [count, setCount] = useState(0);  // State to keep track of counter value
  const [isRunning, setIsRunning] = useState(false);  // State to track if the counter is running
  const [intervalId, setIntervalId] = useState(null);  // State to store the interval ID for clearing

  // Start the counter
  const startCounter = () => {
    if (!isRunning) {
      const id = setInterval(() => {
        setCount((prevCount) => prevCount + 1); // Increment counter every second
      }, 1000);
      setIntervalId(id);  // Store interval ID to stop the counter later
           setIsRunning(true);  // Mark counter as running
    }
  };

  // Stop the counter
  const stopCounter = () => {
    clearInterval(intervalId); // Clear the interval
    setIsRunning(false);  // Mark counter as stopped
  };

  // Cleanup the interval when the component unmounts or counter is stopped
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);  // Clear interval if the component unmounts
      }
    };
  }, [intervalId]);

  return (
    <div className="container">
      <h1>Counter</h1>
      <div className="number">{count}</div>
      <div className="btns-container">
        <button className="increment" onClick={startCounter} disabled={isRunning}>
          Start
        </button>
        <button className="increment" onClick={stopCounter} disabled={!isRunning}>
          Stop
        </button>
      </div>
    </div>
  );
}

export default Counter;

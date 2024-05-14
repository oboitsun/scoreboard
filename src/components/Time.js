import React, { useEffect, useRef, useState } from "react";

function TimeWatch({ timer_status }) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (timer_status === "started" && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (timer_status === "paused") {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else if (timer_status === "reset") {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setElapsedTime(0);
    }
    console.log("STaTUS CHANGED:", timer_status);
    return () => clearInterval(intervalRef.current);
  }, [timer_status]);

  const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return { hours, minutes, seconds };
  };

  const currentTime = formatTime(elapsedTime);

  return (
    <div>
      <p className="font-black">
        {currentTime.hours}
        <span className="font-sans relative bottom-0 -translate-y-[12%] leading-none">:</span>
        {currentTime.minutes}
        <span className="font-sans relative bottom-0 -translate-y-[12%] leading-none">:</span>
        {currentTime.seconds}
      </p>
    </div>
  );
}

export default TimeWatch;

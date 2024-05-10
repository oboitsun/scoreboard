import React, { useEffect, useState } from "react";

function TimeWatch() {
  const [currentTime, setCurrentTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p className="font-black">
        {currentTime.hours}
        <span className="font-sans relative -top-2">:</span>
        {currentTime.minutes}
        <span className="font-sans relative -top-2">:</span>
        {currentTime.seconds}
      </p>
    </div>
  );
}

export default TimeWatch;

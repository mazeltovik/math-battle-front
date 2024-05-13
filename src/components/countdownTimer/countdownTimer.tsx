//Styles
import './countdownTimer.scss';

//Types
import { countdownTimerTypes } from './countdownTimerTypes';

//Images

//MUI

//Components

//React
import { useState, useEffect } from 'react';
//Hooks

//Helpers

//Handlers

export default function CountdownTimer({
  seconds,
  size,
  strokeBgColor,
  strokeColor,
  strokeWidth,
}: countdownTimerTypes) {
  const milliseconds = seconds * 1000;
  const radius = size / 2;
  const circumference = size * Math.PI;
  const [countdown, setCountdown] = useState(milliseconds);
  const strokeDashoffset = () =>
    circumference - (countdown / milliseconds) * circumference;
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(countdown - 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);
  return (
    <div className="countdown-container">
      <p>{countdown / 1000}</p>
      <svg>
        <circle
          cx={radius}
          cy={radius}
          r={radius}
          fill="#ab7a5f"
          strokeWidth="3"
          stroke={strokeBgColor}
          strokeWidth={strokeWidth}
        ></circle>
      </svg>
      <svg>
        <circle
          cx={radius}
          cy={radius}
          r={radius}
          fill="none"
          strokeLinecap="round"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset()}
        ></circle>
      </svg>
    </div>
  );
}

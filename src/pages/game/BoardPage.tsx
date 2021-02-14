import React, { useEffect, useState } from 'react';

import logo from './logo.svg';
import socketIOClient from "socket.io-client";
import './BoardPage.css';

function BoardPage() {

  useEffect(() => {

  }, [])

  const [progress, useProgress] = useState(0);

  const size = 300;
  const strokeWidth = 10;
  const circleOneStroke = 10;
  const circleTwoStroke = 10;

  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;


  return (
    <>
      <svg className="svg" width={size} height={size}>
        <circle
          className="svg-circle-bg"
          stroke={'#7ea9e1'}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="svg-circle"
          stroke={'#7ea9e1'}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <text className="svg-circle-text" x={center} y={center}>
          {progress}%
    </text>
      </svg>

    </>

  );
}

export default BoardPage;
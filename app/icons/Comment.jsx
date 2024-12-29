import React from "react";
import Svg, { Path } from "react-native-svg";

const Comment = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-20 -20 550 550"
      width={props.width || 800}
      height={props.height || 800}
      fill="none" // No fill, so it's an outline
      stroke={props.color || "#000000"} // Default stroke color to black
      strokeWidth={props.strokeWidth || 30} // Adjust stroke width as needed
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c0 0 0 0 0 0s0 0 0 0s0 0 0 0c0 0 0 0 0 0l.3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" />
    </Svg>
  );
};

export default Comment;

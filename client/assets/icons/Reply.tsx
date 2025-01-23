import React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgIcon } from "@/types";

interface ReplyProps {
  width: number;
  height: number;
  color: string;
}

const Reply = (props: ReplyProps) => {
  return (
    <Svg
      viewBox="-20 -20 550 550"
      width={props.width || 800}
      height={props.height || 800}
      fill="none"
      stroke={props.color || "#000000"} // Default stroke color
      strokeWidth={30} // Adjust as desired
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M307 34.8c-11.5 5.1-19 16.6-19 29.2l0 64-112 0C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96l96 0 0 64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z" />
    </Svg>
  );
};

export default Reply;

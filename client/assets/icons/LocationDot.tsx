import React from "react";
import { Svg, Path } from "react-native-svg";
import { SvgIcon } from "@/types";

const LocationDot = (props: SvgIcon) => {
  return (
    <Svg viewBox="0 0 384 512" width={props.width} height={props.height}>
      <Path
        d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
        fill={props.color}
      />
    </Svg>
  );
};

export default LocationDot;

import React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgIcon } from "@/types";

const BackButton = (props: SvgIcon) => {
  return (
    <Svg viewBox="0 0 320 512" width={props.width} height={props.height}>
      <Path
        d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
        fill={props.color}
      />
    </Svg>
  );
};

export default BackButton;

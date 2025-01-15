import { View, Text } from "react-native";
import { Svg, Path } from "react-native-svg";
import React from "react";

const LocationArrow = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      width={props.width}
      height={props.height}
    >
      <Path
        d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8l176 0 0 176c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z"
        fill={props.color}
      />
    </Svg>
  );
};

export default LocationArrow;

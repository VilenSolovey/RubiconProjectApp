// SvgFiles/DropShape.js
import React from 'react';
import { Svg, Path } from 'react-native-svg';

const DropShape = ({ width, height, fill }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 0C9.8 0 7.8 1.1 6.4 2.9L12 15.6L17.6 2.9C16.2 1.1 14.2 0 12 0ZM12 17.6C10.7 17.6 9.6 16.5 9.6 15.2H14.4C14.4 16.5 13.3 17.6 12 17.6ZM5.2 22C4.1 22 3.2 21.1 3.2 20H20.8C20.8 21.1 19.9 22 18.8 22H5.2Z"
      fill={fill}
    />
  </Svg>
);

export default DropShape;

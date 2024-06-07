import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const SvgComponent = (props: React.ComponentProps<typeof Svg>) => (
  <Svg
    height="512"  // Set the height if needed
    width="512"   // Set the width if needed
    viewBox="0 0 512 512"
    {...props}
  >
    <Circle
      cx={256}
      cy={256}
      r={208}
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth={32}
    />
    <Path d="M256 464c-114.88 0-208-93.12-208-208S141.12 48 256 48z" />
  </Svg>
);

export default SvgComponent;

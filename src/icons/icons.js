import React from "react";
import { Svg, Path } from "react-native-svg";

export const SvgPlus = props => (
  <Svg
    width={24}
    height={24}
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="plusIconTitle"
    stroke="#000"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{...props.style}}
    fill="none"
    color="#000"
    {...props}
  >
    <Path d="M20 12H4m8-8v16" />
  </Svg>
)

export const SvgDanger = props => (
  <Svg
    width={50}
    height={50}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M48.618 8.12 31.738 25l16.88 16.88a4.715 4.715 0 0 1 0 6.67l-.068.068a4.716 4.716 0 0 1-6.67 0L25 31.738 8.12 48.618a4.715 4.715 0 0 1-6.67 0l-.068-.068a4.716 4.716 0 0 1 0-6.67L18.262 25 1.382 8.12a4.715 4.715 0 0 1 0-6.67l.068-.068a4.715 4.715 0 0 1 6.67 0L25 18.262l16.88-16.88a4.715 4.715 0 0 1 6.67 0l.068.068a4.715 4.715 0 0 1 0 6.67Z"
      fill="#EB445A"
    />
  </Svg>
)

export const SvgSuccess = props => (
  <Svg
    width={50}
    height={40}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M41.465 1.464 15 27.93l-6.464-6.464a5 5 0 1 0-7.072 7.07l10 10a5 5 0 0 0 7.071 0l30-30a5 5 0 1 0-7.07-7.07Z"
      fill="#2DD36F"
    />
  </Svg>
)
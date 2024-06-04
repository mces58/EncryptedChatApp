import React, { FC } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Colors } from 'src/constants/color/colors';
import { useTheme } from 'src/context/ThemeContext';

interface CameraIconProps {
  width: number;
  height: number;
  customColor?: string;
  strokeWidth?: number;
  opacity?: number;
}

const CameraIcon: FC<CameraIconProps> = (props) => {
  const { width, height, customColor, strokeWidth = 2, opacity = 1 } = props;
  const { theme } = useTheme();

  const color =
    theme.backgroundColor === Colors.primaryColors.light
      ? Colors.primaryColors.dark
      : Colors.primaryColors.light;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" opacity={opacity}>
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M61.71428571428571 22.857142857142854c0 -1.2124342857142858 -0.4818285714285714 -2.3751771428571424 -1.3389714285714285 -3.232502857142857C59.51817142857143 18.76736 58.355199999999996 18.285714285714285 57.14285714285714 18.285714285714285h-9.142857142857142L41.14285714285714 9.142857142857142H22.857142857142854L16 18.285714285714285h-9.142857142857142c-1.2124342857142858 0 -2.3751771428571424 0.48164571428571423 -3.2324891428571427 1.338925714285714C2.767346285714286 20.481965714285714 2.2857142857142856 21.64470857142857 2.2857142857142856 22.857142857142854v27.428571428571427c0 1.212342857142857 0.481632 2.3753142857142855 1.3389394285714287 3.2324571428571423C4.481965714285714 54.37531428571428 5.644708571428571 54.857142857142854 6.857142857142857 54.857142857142854h50.285714285714285c1.212342857142857 0 2.3753142857142855 -0.4818285714285714 3.2324571428571423 -1.3389714285714285S61.71428571428571 51.49805714285714 61.71428571428571 50.285714285714285V22.857142857142854Z"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M32 44.57142857142857c5.6806399999999995 0 10.285714285714285 -4.605074285714285 10.285714285714285 -10.285714285714285S37.68064 24 32 24 21.71428571428571 28.605074285714284 21.71428571428571 34.285714285714285 26.31936 44.57142857142857 32 44.57142857142857Z"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

export default CameraIcon;

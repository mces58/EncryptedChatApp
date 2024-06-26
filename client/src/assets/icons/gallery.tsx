import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Colors } from 'src/constants/color/colors';
import { useTheme } from 'src/context/ThemeContext';

import { IconProps } from './icon-props';

const GalleryIcon: React.FC<IconProps> = (props) => {
  const { width, height, customColor, strokeWidth = 2, opacity = 1 } = props;
  const { theme } = useTheme();

  const color =
    theme.backgroundColor === Colors.primaryColors.light
      ? Colors.primaryColors.dark
      : Colors.primaryColors.light;

  return (
    <View style={[{ width, height }]}>
      <Svg
        width="100%"
        height="100%"
        viewBox="-0.5 -0.5 64 64"
        fill="none"
        opacity={opacity}
      >
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M46.559625 9.1875c-0.7245 -2.6565 -3.005625 -4.575375 -5.8708124999999995 -4.7814375C37.3340625 4.1645625 32.3728125 3.9375 25.59375 3.9375c-6.7383750000000004 0 -11.678625 0.2244375 -15.032062499999999 0.46462499999999995 -3.3560624999999997 0.238875 -5.922 2.8035 -6.160875 6.160875C4.160625 13.916437499999999 3.9375 18.858 3.9375 25.59375c0 6.7790625 0.228375 11.739 0.4685625 15.09375 0.2060625 2.8651874999999998 2.12625 5.147625000000001 4.7814375 5.8708124999999995"
          strokeWidth={strokeWidth}
        />

        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.214624999999998 22.3741875c0.238875 -3.3560624999999997 2.8035 -5.919375 6.160875 -6.1595625C25.727625 15.973125 30.6691875 15.75 37.40625 15.75s11.677312500000001 0.2244375 15.03075 0.46462499999999995c3.3573749999999998 0.238875 5.922 2.8035 6.160875 6.160875 0.2401875 3.3534375 0.46462499999999995 8.295 0.46462499999999995 15.03075 0 6.7370625 -0.2244375 11.677312500000001 -0.46462499999999995 15.032062499999999 -0.238875 3.3560624999999997 -2.8035 5.919375 -6.160875 6.1595625 -3.3534375 0.2401875 -8.295 0.46462499999999995 -15.03075 0.46462499999999995 -6.7370625 0 -11.677312500000001 -0.2244375 -15.032062499999999 -0.46462499999999995 -3.3560624999999997 -0.238875 -5.919375 -2.8035 -6.1595625 -6.160875C15.973125 49.084875000000004 15.75 44.1433125 15.75 37.40625s0.2244375 -11.677312500000001 0.46462499999999995 -15.032062499999999Z"
          strokeWidth={strokeWidth}
        />

        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M58.860375 47.760562500000006c-2.9596875 -2.774625 -5.0925 -4.622624999999999 -6.573 -5.83275 -1.7561250000000002 -1.4371875 -4.071375 -1.645875 -5.9626875 -0.3845625 -1.4568750000000001 0.97125 -3.457125 2.454375 -6.0703125 4.6974375 -3.885 -3.7156875 -6.5625 -6.050625 -8.318625 -7.4878125 -1.7561250000000002 -1.4371875 -4.071375 -1.6445625 -5.9626875 -0.3845625 -2.12625 1.4175 -5.4114375 3.927 -10.06425 8.292375"
          strokeWidth={strokeWidth}
        />

        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M42 28.875a3.9375 3.9375 0 1 0 7.875 0 3.9375 3.9375 0 1 0 -7.875 0"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

export default GalleryIcon;

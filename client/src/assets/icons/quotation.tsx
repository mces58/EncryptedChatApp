import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Colors } from 'src/constants/color/colors';
import { useTheme } from 'src/context/ThemeContext';

import { IconProps } from './icon-props';

const QuotationIcon: React.FC<IconProps> = (props) => {
  const { width, height, customColor, strokeWidth = 2, opacity = 1 } = props;
  const { theme } = useTheme();

  const color =
    theme.backgroundColor === Colors.primaryColors.light
      ? Colors.primaryColors.dark
      : Colors.primaryColors.light;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" opacity={opacity}>
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M3.4472914285714285 24.254125714285713S4.196091428571428 25.71428571428571 5.142857142857142 25.71428571428571c0.9467657142857142 0 1.7142857142857142 -0.76752 1.7142857142857142 -1.7142857142857142s-0.76752 -1.7142857142857142 -1.7142857142857142 -1.7142857142857142c-1.0343657142857143 0 -1.8464674285714282 0.9530399999999999 -1.6955657142857141 1.9684114285714283Zm0 0S1.7142857142857142 20.57142857142857 1.7142857142857142 17.142857142857142c0 -2.550205714285714 0.6187371428571428 -4.955931428571429 1.7142857142857142 -7.0752"
          strokeWidth={strokeWidth}
        />

        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M13.733005714285714 24.254125714285713S14.481805714285715 25.71428571428571 15.428571428571427 25.71428571428571c0.9467657142857142 0 1.7142857142857142 -0.76752 1.7142857142857142 -1.7142857142857142s-0.76752 -1.7142857142857142 -1.7142857142857142 -1.7142857142857142c-1.0343657142857143 0 -1.8464571428571426 0.9530399999999999 -1.6955657142857141 1.9684114285714283Zm0 0S12 20.57142857142857 12 17.142857142857142c0 -2.550205714285714 0.6187542857142857 -4.955931428571429 1.7142857142857142 -7.0752"
          strokeWidth={strokeWidth}
        />

        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M44.552571428571426 23.527817142857142s-0.7488 -1.46016 -1.6954285714285713 -1.46016 -1.7142857142857142 0.76752 -1.7142857142857142 1.7142857142857142 0.7676571428571428 1.7142857142857142 1.7142857142857142 1.7142857142857142c1.0344 0 1.8466285714285713 -0.9530399999999999 1.6954285714285713 -1.9684114285714283Zm0 0S46.285714285714285 27.210514285714282 46.285714285714285 30.639085714285716c0 2.55024 -0.6188571428571428 4.9559999999999995 -1.7142857142857142 7.0752"
          strokeWidth={strokeWidth}
        />

        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M34.26699428571428 23.527817142857142S33.51819428571428 22.06765714285714 32.57142857142857 22.06765714285714c-0.9467657142857142 0 -1.7142857142857142 0.76752 -1.7142857142857142 1.7142857142857142s0.76752 1.7142857142857142 1.7142857142857142 1.7142857142857142c1.0343657142857143 0 1.8466285714285713 -0.9530399999999999 1.6955657142857141 -1.9684114285714283Zm0 0S36 27.210514285714282 36 30.639085714285716c0 2.55024 -0.6188571428571428 4.9559999999999995 -1.7142857142857142 7.0752"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

export default QuotationIcon;

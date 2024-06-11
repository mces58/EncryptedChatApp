import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from './icon-props';

const DotIcon: React.FC<IconProps> = (props) => {
  const { width, height, strokeWidth = 1.5, opacity = 1 } = props;

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
          d="M60.06168 37.65006c-2.08908 11.978819999999999 -12.835619999999999 22.150799999999997 -28.67004 22.150799999999997s-27.131580000000003 -10.0548 -28.66878 -22.150799999999997C-0.42210000000000003 12.9024 14.40558 3.1991400000000003 30.240000000000002 3.1991400000000003s34.13592 9.70326 29.82168 34.450919999999996z"
          fill="#6dd627"
          strokeWidth={strokeWidth}
        />
        <Path
          d="M60.06168 37.65006c-2.08908 11.978819999999999 -12.835619999999999 22.150799999999997 -28.67004 22.150799999999997s-27.131580000000003 -10.0548 -28.66878 -22.150799999999997C-0.42210000000000003 12.9024 14.40558 3.1991400000000003 30.240000000000002 3.1991400000000003s34.13592 9.70326 29.82168 34.450919999999996z"
          fill="#6dd627"
          strokeWidth={strokeWidth}
        />
        <Path
          d="M60.06168 29.988c-2.08908 11.981340000000001 -12.835619999999999 22.15206 -28.67004 22.15206S4.26006 42.083999999999996 2.7228600000000003 29.988a54.936 54.936 0 0 1 -0.25956 -2.4784200000000003 46.65654000000001 46.65654000000001 0 0 0 0.25956 10.13796c1.5372 12.096 12.835619999999999 22.150799999999997 28.66878 22.150799999999997s26.586000000000002 -10.171980000000001 28.67004 -22.150799999999997a37.70298 37.70298 0 0 0 0.43218000000000006 -10.773000000000001q-0.15498 1.5183000000000002 -0.43218000000000006 3.1134600000000003z"
          fill="#46b000"
          strokeWidth={strokeWidth}
        />
        <Path
          d="M49.57218 18.95418a6.96654 6.96654 0 0 1 -7.2034199999999995 5.56668c-3.9790799999999997 0 -6.81786 -2.52 -7.20468 -5.56668 -0.7900200000000001 -6.2181 2.9358 -8.6562 6.914880000000001 -8.6562s8.57304 2.4381 7.49322 8.6562z"
          fill="#9ceb60"
          strokeWidth={strokeWidth}
        />
        <Path
          d="M60.06168 37.65006c-2.08908 11.978819999999999 -12.835619999999999 22.150799999999997 -28.67004 22.150799999999997s-27.131580000000003 -10.0548 -28.66878 -22.150799999999997C-0.42210000000000003 12.9024 14.40558 3.1991400000000003 30.240000000000002 3.1991400000000003s34.13592 9.70326 29.82168 34.450919999999996z"
          fill="none"
          stroke="#45413c"
          strokeMiterlimit="10"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

export default DotIcon;

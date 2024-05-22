import React, { FC } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface ThemeIconProps {
  width: number;
  height: number;
  opacity?: number;
}

const SunThemeIcon: FC<ThemeIconProps> = (props) => {
  const { width, height, opacity = 1 } = props;

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
          d="m60.606 33.82974 -3.465 2.69766a2.9547000000000003 2.9547000000000003 0 0 0 -0.92106 3.4423200000000005l1.6506 4.0635a2.95218 2.95218 0 0 1 -2.3322599999999998 4.032l-4.3432200000000005 0.59724a2.95218 2.95218 0 0 0 -2.52 2.52l-0.5984999999999999 4.3432200000000005a2.95218 2.95218 0 0 1 -4.032 2.33352l-4.06224 -1.6518599999999999A2.95344 2.95344 0 0 0 36.54 57.128400000000006l-2.71026 3.4776a2.95218 2.95218 0 0 1 -4.662 0l-2.69766 -3.465a2.9547000000000003 2.9547000000000003 0 0 0 -3.4423200000000005 -0.92106l-4.0635 1.6506a2.95218 2.95218 0 0 1 -4.032 -2.3322599999999998l-0.59724 -4.3432200000000005a2.95218 2.95218 0 0 0 -2.52 -2.52l-4.34826 -0.6060599999999999a2.95218 2.95218 0 0 1 -2.33352 -4.032l1.6518599999999999 -4.06224a2.95344 2.95344 0 0 0 -0.92106 -3.4423200000000005L2.3939999999999997 33.82974a2.95218 2.95218 0 0 1 0 -4.662l3.465 -2.69766a2.9547000000000003 2.9547000000000003 0 0 0 0.92106 -3.4423200000000005l-1.6506 -4.0635a2.95218 2.95218 0 0 1 2.3322599999999998 -4.032l4.3432200000000005 -0.59724a2.95218 2.95218 0 0 0 2.52 -2.52l0.5984999999999999 -4.3432200000000005a2.95218 2.95218 0 0 1 4.032 -2.33352l4.06224 1.6518599999999999A2.95344 2.95344 0 0 0 26.46 5.86908L29.17026 2.3939999999999997a2.95218 2.95218 0 0 1 4.662 0l2.69766 3.465a2.9547000000000003 2.9547000000000003 0 0 0 3.4423200000000005 0.92106l4.0635 -1.6506a2.95218 2.95218 0 0 1 4.032 2.3322599999999998l0.59724 4.3432200000000005a2.95218 2.95218 0 0 0 2.52 2.52l4.3432200000000005 0.5984999999999999a2.95218 2.95218 0 0 1 2.33352 4.032l-1.6518599999999999 4.06224A2.95344 2.95344 0 0 0 57.130919999999996 26.46l3.465 2.69766a2.95218 2.95218 0 0 1 0.01008 4.67208z"
          fill="#ff8a14"
          stroke="#45413c"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <Path
          d="M9.513 31.5a21.987 21.987 0 1 0 43.974 0 21.987 21.987 0 1 0 -43.974 0"
          fill="#eb6d00"
          strokeWidth="1"
        />
        <Path
          d="M11.24298 31.5a20.25702 20.25702 0 1 0 40.51404 0 20.25702 20.25702 0 1 0 -40.51404 0"
          fill="#ffe500"
          strokeWidth="1"
        />
        <Path
          d="M31.5 16.128a20.249460000000003 20.249460000000003 0 0 1 20.09574 17.8164 20.25702 20.25702 0 1 0 -40.193999999999996 0A20.249460000000003 20.249460000000003 0 0 1 31.5 16.128z"
          fill="#fff48c"
          strokeWidth="1"
        />
      </Svg>
    </View>
  );
};

const MoonThemeIcon: FC<ThemeIconProps> = (props) => {
  const { width, height, opacity = 1 } = props;

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
          d="m54.23418 12.08718 -0.18017999999999998 5.5099800000000005a0.77238 0.77238 0 0 0 0.31374 0.6489l4.4352 3.2760000000000002a0.7749 0.7749 0 0 1 -0.252 1.36836l-5.292000000000001 1.52712a0.77994 0.77994 0 0 0 -0.52038 0.504l-1.7438399999999998 5.229a0.7749 0.7749 0 0 1 -1.37718 0.189l-3.08952 -4.56498a0.77742 0.77742 0 0 0 -0.6363 -0.3402l-5.51124 -0.04284a0.7749 0.7749 0 0 1 -0.6060599999999999 -1.25118l3.38562 -4.35834a0.7749 0.7749 0 0 0 0.126 -0.7093799999999999l-1.6632 -5.25546a0.7749 0.7749 0 0 1 1.008 -0.96264l5.18238 1.8774a0.78372 0.78372 0 0 0 0.71568 -0.09828l4.48434 -3.2067a0.7749 0.7749 0 0 1 1.22094 0.66024z"
          fill="#656769"
          strokeWidth="1"
        />
        <Path
          d="M42.40026 16.274160000000002a0.77616 0.77616 0 0 1 1.01556 -0.53676l5.18364 1.8774a0.77364 0.77364 0 0 0 0.7144199999999999 -0.09828l4.488119999999999 -3.2054400000000003a0.77238 0.77238 0 0 1 0.36666 -0.14238l0.0693 -2.08152a0.7749 0.7749 0 0 0 -1.22472 -0.65646l-4.48434 3.2067a0.77364 0.77364 0 0 1 -0.7144199999999999 0.09702l-5.18364 -1.8761400000000001a0.7749 0.7749 0 0 0 -1.008 0.96264z"
          fill="#87898c"
          strokeWidth="1"
        />
        <Path
          d="m54.23418 12.08718 -0.18017999999999998 5.5099800000000005a0.77238 0.77238 0 0 0 0.31374 0.6489l4.4352 3.2760000000000002a0.7749 0.7749 0 0 1 -0.252 1.36836l-5.292000000000001 1.52712a0.77994 0.77994 0 0 0 -0.52038 0.504l-1.7438399999999998 5.229a0.7749 0.7749 0 0 1 -1.37718 0.189l-3.08952 -4.56498a0.77742 0.77742 0 0 0 -0.6363 -0.3402l-5.51124 -0.04284a0.7749 0.7749 0 0 1 -0.6060599999999999 -1.25118l3.38562 -4.35834a0.7749 0.7749 0 0 0 0.126 -0.7093799999999999l-1.6632 -5.25546a0.7749 0.7749 0 0 1 1.008 -0.96264l5.18238 1.8774a0.78372 0.78372 0 0 0 0.71568 -0.09828l4.48434 -3.2067a0.7749 0.7749 0 0 1 1.22094 0.66024z"
          fill="none"
          stroke="#45413c"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <Path
          d="M53.502120000000005 36.98226A19.440540000000002 19.440540000000002 0 0 1 24.192 11.591999999999999a19.7883 19.7883 0 0 1 4.93416 -4.6242 1.87488 1.87488 0 0 0 -1.28268 -3.402 28.076580000000003 28.076580000000003 0 1 0 31.5819 31.66506 1.88118 1.88118 0 0 0 -3.402 -1.34694 19.53 19.53 0 0 1 -2.52126 3.0983400000000003z"
          fill="#656769"
          strokeWidth="1"
        />
        <Path
          d="M19.20366 9.072000000000001a24.55488 24.55488 0 1 0 39.70512 28.8981q0.3276 -1.35954 0.5166 -2.73924a1.88118 1.88118 0 0 0 -3.402 -1.34694A19.4418 19.4418 0 1 1 24.192 11.591999999999999a19.76688 19.76688 0 0 1 4.93416 -4.6242 1.87488 1.87488 0 0 0 -1.28268 -3.402 28.09044 28.09044 0 0 0 -4.05468 0.8442000000000001 25.22268 25.22268 0 0 0 -4.58514 4.662z"
          fill="#87898c"
          strokeWidth="1"
        />
        <Path
          d="M53.502120000000005 36.98226A19.440540000000002 19.440540000000002 0 0 1 24.192 11.591999999999999a19.7883 19.7883 0 0 1 4.93416 -4.6242 1.87488 1.87488 0 0 0 -1.28268 -3.402 28.076580000000003 28.076580000000003 0 1 0 31.5819 31.66506 1.88118 1.88118 0 0 0 -3.402 -1.34694 19.53 19.53 0 0 1 -2.52126 3.0983400000000003z"
          fill="none"
          stroke="#45413c"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
      </Svg>
    </View>
  );
};

export { SunThemeIcon, MoonThemeIcon };
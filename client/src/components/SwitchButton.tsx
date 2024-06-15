import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { Colors } from 'src/constants/color/colors';

interface SwitchButtonProps {
  activeColor: string;
  inActiveColor: string;
  active: boolean;
  setActive: (active: boolean) => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  activeColor,
  inActiveColor,
  active,
  setActive,
}) => {
  const switchTranslate = useSharedValue(0);
  const progress = useDerivedValue(() => {
    return withTiming(active ? 22 : 0);
  });

  useEffect(() => {
    if (active) {
      switchTranslate.value = 22;
    } else {
      switchTranslate.value = 4;
    }
  }, [active, switchTranslate]);

  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(switchTranslate.value, {
            mass: 1,
            damping: 15,
            stiffness: 120,
            overshootClamping: false,
            restSpeedThreshold: 0.001,
            restDisplacementThreshold: 0.001,
          }),
        },
      ],
    };
  });

  const backgroundColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 22],
      [inActiveColor, activeColor]
    );
    return {
      backgroundColor,
    };
  });

  return (
    <TouchableOpacity
      onPress={() => {
        setActive(!active);
      }}
      style={styles.main}
    >
      <Animated.View style={[styles.container, backgroundColorStyle]}>
        <Animated.View style={[styles.circle, customSpringStyles]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default SwitchButton;

const styles = StyleSheet.create({
  main: {
    width: 60,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: 50,
    height: 28,
    borderRadius: 30,
    justifyContent: 'center',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 30,
    backgroundColor: Colors.primaryColors.beige,
    shadowColor: Colors.primaryColors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 4,
  },
});

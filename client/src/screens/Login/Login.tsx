import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';

import loginAnimation from 'src/assets/animatons/login.json';
import { Colors } from 'src/constants/color/colors';
import { ScaleHorizontal, ScaleVertical } from 'src/constants/screen/screenSize';
import { useSocket } from 'src/context/SocketContext';
import LoginForm from 'src/forms/LoginForm';
import { GetGradientStartEnd } from 'src/utils/rotate';

import ForgotPasswordBottomSheet from './components/ForgotPasswordBottomSheet';

type LoginProps = {
  navigation: any;
};

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const [forgotPasswordBottomSheetVisible, setForgotPasswordBottomSheetVisible] =
    useState<boolean>(false);
  const { userLogin } = useSocket();

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 2000 }),
        withTiming(1.1, { duration: 2000 })
      ),
      -1,
      true
    );

    translateY.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 1000 }),
        withTiming(-10, { duration: 1000 })
      ),
      -1,
      true
    );
  }, [scale, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { translateY: translateY.value }],
    };
  });

  const onLoginSuccess = (userId: string) => {
    userLogin(userId);
    navigation.replace('Main');
  };

  return (
    <KeyboardAvoidingView
      style={styles.screenContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" animated backgroundColor={'#FF6347'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          height: SCREEN_HEIGHT,
          gap: 50,
        }}
      >
        <View style={styles.header}>
          <LinearGradient
            colors={['#FFCCDD', '#FFA07A', '#FF6347', '#FF4500', '#FF0000']}
            {...GetGradientStartEnd(0)}
            style={[
              styles.lineaderGradient,
              styles.shadow,
              {
                borderRadius: SCREEN_WIDTH * ScaleHorizontal(0.65),
                width: SCREEN_WIDTH * ScaleHorizontal(1.25),
                height: SCREEN_HEIGHT * ScaleVertical(0.7),
                top: -SCREEN_WIDTH * ScaleVertical(0.6),
                left: -SCREEN_WIDTH * ScaleHorizontal(0.2),
              },
            ]}
          >
            <Animated.View style={[styles.animation, animatedStyle]}>
              <LottieView
                source={loginAnimation}
                style={{
                  width: SCREEN_WIDTH * ScaleHorizontal(0.8),
                  height: SCREEN_WIDTH * ScaleVertical(0.8),
                  position: 'absolute',
                  bottom: -SCREEN_WIDTH * ScaleVertical(0.1),
                  transform: [{ rotate: '35deg' }],
                }}
                autoPlay
                loop
                speed={2}
                resizeMode="cover"
              />
            </Animated.View>
          </LinearGradient>
        </View>
        <View style={styles.body}>
          <LoginForm
            setForgotPasswordBottomSheetVisible={setForgotPasswordBottomSheetVisible}
            gotoRegister={() => navigation.navigate('Register')}
            onLoginSuccess={onLoginSuccess}
          />

          {forgotPasswordBottomSheetVisible && (
            <ForgotPasswordBottomSheet
              isVisible={forgotPasswordBottomSheetVisible}
              onSwipeDown={setForgotPasswordBottomSheetVisible}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.primaryColors.light,
  },
  header: {
    height: '40%',
  },
  lineaderGradient: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  animation: {
    alignItems: 'center',
  },
  body: {
    height: '60%',
  },
  shadow: {
    shadowColor: Colors.primaryColors.dark,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
});

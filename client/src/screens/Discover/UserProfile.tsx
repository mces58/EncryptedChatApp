import React, { useMemo, useState } from 'react';
import {
  NativeModules,
  Platform,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';

import i18next from 'i18next';
import LottieView from 'lottie-react-native';

import animation from 'src/assets/animatons/user-profile.json';
import ArrowIcon from 'src/assets/icons/arrow';
import CalendarIcon from 'src/assets/icons/calendar';
import GenderIcon from 'src/assets/icons/gender';
import GhostIcon from 'src/assets/icons/ghost';
import InfoIcon from 'src/assets/icons/info';
import QuotationIcon from 'src/assets/icons/quotation';
import Card from 'src/components/cards/Card';
import BackHeader from 'src/components/headers/BackHeader';
import ProfileWithText from 'src/components/profileContainer/ProfileWithText';
import { ScaleHorizontal, ScaleVertical } from 'src/constants/screen/screenSize';
import { User } from 'src/constants/types/user';
import { Theme, useTheme } from 'src/context/ThemeContext';
import { UserProfileProps } from 'src/navigations/RootStackParamList';

const UserProfile: React.FC<UserProfileProps> = ({ navigation, route }) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const { theme } = useTheme();
  const { StatusBarManager } = NativeModules;
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
  const styles = useMemo(() => createStyles(theme, STATUSBAR_HEIGHT), [theme]);
  const [user] = useState<User>(route.params.user);

  return (
    <View style={styles.screenContainer}>
      <BackHeader
        title={user?.userName}
        icon={
          <ArrowIcon
            width={ScaleHorizontal(25)}
            height={ScaleVertical(25)}
            direction="left"
          />
        }
        onPress={() => navigation.goBack()}
        componentSize={{ height: ScaleVertical(75) }}
      />
      <View style={styles.container}>
        <ProfileWithText
          text={user?.fullName}
          imageUri={user?.hideAvatar ? `https://robohash.org/${user?.id}` : user?.avatar}
          componentSize={{ width: ScaleHorizontal(125), height: ScaleVertical(125) }}
        />

        <View style={styles.userContainer}>
          <Card
            title={i18next.t('global.createdAt')}
            text={new Date(user?.createdAt).toLocaleDateString()}
            icon={
              <CalendarIcon
                width={ScaleHorizontal(22)}
                height={ScaleVertical(22)}
                strokeWidth={1.5}
              />
            }
          />
          <Card
            title={i18next.t('global.email')}
            text={user?.email}
            icon={
              <InfoIcon
                width={ScaleHorizontal(22)}
                height={ScaleVertical(22)}
                strokeWidth={1.5}
              />
            }
          />
          <Card
            title={i18next.t('global.friendCount')}
            text={user?.friends?.length.toString()}
            icon={
              <GhostIcon
                width={ScaleHorizontal(22)}
                height={ScaleVertical(22)}
                strokeWidth={2.2}
              />
            }
          />
          <Card
            title={i18next.t('global.gender')}
            text={
              user?.gender === 'male'
                ? i18next.t('global.male')
                : i18next.t('global.female')
            }
            icon={
              <GenderIcon
                width={ScaleHorizontal(22)}
                height={ScaleVertical(22)}
                strokeWidth={0.8}
              />
            }
          />
          {user?.hideAbout ? null : (
            <Card
              title={i18next.t('global.about')}
              text={user?.about ? user.about : '...'}
              icon={
                <QuotationIcon
                  width={ScaleHorizontal(22)}
                  height={ScaleVertical(22)}
                  strokeWidth={2}
                />
              }
            />
          )}
        </View>

        <View style={styles.animationContainer}>
          <Animated.View style={styles.animatedView}>
            <LottieView
              source={animation}
              style={{
                width: SCREEN_WIDTH,
                height: SCREEN_WIDTH * ScaleVertical(0.5),
                marginTop: ScaleVertical(18),
              }}
              autoPlay
              loop
              speed={1}
              resizeMode="cover"
            />
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default UserProfile;

const createStyles = (theme: Theme, STATUSBAR_HEIGHT: number) =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      paddingTop: STATUSBAR_HEIGHT,
    },
    container: {
      flex: 1,
      paddingVertical: ScaleVertical(8),
      gap: 20,
    },
    userContainer: {
      alignItems: 'center',
      gap: 25,
      paddingBottom: ScaleVertical(20),
    },
    animationContainer: {
      flex: 1,
      width: '100%',
    },
    animatedView: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

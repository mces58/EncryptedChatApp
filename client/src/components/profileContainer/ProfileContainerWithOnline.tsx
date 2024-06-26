import React, { useEffect, useMemo, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import i18next from 'i18next';

import {
  ScaleFontSize,
  ScaleHorizontal,
  ScaleVertical,
} from 'src/constants/screen/screenSize';
import { User } from 'src/constants/types/user';
import { useSocket } from 'src/context/SocketContext';
import { Theme, useTheme } from 'src/context/ThemeContext';

import ProfileImage from './ProfileImage';

interface ProfileContainerWithOnlineProps {
  user: User;
  onPress?: () => void;
  icon?: React.ReactNode;
  componentSize?: StyleProp<ViewStyle> & { width: number; height: number };
  showUserNames?: boolean;
  textStyles?: StyleProp<TextStyle> & { fontSize?: number; color?: string };
  disabled?: boolean;
}

const ProfileContainerWithOnline: React.FC<ProfileContainerWithOnlineProps> = ({
  user,
  onPress,
  icon,
  componentSize = {
    width: ScaleHorizontal(80),
    height: ScaleVertical(80),
  },
  showUserNames = true,
  textStyles,
  disabled = false,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme, textStyles), [theme]);
  const { isTyping, onlineUsers } = useSocket();
  const [isOnline, setIsOnline] = useState<boolean>(false);

  useEffect(() => {
    if (onlineUsers.includes(user?.id)) {
      setIsOnline(true);
    } else {
      setIsOnline(false);
    }
  }, [onlineUsers, user?.id]);

  return (
    <TouchableOpacity
      style={[styles.container, !showUserNames && { borderBottomWidth: 0 }]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.row}>
        <ProfileImage
          imageUri={user?.hideAvatar ? `https://robohash.org/${user?.id}` : user?.avatar}
          componentSize={componentSize}
          disabled
        />
        <View style={styles.textContainer}>
          <Text style={[styles.fullName, { color: textStyles?.color }]}>
            {user?.fullName}
          </Text>
          {showUserNames && <Text style={styles.userName}>{user?.userName}</Text>}

          {isTyping ? (
            <Text style={styles.typing}>{i18next.t('global.typing')}</Text>
          ) : isOnline && !user.hideOnlineStatus ? (
            <Text style={styles.typing}>{i18next.t('global.online')}</Text>
          ) : (
            <Text style={styles.typing}>{i18next.t('global.offline')}</Text>
          )}
        </View>
      </View>
      {icon}
    </TouchableOpacity>
  );
};

export default ProfileContainerWithOnline;

const createStyles = (theme: Theme, textStyles: StyleProp<TextStyle>) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: ScaleHorizontal(10),
      paddingVertical: ScaleVertical(10),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    textContainer: {
      gap: 1,
    },
    fullName: {
      fontSize: (textStyles as TextStyle)?.fontSize ?? ScaleFontSize(14),
      fontFamily: 'Poppins-SemiBold',
    },
    userName: {
      fontSize: ScaleFontSize(12),
      fontFamily: 'Poppins-Medium',
      color: theme.textMutedColor,
    },
    typing: {
      fontSize: ScaleFontSize(10),
      fontFamily: 'Poppins-Regular',
      color: theme.textMutedColor,
    },
  });

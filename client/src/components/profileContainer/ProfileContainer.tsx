import React, { useMemo } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {
  ScaleFontSize,
  ScaleHorizontal,
  ScaleVertical,
} from 'src/constants/screen/screenSize';
import { User } from 'src/constants/types/user';
import { Theme, useTheme } from 'src/context/ThemeContext';

import ProfileImage from './ProfileImage';

interface ProfileContainerProps {
  user: User;
  onPress?: () => void;
  icon?: React.ReactNode;
  componentSize?: StyleProp<ViewStyle> & { width: number; height: number };
  showUserNames?: boolean;
  textStyles?: StyleProp<TextStyle> & { fontSize?: number; color?: string };
  disabled?: boolean;
}

const ProfileContainer: React.FC<ProfileContainerProps> = ({
  user,
  onPress,
  icon,
  componentSize = {
    width: ScaleHorizontal(90),
    height: ScaleVertical(90),
  },
  showUserNames = true,
  textStyles,
  disabled = false,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme, textStyles), [theme]);

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
        </View>
      </View>
      {icon}
    </TouchableOpacity>
  );
};

export default ProfileContainer;

const createStyles = (theme: Theme, textStyles: StyleProp<TextStyle>) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: ScaleHorizontal(15),
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
      fontSize: (textStyles as TextStyle)?.fontSize ?? ScaleFontSize(16),
      fontFamily: 'Poppins-SemiBold',
    },
    userName: {
      fontSize: ScaleFontSize(12),
      fontFamily: 'Poppins-Medium',
      color: theme.textMutedColor,
    },
  });

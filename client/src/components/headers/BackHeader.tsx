import React, { useMemo } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { Theme, useTheme } from 'src/context/ThemeContext';

interface BackHeaderProps {
  title: string;
  icon?: React.ReactNode;
  onPress?: () => void;
  componentSize?: StyleProp<ViewStyle> & { height: number };
}

const BackHeader: React.FC<BackHeaderProps> = ({
  title,
  icon,
  onPress,
  componentSize = { height: 100 },
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={[styles.container, componentSize]}>
      <TouchableOpacity
        onPress={onPress ? onPress : () => {}}
        style={styles.textContainer}
      >
        {icon}
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BackHeader;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: theme.headerBackgroundColor,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      borderBottomRightRadius: 25,
      borderBottomLeftRadius: 25,
      shadowColor: theme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
    },
    textContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 1,
    },
    text: {
      fontFamily: 'Nunito-Bold',
      color: theme.textColor,
      fontSize: 20,
    },
  });

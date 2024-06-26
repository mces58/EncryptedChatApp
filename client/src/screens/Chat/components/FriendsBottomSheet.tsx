import React, { useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import i18next from 'i18next';

import BinIcon from 'src/assets/icons/bin';
import SendMessageIcon from 'src/assets/icons/send-message';
import BaseBottomSheet from 'src/components/bottomSheet/BaseBottomSheet';
import ProfileContainer from 'src/components/profileContainer/ProfileContainer';
import { Colors } from 'src/constants/color/colors';
import {
  ScaleFontSize,
  ScaleHorizontal,
  ScaleVertical,
} from 'src/constants/screen/screenSize';
import { Response } from 'src/constants/types/response';
import { User } from 'src/constants/types/user';
import { useAuthContext } from 'src/context/AuthContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import friendService from 'src/services/friend-service';

interface FriendsBoxBottomSheetProps {
  isVisible: boolean;
  onSwipeDown: () => void;
  navigation: any;
  friends: User[];
  setFriends: (friends: User[]) => void;
  meId: string;
}

const FriendsBottomSheet: React.FC<FriendsBoxBottomSheetProps> = ({
  isVisible,
  onSwipeDown,
  navigation,
  friends,
  setFriends,
  meId,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme, SCREEN_HEIGHT), [theme]);
  const { authUser } = useAuthContext();

  const removeFriend = async (friendId: string) => {
    try {
      if (authUser) {
        const response: Response = await friendService.removeFriend(
          authUser?.token,
          friendId
        );
        if (response.success) {
          setFriends(friends.filter((friend) => friend.id !== friendId));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = (user: User, index: number) => (
    <TouchableOpacity
      key={index}
      style={[styles.userContainer, styles.shadow]}
      onPress={() => {
        navigation.navigate('UserProfile', { user });
        onSwipeDown();
      }}
    >
      <ProfileContainer
        user={user}
        componentSize={{ width: ScaleHorizontal(40), height: ScaleVertical(40) }}
        showUserNames={false}
        disabled
        textStyles={{ fontSize: ScaleFontSize(14) }}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.messageButton, styles.shadow]}
          onPress={() => {
            navigation.navigate('Chat', {
              senderId: meId,
              receiverId: user.id,
              receiver: user,
            });
            onSwipeDown();
          }}
        >
          <SendMessageIcon
            width={ScaleHorizontal(18)}
            height={ScaleVertical(18)}
            customColor={Colors.primaryColors.light}
            strokeWidth={4}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.deleteButton, styles.shadow]}
          onPress={() => removeFriend(user.id)}
        >
          <BinIcon
            width={ScaleHorizontal(18)}
            height={ScaleVertical(18)}
            strokeWidth={4}
            customColor={Colors.primaryColors.beige}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const content = (
    <View style={styles.container}>
      {friends.length > 0 ? (
        <>
          <Text style={styles.headerText}>
            {i18next.t('chat.friendsBottomSheet.header')}
          </Text>
          {friends.map((user, index) => renderItem(user, index))}
        </>
      ) : (
        <View style={styles.noFriendContainer}>
          <Text style={styles.headerText}>
            {i18next.t('chat.friendsBottomSheet.noFriends')}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <BaseBottomSheet
      animationType="slide"
      isTransparent
      isVisible={isVisible}
      onSwipeDown={onSwipeDown}
      content={<ScrollView showsVerticalScrollIndicator={false}>{content}</ScrollView>}
      modalStyle={styles.bottomSheet}
    />
  );
};

export default FriendsBottomSheet;

const createStyles = (theme: Theme, SCREEN_HEIGHT: number) =>
  StyleSheet.create({
    bottomSheet: {
      height: SCREEN_HEIGHT * ScaleVertical(0.5),
      backgroundColor: theme.bottomSheetBackgroundColor,
      borderTopLeftRadius: ScaleHorizontal(20),
      borderTopRightRadius: ScaleHorizontal(20),
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: ScaleHorizontal(18),
      paddingVertical: ScaleVertical(10),
      gap: 20,
    },
    container: {
      flex: 1,
      gap: 20,
    },
    headerText: {
      fontSize: ScaleFontSize(18),
      color: theme.textColor,
      fontFamily: 'Poppins-Bold',
      textAlign: 'center',
      borderBottomWidth: ScaleHorizontal(1),
      borderBottomColor: theme.borderColor,
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.borderColor,
      width: '100%',
      paddingVertical: ScaleVertical(8),
      paddingRight: ScaleHorizontal(10),
      borderRadius: ScaleHorizontal(20),
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    messageButton: {
      backgroundColor: Colors.primaryColors.primary,
      paddingHorizontal: ScaleHorizontal(8),
      paddingVertical: ScaleVertical(8),
      borderRadius: ScaleHorizontal(20),
    },
    deleteButton: {
      backgroundColor: Colors.primaryColors.danger,
      paddingHorizontal: ScaleHorizontal(8),
      paddingVertical: ScaleVertical(8),
      borderRadius: ScaleHorizontal(20),
    },
    noFriendContainer: {
      height: ScaleFontSize(200),
      justifyContent: 'center',
      alignItems: 'center',
    },
    shadow: {
      shadowColor: theme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
    },
  });

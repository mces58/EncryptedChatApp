import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import i18next from 'i18next';

import GalleryIcon from 'src/assets/icons/gallery';
import NoteIcon from 'src/assets/icons/note';
import NotificationBubble from 'src/components/bubble/NotificationBubble';
import ProfileImage from 'src/components/profileContainer/ProfileImage';
import { LastMessages } from 'src/constants/types/message';
import { Theme, useTheme } from 'src/context/ThemeContext';

interface MessageContainerProps {
  user: LastMessages;
  isOnline: boolean;
  gotoChatRoom: () => void;
}

const MessageContainer: React.FC<MessageContainerProps> = ({
  user,
  isOnline,
  gotoChatRoom,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const getMessagePreview = (message: string, isSender: boolean) => {
    const previewMessage = message?.length > 30 ? message.slice(0, 30) + '...' : message;
    return isSender ? i18next.t('global.you') + ': ' + previewMessage : previewMessage;
  };

  const renderLastMessage = (
    lastMessage: { image: string; audio: string; message: string },
    isReceiver: boolean
  ) => {
    if (!lastMessage) {
      return i18next.t('chat.messageContainer.noMessage');
    }

    if (lastMessage.image) {
      return (
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
        >
          {!isReceiver && (
            <Text style={styles.lastSeen}>{i18next.t('global.you') + ': '}</Text>
          )}
          <GalleryIcon width={15} height={15} />
        </View>
      );
    }

    if (lastMessage.audio) {
      return (
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
        >
          {!isReceiver && (
            <Text style={styles.lastSeen}>{i18next.t('global.you') + ': '}</Text>
          )}
          <NoteIcon width={15} height={15} />
        </View>
      );
    }

    return getMessagePreview(lastMessage.message, !isReceiver);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.userContainer]} onPress={gotoChatRoom}>
        {user.lastMessage && (
          <>
            <View>
              {isOnline && !user.receiver.hideOnlineStatus && <NotificationBubble />}
              <ProfileImage
                imageUri={
                  user.receiver.hideAvatar
                    ? `https://robohash.org/${user.receiver.id}`
                    : user.receiver.avatar
                }
                componentSize={{
                  height: 50,
                  width: 50,
                }}
              />
            </View>

            <View style={styles.row}>
              <View style={styles.userInfoContainer}>
                <Text style={styles.userName}>{user.receiver.fullName}</Text>
                <Text style={styles.lastSeen}>
                  {renderLastMessage(
                    user.lastMessage,
                    user.receiver.id === user.lastMessage.senderId
                  )}
                </Text>
              </View>

              <View style={styles.time}>
                <Text style={styles.timeText}>
                  {new Date(user.lastMessage.createdAt).toLocaleTimeString('tr-TR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
            </View>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MessageContainer;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    userContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      gap: 10,
    },
    row: {
      flexDirection: 'row',
      width: '90%',
      paddingVertical: 20,
    },
    userInfoContainer: {
      width: '70%',
      paddingVertical: 5,
    },
    userName: {
      fontFamily: 'Poppins-Bold',
      fontSize: 14,
      color: theme.textColor,
    },
    lastSeen: {
      fontFamily: 'Nunito-Regular',
      fontSize: 12,
      color: theme.textMutedColor,
    },
    time: {
      position: 'absolute',
      right: 30,
      top: 30,
      alignItems: 'center',
    },
    timeText: {
      fontFamily: 'Nunito-Bold',
      fontSize: 12,
      color: theme.textMutedColor,
    },
    shadow: {
      shadowColor: theme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });

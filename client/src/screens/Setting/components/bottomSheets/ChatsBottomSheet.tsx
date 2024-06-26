import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import i18next from 'i18next';

import BaseBottomSheet from 'src/components/bottomSheet/BaseBottomSheet';
import {
  ScaleFontSize,
  ScaleHorizontal,
  ScaleVertical,
} from 'src/constants/screen/screenSize';
import { Theme, useTheme } from 'src/context/ThemeContext';

import chatSettingModals, { ChatSettingModals } from '../../constants/chat-setting-modal';
import { ModalNames } from '../../constants/modal-names';
import FontSizeModal from '../modals/FontSizeModal';
import WallpaperModal from '../modals/WallpaperModal';

import ModalWrapper from '../ModalWrapper';

interface ChatsBottomSheetProps {
  isVisible: boolean;
  onSwipeDown: () => void;
}

const ChatsBottomSheet: React.FC<ChatsBottomSheetProps> = ({
  isVisible,
  onSwipeDown,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme, SCREEN_HEIGHT), [theme]);
  const [visibleSheet, setVisibleSheet] = useState<ModalNames>(null);
  const [modals] = useState<ChatSettingModals[]>(chatSettingModals);

  const modalNames = {
    FontSize: FontSizeModal,
    WallpaperColor: WallpaperModal,
  };

  const handleToggleSheet = (modalName: ModalNames): void => {
    setVisibleSheet((prev: ModalNames | null) => (prev === modalName ? null : modalName));
  };

  const content = (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {i18next.t('settings.chatsBottomSheet.header')}
      </Text>

      {modals.map((modal: ChatSettingModals, index: number) => (
        <View
          key={modal.name || index}
          style={[
            styles.buttonContainer,
            index === modals.length - 1 && { borderBottomWidth: 0 },
          ]}
        >
          <TouchableOpacity
            onPress={() => handleToggleSheet(modal.name as ModalNames)}
            style={styles.button}
          >
            <Text style={styles.text}>
              {i18next.t(`settings.chatsBottomSheet.${modal.name}`)}
            </Text>
            {modal.icon}
          </TouchableOpacity>
        </View>
      ))}

      {modals.map((m) => (
        <ModalWrapper
          key={m.name}
          ModalComponent={modalNames[m.name as keyof typeof modalNames]}
          isVisible={visibleSheet === m.name}
          onClose={() => handleToggleSheet(m.name as ModalNames)}
        />
      ))}
    </View>
  );

  return (
    <BaseBottomSheet
      animationType="slide"
      isTransparent
      isVisible={isVisible}
      onSwipeDown={onSwipeDown}
      content={content}
      modalStyle={styles.bottomSheet}
    />
  );
};

export default ChatsBottomSheet;

const createStyles = (theme: Theme, SCREEN_HEIGHT: number) =>
  StyleSheet.create({
    bottomSheet: {
      height: SCREEN_HEIGHT * ScaleVertical(0.25),
      backgroundColor: theme.bottomSheetBackgroundColor,
      borderTopLeftRadius: ScaleHorizontal(20),
      borderTopRightRadius: ScaleHorizontal(20),
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: ScaleHorizontal(18),
      paddingVertical: ScaleVertical(8),
    },
    container: {
      flex: 1,
      marginTop: ScaleVertical(10),
      alignItems: 'center',
      paddingHorizontal: ScaleHorizontal(8),
      paddingVertical: ScaleVertical(8),
    },
    headerText: {
      fontSize: ScaleFontSize(18),
      color: theme.textColor,
      fontFamily: 'Poppins-Bold',
    },
    buttonContainer: {
      width: '100%',
      paddingHorizontal: ScaleHorizontal(8),
      paddingVertical: ScaleVertical(18),
      borderBottomWidth: ScaleVertical(1),
      borderBottomColor: theme.borderColor,
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    text: {
      fontFamily: 'Nunito-Bold',
      color: theme.textColor,
      fontSize: ScaleFontSize(12),
    },
  });

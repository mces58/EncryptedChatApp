import React, { useMemo, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import { Formik } from 'formik';
import i18next from 'i18next';

import { Colors } from 'src/constants/color/colors';
import { Response } from 'src/constants/types/response';
import { useAuthContext } from 'src/context/AuthContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import authService from 'src/services/auth-service';
import groupService from 'src/services/group-service';
import { newValueSchema } from 'src/validations/newValue';

import BaseBottomSheet from './BaseBottomSheet';

interface SetProfileValueBottomSheetProps {
  title: string;
  placeholder: string;
  isVisible: boolean;
  onSwipeDown: () => void;
  setValue: (value: string) => void;
  value: string;
  type: string;
  isGroup?: boolean;
  groupId?: string;
}

const SetProfileValueBottomSheet: React.FC<SetProfileValueBottomSheetProps> = ({
  title,
  placeholder,
  isVisible,
  onSwipeDown,
  setValue,
  value,
  type,
  isGroup = false,
  groupId,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme, SCREEN_HEIGHT), [theme]);
  const { authUser } = useAuthContext();
  const [tempUserName] = useState<string>(value);

  const handleUpdateMe = async (value: string, resetForm: () => void) => {
    try {
      if (authUser) {
        setValue(value);
        const response: Response = await authService.updateMe(
          { [type]: value },
          authUser.toString()
        );
        if (response.success) {
          resetForm();
        }
      }
    } catch (error) {
      Alert.alert(i18next.t('alert.error'), i18next.t('alert.usernameExists'));
      setValue(tempUserName);
    } finally {
      resetForm();
      onSwipeDown();
    }
  };

  const handleUpdateGroup = async (value: string, resetForm: () => void) => {
    try {
      if (authUser) {
        if (groupId) {
          setValue(value);
          const response: Response = await groupService.updateGroup(
            authUser.toString(),
            groupId,
            { [type]: value }
          );
          if (response.success) {
            resetForm();
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BaseBottomSheet
      animationType="slide"
      isTransparent
      isVisible={isVisible}
      onSwipeDown={onSwipeDown}
      content={
        <Formik
          initialValues={{ newValue: value }}
          validationSchema={newValueSchema(type)}
          onSubmit={(values, { resetForm }) => {
            if (isGroup) {
              handleUpdateGroup(values.newValue, resetForm);
              onSwipeDown();
            } else {
              handleUpdateMe(values.newValue, resetForm);
              onSwipeDown();
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.container}>
              <Text style={styles.headerText}>{title}</Text>
              <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                placeholderTextColor={'#ccc'}
                onChangeText={handleChange('newValue')}
                onBlur={handleBlur('newValue')}
                value={values.newValue}
              />
              {touched.newValue && errors.newValue && (
                <Text style={styles.errorText}>{errors.newValue}</Text>
              )}
              <TouchableOpacity
                style={[styles.button, styles.shadow]}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.buttonText}>{i18next.t('global.save')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      }
      modalStyle={styles.bottomSheet}
    />
  );
};

export default SetProfileValueBottomSheet;

const createStyles = (theme: Theme, SCREEN_HEIGHT: number) =>
  StyleSheet.create({
    bottomSheet: {
      height: SCREEN_HEIGHT * 0.3,
      backgroundColor: theme.bottomSheetBackgroundColor,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 20,
      paddingVertical: 10,
      gap: 15,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      gap: 15,
    },
    headerText: {
      fontSize: 20,
      color: theme.textColor,
      fontFamily: 'Poppins-Bold',
    },
    textInput: {
      width: '100%',
      height: 50,
      paddingVertical: 10,
      paddingHorizontal: 10,
      color: theme.textColor,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    button: {
      width: '100%',
      padding: 10,
      backgroundColor: Colors.primaryColors.headerColor,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    shadow: {
      shadowColor: theme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    buttonText: {
      color: Colors.primaryColors.dark,
      fontSize: 16,
      fontFamily: 'Nunito-Bold',
    },
    errorText: {
      fontFamily: 'Nunito-Bold',
      color: Colors.primaryColors.danger,
      textAlign: 'center',
      fontSize: 12,
    },
  });

import React, { useEffect, useMemo, useState } from 'react';
import {
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import i18next from 'i18next';

import CrossIcon from 'src/assets/icons/cross';
import { EarthIcon } from 'src/assets/icons/headers';
import SearchIcon from 'src/assets/icons/search';
import Header from 'src/components/headers/Header';
import Pagination from 'src/components/pagination/Pagination';
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

import RequestBoxBottomSheet from './components/RequestBoxBottomSheet';
import UserCard from './components/UserCard';

interface DiscoverProps {
  navigation: any;
}

const Discover: React.FC<DiscoverProps> = ({ navigation }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [cardDisplay, setCardDisplay] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = cardDisplay ? 5 : 4;
  const { authUser } = useAuthContext();
  const [requestBoxBottomSheetVisible, setRequestBoxBottomSheetVisible] =
    useState<boolean>(false);
  const [incomingRequests, setIncomingRequests] = useState<User[]>([]);
  const [outgoingRequests, setOutgoingRequests] = useState<User[]>([]);
  const { theme } = useTheme();
  const { StatusBarManager } = NativeModules;
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
  const styles = useMemo(() => createStyles(theme, STATUSBAR_HEIGHT), [theme]);
  const [notificationCount, setNotificationCount] = useState<number>(
    incomingRequests.length
  );
  const [search, setSearch] = useState<string>('');

  const getUsers = async () => {
    try {
      if (authUser) {
        const response: Response = await friendService.getNonFriends(authUser?.token);
        if (response.success) {
          setUsers(response.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [authUser, incomingRequests, outgoingRequests]);

  useEffect(() => {
    setNotificationCount(incomingRequests.length);
  }, [incomingRequests]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleConnect = async (userId: string) => {
    try {
      if (authUser) {
        const response: Response = await friendService.sendFriendRequest(
          authUser.token,
          userId
        );

        if (response.success) {
          getUsers();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = (user: User, index: number) => (
    <UserCard
      key={index}
      index={index}
      user={user}
      onPressCard={() => navigation.navigate('UserProfile', { user })}
      onPressAddFriend={() => handleConnect(user.id)}
    />
  );

  return (
    <View style={styles.screenContainer}>
      <Header
        title={i18next.t('discover.discover.header')}
        icon={<EarthIcon width={ScaleHorizontal(25)} height={ScaleVertical(25)} />}
        onIconPress={() => setRequestBoxBottomSheetVisible(true)}
        notificationCount={notificationCount}
      />

      <View style={styles.container}>
        <View style={styles.body}>
          <>
            {users.length === 0 ? (
              <View style={styles.noUserContainer}>
                <Text style={styles.noUserText}>
                  {i18next.t('discover.discover.noUser')}
                </Text>
              </View>
            ) : (
              <>
                <View
                  style={[
                    styles.headerContainer,
                    styles.shadow,
                    cardDisplay && { display: 'none' },
                  ]}
                >
                  <Text style={styles.headerText}>
                    {i18next.t('discover.discover.message')}
                  </Text>
                  <TouchableOpacity onPress={() => setCardDisplay(true)}>
                    <CrossIcon width={ScaleHorizontal(12)} height={ScaleVertical(12)} />
                  </TouchableOpacity>
                </View>

                <View style={[styles.textInputContainer, styles.shadow]}>
                  <SearchIcon
                    width={ScaleHorizontal(18)}
                    height={ScaleVertical(18)}
                    customColor={
                      search.length > 0
                        ? Colors.primaryColors.dark
                        : Colors.primaryColors.textMuted
                    }
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder={i18next.t('discover.discover.searchPlaceholder')}
                    placeholderTextColor={theme.textMutedColor}
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                  />
                </View>

                {search.length > 0
                  ? users
                      .filter((user) =>
                        user.fullName.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((user, index) => renderItem(user, index))
                  : paginatedData.map((user, index) => renderItem(user, index))}
                {users.length > itemsPerPage && (
                  <View style={styles.paginationContainer}>
                    <Pagination
                      totalItems={users.length}
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </View>
                )}
              </>
            )}
          </>

          {requestBoxBottomSheetVisible && (
            <RequestBoxBottomSheet
              isVisible={requestBoxBottomSheetVisible}
              onSwipeDown={() => setRequestBoxBottomSheetVisible(false)}
              incomingRequests={incomingRequests}
              setIncomingRequests={setIncomingRequests}
              outgoingRequests={outgoingRequests}
              setOutgoingRequests={setOutgoingRequests}
              navigation={navigation}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default Discover;

const createStyles = (theme: Theme, STATUSBAR_HEIGHT: number) =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      paddingTop: STATUSBAR_HEIGHT,
    },
    container: {
      flex: 1,
      paddingHorizontal: ScaleHorizontal(8),
      paddingVertical: ScaleVertical(18),
      gap: 20,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: ScaleHorizontal(12),
      paddingVertical: ScaleVertical(8),
      borderWidth: ScaleHorizontal(1),
      borderColor: theme.borderColor,
      backgroundColor: theme.cardColor,
      borderRadius: ScaleHorizontal(20),
    },
    headerText: {
      width: '90%',
      fontFamily: 'Nunito-SemiBold',
      fontStyle: 'italic',
      color: theme.textColor,
      fontSize: ScaleFontSize(14),
      textAlign: 'center',
    },
    body: {
      flex: 1,
      paddingHorizontal: ScaleHorizontal(8),
      paddingVertical: ScaleVertical(5),
      gap: 20,
    },
    paginationContainer: {
      width: '100%',
      paddingHorizontal: ScaleHorizontal(8),
      paddingVertical: ScaleVertical(5),
      alignSelf: 'center',
      position: 'absolute',
      bottom: ScaleVertical(60),
    },
    noUserContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noUserText: {
      fontFamily: 'Nunito-Regular',
      color: theme.textColor,
      fontSize: ScaleFontSize(20),
    },
    textInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: ScaleHorizontal(8),
      paddingVertical: ScaleVertical(5),
      borderWidth: ScaleHorizontal(1),
      borderColor: theme.borderColor,
      backgroundColor: theme.cardColor,
      borderRadius: ScaleHorizontal(20),
    },
    textInput: {
      width: '90%',
      fontFamily: 'Nunito-Regular',
      color: theme.textColor,
      fontSize: ScaleFontSize(13),
      marginLeft: ScaleHorizontal(8),
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

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Modal, SafeAreaView, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import wasetLogo from '../assets/waset.png';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../Redux/CurrentUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import db from '../story/firebaseconfig';
import { getDocs, writeBatch } from 'firebase/firestore';

const NavBar = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const currentUser = useSelector((state) => state.currentUser);
  const scaleAnim = new Animated.Value(1);

  useEffect(() => {
    const getUserFromStorage = async () => {
      try {
        const userData = await AsyncStorage.getItem('currentUser');
        if (userData !== null) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          dispatch(setCurrentUser(parsedUser));
        }
      } catch (error) {
        console.error("Error fetching user from AsyncStorage: ", error);
      }
    };

    getUserFromStorage();
  }, [dispatch]);

  useEffect(() => {
    if (!currentUser?.UserId) return;

    const messagesQuery = query(
      collection(db, "messages"),
      where("participants", "array-contains", currentUser.UserId)
    );

    const messagesUnsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      let unreadCount = 0;
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.lastMessage && !data.lastMessage.read && data.lastMessage.senderId !== currentUser.UserId) {
          unreadCount++;
        }
      });
      setUnreadMessages(unreadCount);
    });

    const notificationsQuery = query(
      collection(db, "notifications"),
      where("userId", "==", currentUser.UserId),
      where("read", "==", false),
      orderBy("timestamp", "desc")
    );

    const notificationsUnsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
      setUnreadNotifications(snapshot.size);
    });

    return () => {
      messagesUnsubscribe();
      notificationsUnsubscribe();
    };
  }, [currentUser]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('currentUser');
      dispatch(setCurrentUser(null));
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const markNotificationsAsRead = async () => {
    if (!currentUser?.UserId) return;

    try {
      const notificationsRef = collection(db, "notifications");
      const q = query(
        notificationsRef,
        where("userId", "==", currentUser.UserId),
        where("read", "==", false)
      );

      const querySnapshot = await getDocs(q);
      const batch = writeBatch(db);

      querySnapshot.forEach((doc) => {
        batch.update(doc.ref, { read: true });
      });

      await batch.commit();
      setUnreadNotifications(0);
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.logoContainer}
        >
          <Image source={wasetLogo} style={styles.logo} />
        </TouchableOpacity>

        <View style={styles.iconsContainer}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                navigation.navigate('Chats');
                handlePressIn();
                handlePressOut();
              }}
            >
              <FontAwesome name="envelope" size={22} color="#fff" />
              {unreadMessages > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{unreadMessages}</Text>
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                navigation.navigate('Notifications');
                markNotificationsAsRead();
                handlePressIn();
                handlePressOut();
              }}
            >
              <FontAwesome name="bell" size={22} color="#fff" />
              {unreadNotifications > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{unreadNotifications}</Text>
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.profileButton}
          >
            <View style={styles.profileContainer}>
              <Image
                source={{
                  uri: user?.PhotoUrl
                  ? user.PhotoUrl
                  : "https://via.placeholder.com/150",
                }}
                style={styles.profileImage}
              />
              <Text style={styles.profileName}>{user?.username || 'مستخدم'}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.sideMenu}>
              <View style={styles.menuHeader}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={30} color="white" />
                </TouchableOpacity>
                <View style={styles.menuProfile}>
                  <Image
                    source={{
                      uri: user?.PhotoUrl
                      ? user.PhotoUrl      : "https://via.placeholder.com/150",
                    }}
                    style={styles.menuProfileImage}
                    onError={(e) => {
                      console.log('Image loading error:', e.nativeEvent.error);
                    }}
                  />
                  <Text style={styles.menuProfileName}>{user?.username || 'مستخدم'}</Text>
                </View>
              </View>

              <ScrollView style={styles.menuItems}>
                {[
                  { name: 'Home', label: 'الرئيسية', icon: 'home' },
                  { name: 'Services', label: 'الخدمات', icon: 'grid' },
                  { name: 'Tourise', label: 'السياحة', icon: 'airplane' },
                  { name: 'Housing', label: 'السكن', icon: 'home' },
                  { name: 'AboutUs', label: 'من نحن', icon: 'information-circle' },
                  { name: 'Community', label: 'المجتمع', icon: 'people' },
                  { name: 'Profile', label: 'الملف الشخصي', icon: 'person' },
                ].map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate(item.name);
                      setModalVisible(false);
                    }}
                    style={styles.menuItem}
                  >
                    <Ionicons name={item.icon} size={24} color="#FFD700" style={styles.menuIcon} />
                    <Text style={styles.menuText}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}
              >
                <FontAwesome name="sign-out" size={20} color="white" />
                <Text style={styles.logoutText}>تسجيل الخروج</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#091E3D',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#091E3D',
  },
  logoContainer: {
    padding: 5,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FFD700',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  badgeText: {
    backgroundColor: '#091E3D',
    fontSize: 12,
    fontWeight: 'bold',
  },
  profileButton: {
    marginLeft: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 5,
    borderRadius: 20,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  profileName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  sideMenu: {
    width: '80%',
    backgroundColor: '#091E3D',
    height: '100%',
    padding: 20,
  },
  menuHeader: {
    marginBottom: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  menuProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  menuProfileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  menuProfileName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuItems: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
  },
  menuIcon: {
    marginLeft: 15,
    width: 24,
    height: 24,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default NavBar;

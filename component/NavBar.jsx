import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import wasetLogo from '../assets/waset.png';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../Redux/CurrentUser';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NavBar = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);

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

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image source={wasetLogo} style={styles.logo} />
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.sideMenu}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Ionicons name="close" size={30} color="white" />
            </TouchableOpacity>

            <ScrollView>
              {[{ name: 'Home', label: 'Home Page' }, { name: 'Services', label: 'Services' }, { name: 'Tourise', label: 'Tourise' },
                { name: 'Housing', label: 'Housing' }, { name: 'AboutUs', label: 'About Us' }, { name: 'Community', label: 'Community' },
                ]
                .map((item, index) => (
                  <TouchableOpacity key={index} onPress={() => { navigation.navigate(item.name); setModalVisible(false); }} style={styles.menuItem}>
                    <Text style={styles.menuText}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <View style={styles.userSection}>
        <Ionicons name="notifications-outline" size={28} color="white" style={styles.icon} />
        <Image
          source={{
            uri: user?.image || "https://img.freepik.com/premium-vector/businessman-icon-profile-placeholder_34176-500.jpg",
          }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.profileContainer}>
          {/* {user ? (
            <Text style={styles.profileName}>{user.username}</Text>
          ) : (
            <Text style={styles.profileName}>Loading...</Text>
          )} */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#091E3D',
    padding: 10,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileText: {
    color: '#091E3D',
    fontWeight: 'bold',
  },
  profileName: {
    color: 'white',
    fontWeight: 'bold',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'flex-start',
  },
  sideMenu: {
    width: '70%',
    backgroundColor: '#091E3D',
    height: '100%',
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff50',
  },
  menuText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NavBar;

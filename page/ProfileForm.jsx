import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteCurrentUser } from '../Redux/CurrentUser';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [editingField, setEditingField] = useState(null);
  const [fieldValues, setFieldValues] = useState({
    email: '',
    phonenumber: '',
    city: '',
    address: '',
    status: ''
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    AsyncStorage.clear();  
    dispatch(deleteCurrentUser());
    navigation.navigate('Login');
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userDataFromStorage = JSON.parse(await AsyncStorage.getItem('currentUser'));
        if (userDataFromStorage) {
          setUserData(userDataFromStorage);
          setFieldValues({
            email: userDataFromStorage.email,
            phonenumber: userDataFromStorage.phonenumber,
            city: userDataFromStorage.city,
            address: userDataFromStorage.address,
            status: userDataFromStorage.status
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  const handleInputChange = (field, value) => {
    setFieldValues({ ...fieldValues, [field]: value });
  };

  const handleSave = async (field) => {
    try {
      const updatedUserData = { ...userData, [field]: fieldValues[field] };
      await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUserData));  
      setEditingField(null);
      setUserData(updatedUserData);  
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <View style={styles.profileContainer}>
      <Text style={styles.username}>{userData.username || 'User'}</Text>

      <View style={styles.infoSection}>
        {['email', 'phonenumber', 'city', 'address', 'status'].map((fieldKey) => (
          <View key={fieldKey} style={styles.infoItem}>
            <Text style={styles.infoLabel}>{fieldKey}</Text>
            {editingField === fieldKey ? (
              <TextInput
                style={styles.input}
                value={fieldValues[fieldKey]}
                onChangeText={(text) => handleInputChange(fieldKey, text)}
              />
            ) : (
              <Text>{fieldValues[fieldKey]}</Text>
            )}
            <Button
              title={editingField === fieldKey ? 'Save' : 'Edit'}
              onPress={() => {
                if (editingField === fieldKey) {
                  handleSave(fieldKey);
                } else {
                  setEditingField(fieldKey);  
                }
              }}
            />
          </View>
        ))}
      </View>

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoSection: {
    marginVertical: 20,
  },
  infoItem: {
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
  },
});

export default Profile;

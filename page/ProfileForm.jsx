import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteCurrentUser } from '../Redux/CurrentUser';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { UploadPhoto } from '../UploadPhoto';
import { doc, setDoc, getFirestore, getDoc } from 'firebase/firestore';
import { auth } from '../story/firebaseconfig';

const ProfileForm = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phonenumber: '',
    city: '',
    address: '',
    status: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        await loadFromFirebase();
      } catch (error) {
        console.error('Error loading from Firebase:', error);
        try {
          const storedData = await AsyncStorage.getItem('currentUser');
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            if (parsedData && typeof parsedData === 'object') {
              setUserData(parsedData);
              if (parsedData.image) {
                setImage(parsedData.image);
              }
            }
          }
        } catch (storageError) {
          console.error('Error loading from storage:', storageError);
          Alert.alert('خطأ', 'حدث خطأ أثناء تحميل بيانات المستخدم');
        }
      }
    };

    const loadFromFirebase = async () => {
      const db = getFirestore();
      const userRef = doc(db, 'user', auth.currentUser.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const firebaseData = userDoc.data();
        setUserData(firebaseData);
        if (firebaseData.image) {
          setImage(firebaseData.image);
        }
        await AsyncStorage.setItem('currentUser', JSON.stringify(firebaseData));
      }
    };

    loadUserData();
  }, []);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('خطأ', 'نحتاج إلى إذن للوصول إلى معرض الصور');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 0.5
      });

      if (result && !result.canceled && result.assets && result.assets[0]) {
        const selectedImage = result.assets[0];
        setImage(selectedImage.uri);

        try {
          setLoading(true);
          const imageUrl = await UploadPhoto(selectedImage);
          setUserData({ ...userData, image: imageUrl });
          Alert.alert('نجاح', 'تم رفع الصورة بنجاح');
        } catch (uploadError) {
          console.error('Error uploading image:', uploadError);
          Alert.alert('خطأ', uploadError.message || 'حدث خطأ أثناء رفع الصورة');
          setImage(null);
        } finally {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('خطأ', 'حدث خطأ أثناء اختيار الصورة');
    }
  };

  const handleInputChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const validateForm = () => {
    if (!userData.username.trim()) {
      Alert.alert('خطأ', 'الرجاء إدخال اسم المستخدم');
      return false;
    }
    if (!userData.email.trim()) {
      Alert.alert('خطأ', 'الرجاء إدخال البريد الإلكتروني');
      return false;
    }
    if (userData.phonenumber && !/^\d{10}$/.test(userData.phonenumber)) {
      Alert.alert('خطأ', 'رقم الهاتف يجب أن يكون 10 أرقام');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const db = getFirestore();
      const userRef = doc(db, 'user', auth.currentUser.uid);

      await setDoc(userRef, {
        ...userData,
        updatedAt: new Date()
      }, { merge: true });

      await AsyncStorage.setItem('currentUser', JSON.stringify(userData));
      Alert.alert('نجاح', 'تم حفظ البيانات بنجاح');
      navigation.navigate('Profile');
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('خطأ', 'حدث خطأ أثناء حفظ البيانات');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'تسجيل الخروج',
      'هل أنت متأكد من تسجيل الخروج؟',
      [
        {
          text: 'إلغاء',
          style: 'cancel'
        },
        {
          text: 'تسجيل الخروج',
          onPress: async () => {
            await AsyncStorage.clear();
            dispatch(deleteCurrentUser());
            navigation.navigate('Login');
          }
        }
      ]
    );
  };

  const renderInputField = (label, field, keyboardType = 'default') => (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={userData[field]}
        onChangeText={(text) => handleInputChange(field, text)}
        keyboardType={keyboardType}
        placeholder={`أدخل ${label}`}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#091E3D" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#091E3D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>تعديل الملف الشخصي</Text>
      </View>

      <View style={styles.profileImageContainer}>
        <Image
          source={{
            uri: image || userData?.image || "https://img.freepik.com/premium-vector/businessman-icon-profile-placeholder_34176-500.jpg"
          }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editImageButton} onPress={pickImage}>
          <Ionicons name="camera" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        {renderInputField('اسم المستخدم', 'username')}
        {renderInputField('البريد الإلكتروني', 'email', 'email-address')}
        {renderInputField('رقم الهاتف', 'phonenumber', 'phone-pad')}
        {renderInputField('المدينة', 'city')}
        {renderInputField('العنوان', 'address')}
        {renderInputField('الحالة', 'status')}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>حفظ التغييرات</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          <Text style={styles.logoutText}>تسجيل الخروج</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#091E3D',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#091E3D',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: '40%',
    backgroundColor: '#091E3D',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  form: {
    padding: 20,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#091E3D',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#091E3D',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#FF3B30',
    borderRadius: 8,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ProfileForm;

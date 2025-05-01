import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    ScrollView,
    StyleSheet,
    TextInput,
    FlatList,
    Dimensions,
    SafeAreaView,
    Linking,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import NavBar from '../component/NavBar';
import BottomNav from '../component/bottomNav';
import db from '../story/firebaseconfig';
import { addDoc, collection, doc, getDoc, getDocs, setDoc, Timestamp } from 'firebase/firestore';
import { UploadPhotos } from '../UploadPhotos';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { query, where } from 'firebase/firestore';

const { width } = Dimensions.get('window');

function Housing({ navigation }) {
    const [userData, setUserData] = useState(null);
    const [user, setUser] = useState(null);
    const [images, setImages] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedHouse, setSelectedHouse] = useState(null);

    const [housingData, setHousingData] = useState({
        address: '',
        description: '',
        numbed: '',
        numteu: '',
        phone: '',
        whats: '',
        price: '',
        status: 'pending',
        Id: '',
        username: '',
    });

    const [housingList, setHousingList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState({
        priceRange: '',
        rooms: '',
        beds: '',
        location: '',
        bathrooms: '',
    });

    const [bookingData, setBookingData] = useState({
        userId: '',
        houseId: '',
        checkIn: '',
        checkOut: '',
        guests: 1,
        status: 'pending',
        createdAt: null,
    });

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const userDataString = await AsyncStorage.getItem('currentUser');
                if (userDataString) {
                    const parsedUserData = JSON.parse(userDataString);
                    setUserData(parsedUserData);
                    setUser(parsedUserData);
                    setHousingData(prev => ({
                        ...prev,
                        Id: parsedUserData.UserId,
                        username: parsedUserData.username,
                    }));
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };

        loadUserData();
    }, []);

    const pickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('نعتذر، نحتاج إلى إذن الوصول إلى معرض الصور');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: false,
                quality: 1,
                allowsEditing: true,
                aspect: [4, 3]
            });

            if (!result.canceled && result.assets && result.assets[0]) {
                const newImage = {
                    uri: result.assets[0].uri,
                    type: 'image/jpeg',
                    name: 'photo.jpg'
                };
                setImages((prev) => [...prev, newImage]);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            alert('حدث خطأ أثناء اختيار الصور');
        }
    };

    const removeImage = (index) => {
        setImages((prev) => {
            const updated = [...prev];
            updated.splice(index, 1);
            return updated;
        });
    };

    const handleSubmit = async () => {
        const uploadedUrls = await UploadPhotos(images);
        try {
            await addDoc(collection(db, 'housing'), {
                ...housingData,
                Images: uploadedUrls,
                Id: user.UserId,
                username: user.username,
            });
            alert('طلبك قيد المراجعة');
            setHousingData({
                address: '',
                description: '',
                numbed: '',
                numteu: '',
                phone: '',
                whats: '',
                price: '',
                Images: [],
                status: 'pending',
                Id: user.UserId,
                username: user.username,
            });
            setImages([]);
            setShowAddModal(false);
        } catch (error) {
            console.error('خطأ أثناء الحفظ: ', error);
            alert('حدث خطأ أثناء الحفظ');
        }
    };

    const handleBookingSubmit = async () => {
        try {
            const bookingWithTimestamp = {
                ...bookingData,
                createdAt: Timestamp.now(),
            };
            await addDoc(collection(db, 'bookings'), bookingWithTimestamp);
            alert('تم إرسال طلب الحجز بنجاح!');
            setShowBookingModal(false);
            setBookingData({
                userId: '',
                houseId: '',
                checkIn: '',
                checkOut: '',
                guests: 1,
                createdAt: null,
            });
        } catch (error) {
            console.error('خطأ في الحجز:', error);
            alert('حدث خطأ أثناء الحجز');
        }
    };

    const filteredHousingList = housingList.filter((house) => {
        const matchesSearch = searchTerm
            ? house.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            house.description.toLowerCase().includes(searchTerm.toLowerCase())
            : true;

        const matchesFilters = Object.entries(activeFilters).every(([key, value]) => {
            if (!value) return true;
            switch (key) {
                case 'priceRange':
                    const [min, max] = value.split('-');
                    return house.price >= Number(min) && house.price <= Number(max);
                case 'location':
                    return house.address.includes(value);
                case 'rooms':
                    return house.numbed === value;
                case 'beds':
                    return house.numbed === value;
                case 'bathrooms':
                    return house.numteu === value;
                default:
                    return true;
            }
        });

        return matchesSearch && matchesFilters;
    });

    useEffect(() => {
        const fetchHousing = async () => {
            const querySnapshot = await getDocs(collection(db, 'housing'));
            const houses = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setHousingList(houses);
        };

        fetchHousing();
    }, []);

    const message = async (PostUserId) => {
        try {
            console.log('Starting message function with PostUserId:', PostUserId);

            const currentUser = await AsyncStorage.getItem('currentUser');
            if (!currentUser) {
                throw new Error('لم يتم العثور على بيانات المستخدم');
            }

            const currentUserData = JSON.parse(currentUser);
            if (!currentUserData || !currentUserData.UserId) {
                throw new Error('بيانات المستخدم غير صالحة');
            }

            console.log('Current user data:', currentUserData);

            // التحقق من أن المستخدم لا يحاول مراسلة نفسه
            if (currentUserData.UserId === PostUserId) {
                throw new Error('لا يمكنك مراسلة نفسك');
            }

            // إنشاء معرف المحادثة الفريد
            const messageId = currentUserData.UserId + '-' + PostUserId;
            console.log('Message ID:', messageId);

            // البحث عن بيانات السكن باستخدام معرف الناشر
            const housingCollection = collection(db, 'housing');
            const q = query(housingCollection, where('Id', '==', PostUserId));
            const querySnapshot = await getDocs(q);

            console.log('Found housing documents:', querySnapshot.size);

            if (querySnapshot.empty) {
                throw new Error('لم يتم العثور على بيانات السكن');
            }

            const housingData = querySnapshot.docs[0].data();
            console.log('Housing data:', housingData);

            // استخدام بيانات الناشر من مستند السكن
            const publisherData = {
                username: housingData.username || 'ناشر',
                image: housingData.image || null
            };

            // إنشاء أو تحديث محادثة في Firestore
            const chatRef = doc(db, 'chats', messageId);
            const chatDoc = await getDoc(chatRef);

            if (!chatDoc.exists()) {
                await setDoc(chatRef, {
                    participants: [currentUserData.UserId, PostUserId],
                    lastMessage: '',
                    lastMessageTime: new Date(),
                    users: {
                        [currentUserData.UserId]: {
                            username: currentUserData.username || 'مستخدم',
                            image: currentUserData.image || null
                        },
                        [PostUserId]: {
                            username: publisherData.username,
                            image: publisherData.image
                        }
                    }
                });
            }

            // حفظ معرف المحادثة في AsyncStorage
            await AsyncStorage.setItem('currentChatId', messageId);
            await AsyncStorage.setItem('chatRecipient', JSON.stringify({
                id: PostUserId,
                username: publisherData.username,
                image: publisherData.image
            }));

            // الانتقال إلى شاشة المحادثة
            navigation.navigate('Chats');
        } catch (error) {
            console.error('Error in message function:', error);
            alert(error.message || 'حدث خطأ أثناء محاولة بدء المحادثة');
        }
    };

    const renderHouseCard = ({ item }) => (
        item.status === 'accepted' && (
            <View style={styles.card}>
                <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                    {item.Images.map((image, index) => (
                        <Image
                            key={index}
                            source={{ uri: image }}
                            style={styles.cardImage}
                            resizeMode="cover"
                        />
                    ))}
                </ScrollView>
                <View style={styles.cardBody}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.location}>{item.address}</Text>
                        <Text style={styles.price}>{item.price} ج.م/شهر</Text>
                    </View>
                    <Text style={styles.publisher}>الناشر: {item.username}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <View style={styles.contactButtons}>
                        <TouchableOpacity
                            style={styles.contactButton}
                            onPress={() => Linking.openURL(`tel:${item.phone}`)}
                        >
                            <FontAwesome name="phone" size={20} color="#007AFF" />
                            <Text style={styles.buttonText}>مكالمه</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.contactButton}
                            onPress={() => Linking.openURL(`https://wa.me/${item.whats}`)}
                        >
                            <FontAwesome name="whatsapp" size={20} color="#25D366" />
                            <Text style={styles.buttonText}>واتساب</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.contactButton}
                            onPress={() => message(item.Id)}
                        >
                            <FontAwesome name="envelope" size={20} color="#000" />
                            <Text style={styles.buttonText}>مراسلة</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.bookButton}
                        onPress={() => {
                            setSelectedHouse(item);
                            setShowBookingModal(true);
                        }}
                    >
                        <Text style={styles.bookButtonText}>احجز الآن</Text>
                    </TouchableOpacity>
                    <View style={styles.features}>
                        <Text style={styles.feature}>
                            <FontAwesome name="bed" size={16} color="#666" /> {item.numbed}
                        </Text>
                        <Text style={styles.feature}>
                            <FontAwesome name="bath" size={16} color="#666" /> {item.numteu}
                        </Text>
                    </View>
                </View>
            </View>
        )
    );

    return (
        <View style={styles.container}>
            <NavBar navigation={navigation} />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="ابحث عن موقع..."
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                    <View style={styles.filterContainer}>
                        <Picker
                            selectedValue={activeFilters.rooms}
                            style={styles.picker}
                            onValueChange={(value) => setActiveFilters({ ...activeFilters, rooms: value })}
                        >
                            <Picker.Item label="عدد الغرف" value="" />
                            {[1, 2, 3, 4].map((num) => (
                                <Picker.Item key={num} label={num.toString()} value={num} />
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={activeFilters.beds}
                            style={styles.picker}
                            onValueChange={(value) => setActiveFilters({ ...activeFilters, beds: value })}
                        >
                            <Picker.Item label="عدد السُرُر" value="" />
                            {[1, 2, 3, 4].map((num) => (
                                <Picker.Item key={num} label={num.toString()} value={num} />
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={activeFilters.location}
                            style={styles.picker}
                            onValueChange={(value) => setActiveFilters({ ...activeFilters, location: value })}
                        >
                            <Picker.Item label="الموقع" value="" />
                            <Picker.Item label="صحاري" value="صحاري" />
                            <Picker.Item label="البركه" value="البركه" />
                            <Picker.Item label="العقاد" value="العقاد" />
                            <Picker.Item label="التأمين" value="التأمين" />
                        </Picker>
                    </View>
                </View>

                {userData?.status === 'publisher' && (
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => setShowAddModal(true)}
                    >
                        <Text style={styles.addButtonText}>اضف سكن</Text>
                    </TouchableOpacity>
                )}

                <FlatList
                    data={filteredHousingList}
                    renderItem={renderHouseCard}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                />

                <Modal visible={showAddModal} animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>إضافة سكن جديد</Text>
                            <TouchableOpacity onPress={() => setShowAddModal(false)}>
                                <FontAwesome name="times" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={styles.modalContent}>
                            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                                <Text style={styles.imagePickerText}>اختر الصور</Text>
                            </TouchableOpacity>
                            {images.length > 0 && (
                                <ScrollView horizontal style={styles.imagePreview}>
                                    {images.map((img, index) => (
                                        <View key={index} style={styles.imageWrapper}>
                                            <Image source={{ uri: img.uri }} style={styles.previewImage} />
                                            <TouchableOpacity
                                                style={styles.removeImage}
                                                onPress={() => removeImage(index)}
                                            >
                                                <FontAwesome name="times" size={16} color="#fff" />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </ScrollView>
                            )}
                            <TextInput
                                style={styles.input}
                                placeholder="السعر"
                                value={housingData.price}
                                onChangeText={(text) => setHousingData({ ...housingData, price: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="العنوان"
                                value={housingData.address}
                                onChangeText={(text) => setHousingData({ ...housingData, address: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="الوصف"
                                value={housingData.description}
                                onChangeText={(text) => setHousingData({ ...housingData, description: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="عدد السراير"
                                value={housingData.numbed}
                                onChangeText={(text) => setHousingData({ ...housingData, numbed: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="عدد الحمامات"
                                value={housingData.numteu}
                                onChangeText={(text) => setHousingData({ ...housingData, numteu: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="رقم الواتس"
                                value={housingData.whats}
                                onChangeText={(text) => setHousingData({ ...housingData, whats: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="رقم الهاتف"
                                value={housingData.phone}
                                onChangeText={(text) => setHousingData({ ...housingData, phone: text })}
                            />
                            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                                <Text style={styles.submitButtonText}>حفظ التغييرات</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </Modal>

                <Modal visible={showBookingModal} animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>حجز السكن</Text>
                            <TouchableOpacity onPress={() => setShowBookingModal(false)}>
                                <FontAwesome name="times" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalContent}>
                            <TextInput
                                style={styles.input}
                                placeholder="تاريخ الوصول"
                                value={bookingData.checkIn}
                                onChangeText={(text) => setBookingData({ ...bookingData, checkIn: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="تاريخ المغادرة"
                                value={bookingData.checkOut}
                                onChangeText={(text) => setBookingData({ ...bookingData, checkOut: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="عدد الضيوف"
                                value={bookingData.guests.toString()}
                                onChangeText={(text) => setBookingData({ ...bookingData, guests: parseInt(text) })}
                                keyboardType="numeric"
                            />
                            <TouchableOpacity style={styles.submitButton} onPress={handleBookingSubmit}>
                                <Text style={styles.submitButtonText}>تأكيد الحجز</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
            <BottomNav navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    safeArea: {
        flex: 1,
        marginBottom: 70,
    },
    searchContainer: {
        padding: 15,
        backgroundColor: '#fff',
    },
    searchInput: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 25,
        paddingHorizontal: 20,
        marginBottom: 15,
        textAlign: 'right',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    picker: {
        width: '30%',
        height: 50,
    },
    addButton: {
        backgroundColor: '#0A2784FF',
        padding: 15,
        margin: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    listContainer: {
        padding: 15,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardImage: {
        width: width - 30,
        height: 200,
    },
    cardBody: {
        padding: 15,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    location: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0A2784FF',
    },
    publisher: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: '#333',
        marginBottom: 15,
    },
    contactButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
    },
    buttonText: {
        marginRight: 5,
        fontSize: 14,
    },
    bookButton: {
        backgroundColor: '#FFD700',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    bookButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    features: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    feature: {
        fontSize: 14,
        color: '#666',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalContent: {
        padding: 15,
    },
    imagePicker: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 15,
    },
    imagePickerText: {
        fontSize: 16,
        color: '#666',
    },
    imagePreview: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    imageWrapper: {
        marginRight: 10,
        position: 'relative',
    },
    previewImage: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    removeImage: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        paddingHorizontal: 15,
        marginBottom: 15,
        textAlign: 'right',
    },
    submitButton: {
        backgroundColor: '#0A2784FF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Housing; 
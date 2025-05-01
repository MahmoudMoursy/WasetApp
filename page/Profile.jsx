import React, { useEffect, useState } from "react";
import { View, Image, Text, TextInput, TouchableOpacity, Button, Modal, Alert, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { deleteCurrentUser } from "../Redux/CurrentUser";
import { collection, query, where, getDocs, deleteDoc, updateDoc, doc, orderBy, limit, onSnapshot } from "firebase/firestore";
import db from "../story/firebaseconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosApi } from "../axios/axios";
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import NavBar from '../component/NavBar';
import BottomNav from '../component/bottomNav';

const Profile = ({ navigation }) => {
    const [isActive, setIsActive] = useState(false);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingField, setEditingField] = useState(null);
    const [userData, setUserData] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [fieldValues, setFieldValues] = useState({
        email: '',
        phonenumber: '',
        city: '',
        address: '',
        status: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [PhotoUrl, setPhotoUrl] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        address: '',
        bio: ''
    });
    const [notifications, setNotifications] = useState([]);
    const [loadingNotifications, setLoadingNotifications] = useState(true);

    const dispatch = useDispatch();
    const nav = useNavigation();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUser = await AsyncStorage.getItem("currentUser");
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    setUserData(parsedUser);
                    setFieldValues({
                        email: parsedUser.email || '',
                        phonenumber: parsedUser.phonenumber || '',
                        city: parsedUser.city || '',
                        address: parsedUser.address || '',
                        status: parsedUser.status || ''
                    });
                    setPhotoUrl(parsedUser.PhotoUrl);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        if (userData && userData.status === "publisher") {
            fetchPosts();
        }
    }, [userData]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                if (!userData?.UserId) {
                    console.log("User ID is not available for notifications");
                    return;
                }

                const q = query(
                    collection(db, "notifications"),
                    where("userId", "==", userData.UserId),
                    limit(5)
                );

                const unsubscribe = onSnapshot(q, (snapshot) => {
                    const notificationsList = [];
                    snapshot.forEach((doc) => {
                        notificationsList.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });
                    // Sort notifications by timestamp after fetching
                    notificationsList.sort((a, b) => {
                        if (!a.timestamp || !b.timestamp) return 0;
                        return b.timestamp.toDate() - a.timestamp.toDate();
                    });
                    setNotifications(notificationsList);
                    setLoadingNotifications(false);
                });

                return () => unsubscribe();
            } catch (error) {
                console.error("Error fetching notifications:", error);
                setLoadingNotifications(false);
            }
        };

        fetchNotifications();
    }, [userData?.UserId]);

    useEffect(() => {
        if (userData?.UserId && userData.status === "publisher") {
            fetchPosts();
        }
    }, [userData?.UserId, userData?.status]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            if (!userData?.UserId) {
                console.log("User ID is not available yet");
                return;
            }

            const q = query(collection(db, "housing"), where("Id", "==", userData.UserId));
            const querySnapshot = await getDocs(q);
            const postsData = [];
            querySnapshot.forEach((doc) => {
                postsData.push({ id: doc.id, ...doc.data() });
            });
            setPosts(postsData);
        } catch (error) {
            console.error("Error fetching posts: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("currentUser");
            dispatch(deleteCurrentUser());
            nav.navigate('/');
        } catch (error) {
            console.error("Error clearing user data:", error);
        }
    };

    const handleSave = async (field) => {
        try {
            const q = query(collection(db, "user"), where("UserId", "==", userData?.UserId));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const userDocRef = doc(db, "user", querySnapshot.docs[0].id);
                await updateDoc(userDocRef, { [field]: fieldValues[field] });
                setUserData({ ...userData, [field]: fieldValues[field] });
                await AsyncStorage.setItem("currentUser", JSON.stringify({ ...userData, [field]: fieldValues[field] }));
                setEditingField(null);
            }
        } catch (error) {
            console.error("Error updating field:", error);
        }
    };

    const deletePost = async (id) => {
        Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Yes", onPress: async () => {
                    try {
                        await deleteDoc(doc(db, "housing", id));
                        setPosts(posts.filter(post => post.id !== id));
                        console.log("Post deleted successfully!");
                    } catch (error) {
                        console.error("Error deleting post:", error);
                    }
                }
            }
        ]);
    };

    const handleToggle = () => {
        setIsActive(!isActive);
    };

    const pickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('خطأ', 'نحتاج إلى إذن للوصول إلى معرض الصور');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
            });

            if (!result.canceled && result.assets && result.assets[0]) {
                setPhotoUrl(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error picking image:", error);
            Alert.alert("خطأ", "حدث خطأ أثناء اختيار الصورة");
        }
    };

    const handleUpdateProfile = async () => {
        if (!userData?.UserId) return;

        try {
            const q = query(collection(db, "user"), where("UserId", "==", userData.UserId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                let updatedData = { ...formData };

                // Handle image upload if a new image was selected
                if (PhotoUrl && PhotoUrl !== userData.PhotoUrl) {
                    try {
                        const formData = new FormData();
                        formData.append('file', {
                            uri: PhotoUrl,
                            type: 'image/jpeg',
                            name: 'photo.jpg'
                        });
                        formData.append('upload_preset', 'Abdalla');
                        formData.append('cloud_name', 'dfievnowq');

                        const response = await axiosApi.post(
                            'https://api.cloudinary.com/v1_1/dfievnowq/image/upload',
                            formData,
                            {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                }
                            }
                        );

                        if (response.data && response.data.secure_url) {
                            updatedData.PhotoUrl = response.data.secure_url;
                        }
                    } catch (error) {
                        console.error("Error uploading image:", error);
                        Alert.alert("خطأ", "حدث خطأ أثناء رفع الصورة");
                        return;
                    }
                }

                await updateDoc(doc(db, "user", userDoc.id), updatedData);

                const updatedUser = { ...userData, ...updatedData };
                await AsyncStorage.setItem("currentUser", JSON.stringify(updatedUser));
                setUserData(updatedUser);

                Alert.alert("نجاح", "تم تحديث الملف الشخصي بنجاح");
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            Alert.alert("خطأ", "حدث خطأ أثناء تحديث الملف الشخصي");
        }
    };

    const formatTimeAgo = (timestamp) => {
        if (!timestamp) return '';
        const now = new Date();
        const notificationDate = timestamp.toDate();
        const diffInSeconds = Math.floor((now - notificationDate) / 1000);

        if (diffInSeconds < 60) return 'الآن';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} دقيقة`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ساعة`;
        return `${Math.floor(diffInSeconds / 86400)} يوم`;
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'payment':
                return { name: 'cash', color: '#4CAF50' };
            case 'status':
                return { name: 'time', color: '#2196F3' };
            case 'message':
                return { name: 'chatbubble', color: '#FF9800' };
            default:
                return { name: 'notifications', color: '#0A2784FF' };
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0A2784FF" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <NavBar />
            <ScrollView style={styles.scrollView}>
                <View style={styles.header}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={{
                                uri: PhotoUrl || userData?.PhotoUrl || "https://img.freepik.com/premium-vector/businessman-icon-profile-placeholder_34176-500.jpg"
                            }}
                            style={styles.profileImage}
                            onError={(e) => {
                                console.log('Image loading error:', e.nativeEvent.error);
                                setPhotoUrl(null);
                            }}
                        />
                        {isEditing && (
                            <TouchableOpacity
                                style={styles.editImageButton}
                                onPress={pickImage}
                            >
                                <Text style={styles.editImageText}>+</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <Text style={styles.username}>{userData?.username || 'مستخدم'}</Text>
                    <Text style={styles.email}>{userData?.email || ''}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>معلومات الحساب</Text>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoItem}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="person" size={24} color="#0A2784FF" />
                            </View>
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>اسم المستخدم</Text>
                                {isEditing ? (
                                    <TextInput
                                        style={styles.input}
                                        value={formData.username}
                                        onChangeText={(text) => setFormData({ ...formData, username: text })}
                                        placeholder="أدخل اسم المستخدم"
                                    />
                                ) : (
                                    <Text style={styles.infoValue}>{userData?.username || 'غير محدد'}</Text>
                                )}
                            </View>
                        </View>

                        <View style={styles.infoItem}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="mail" size={24} color="#0A2784FF" />
                            </View>
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>البريد الإلكتروني</Text>
                                {isEditing ? (
                                    <TextInput
                                        style={styles.input}
                                        value={formData.email}
                                        onChangeText={(text) => setFormData({ ...formData, email: text })}
                                        placeholder="أدخل البريد الإلكتروني"
                                        keyboardType="email-address"
                                    />
                                ) : (
                                    <Text style={styles.infoValue}>{userData?.email || 'غير محدد'}</Text>
                                )}
                            </View>
                        </View>

                        <View style={styles.infoItem}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="call" size={24} color="#0A2784FF" />
                            </View>
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>رقم الهاتف</Text>
                                {isEditing ? (
                                    <TextInput
                                        style={styles.input}
                                        value={formData.phone}
                                        onChangeText={(text) => setFormData({ ...formData, phone: text })}
                                        placeholder="أدخل رقم الهاتف"
                                        keyboardType="phone-pad"
                                    />
                                ) : (
                                    <Text style={styles.infoValue}>{userData?.phone || 'غير محدد'}</Text>
                                )}
                            </View>
                        </View>

                        <View style={styles.infoItem}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="location" size={24} color="#0A2784FF" />
                            </View>
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>العنوان</Text>
                                {isEditing ? (
                                    <TextInput
                                        style={styles.input}
                                        value={formData.address}
                                        onChangeText={(text) => setFormData({ ...formData, address: text })}
                                        placeholder="أدخل العنوان"
                                    />
                                ) : (
                                    <Text style={styles.infoValue}>{userData?.address || 'غير محدد'}</Text>
                                )}
                            </View>
                        </View>

                        <View style={styles.infoItem}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="document-text" size={24} color="#0A2784FF" />
                            </View>
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>نبذة عني</Text>
                                {isEditing ? (
                                    <TextInput
                                        style={[styles.input, styles.bioInput]}
                                        value={formData.bio}
                                        onChangeText={(text) => setFormData({ ...formData, bio: text })}
                                        placeholder="أدخل نبذة عنك"
                                        multiline
                                        numberOfLines={3}
                                    />
                                ) : (
                                    <Text style={styles.infoValue}>{userData?.bio || 'غير محدد'}</Text>
                                )}
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.actionsContainer}>
                    {isEditing ? (
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleUpdateProfile}
                        >
                            <Text style={styles.saveButtonText}>حفظ التغييرات</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => setIsEditing(true)}
                        >
                            <Ionicons name="create" size={24} color="#fff" />
                            <Text style={styles.editButtonText}>تعديل الملف الشخصي</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {userData?.status === "publisher" && (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>الإعلانات المنشورة</Text>
                            <TouchableOpacity
                                style={styles.addButton}
                                onPress={() => navigation.navigate('Housing')}
                            >
                                <Ionicons name="add-circle" size={24} color="#fff" />
                                <Text style={styles.addButtonText}>إضافة إعلان</Text>
                            </TouchableOpacity>
                        </View>
                        {loading ? (
                            <ActivityIndicator size="large" color="#0A2784FF" style={styles.loadingIndicator} />
                        ) : posts.length === 0 ? (
                            <View style={styles.emptyState}>
                                <Ionicons name="home" size={48} color="#ccc" />
                                <Text style={styles.emptyStateText}>لا توجد إعلانات منشورة</Text>
                            </View>
                        ) : (
                            <View style={styles.postsList}>
                                {posts.map((post, index) => (
                                    <View key={post.id} style={styles.postItem}>
                                        <View style={styles.postHeader}>
                                            <Text style={styles.postNumber}>الإعلان #{index + 1}</Text>
                                            <TouchableOpacity
                                                style={styles.deleteButton}
                                                onPress={() => deletePost(post.id)}
                                            >
                                                <Ionicons name="trash" size={20} color="#FF3B30" />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={styles.postDetails}>
                                            <View style={styles.detailRow}>
                                                <Ionicons name="bed" size={20} color="#0A2784FF" />
                                                <Text style={styles.detailText}>عدد السراير: {post.numbed}</Text>
                                            </View>
                                            <View style={styles.detailRow}>
                                                <Ionicons name="water" size={20} color="#0A2784FF" />
                                                <Text style={styles.detailText}>عدد الحمامات: {post.numteu}</Text>
                                            </View>
                                            <View style={styles.detailRow}>
                                                <Ionicons name="call" size={20} color="#0A2784FF" />
                                                <Text style={styles.detailText}>رقم الهاتف: {post.phone}</Text>
                                            </View>
                                            <View style={styles.detailRow}>
                                                <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
                                                <Text style={styles.detailText}>رقم الواتس: {post.whats}</Text>
                                            </View>
                                            <View style={styles.detailRow}>
                                                <Ionicons name="location" size={20} color="#0A2784FF" />
                                                <Text style={styles.detailText}>العنوان: {post.address}</Text>
                                            </View>
                                            <View style={styles.detailRow}>
                                                <Ionicons name="pricetag" size={20} color="#0A2784FF" />
                                                <Text style={styles.detailText}>السعر: {post.price} جنيه مصري</Text>
                                            </View>
                                        </View>

                                        <View style={styles.postDescription}>
                                            <Text style={styles.descriptionLabel}>الوصف:</Text>
                                            <Text style={styles.descriptionText}>{post.description}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                )}

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>المعاملات الأخيرة</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewAllText}>عرض الكل</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.transactionsList}>
                        <View style={styles.transactionItem}>
                            <View style={styles.transactionIcon}>
                                <Ionicons name="cash" size={24} color="#4CAF50" />
                            </View>
                            <View style={styles.transactionInfo}>
                                <Text style={styles.transactionTitle}>تحويل مالي</Text>
                                <Text style={styles.transactionDate}>2024/03/15</Text>
                            </View>
                            <Text style={styles.transactionAmount}>1000 جنيه مصري</Text>
                        </View>
                        <View style={styles.transactionItem}>
                            <View style={styles.transactionIcon}>
                                <Ionicons name="cube" size={24} color="#2196F3" />
                            </View>
                            <View style={styles.transactionInfo}>
                                <Text style={styles.transactionTitle}>شحن طرد</Text>
                                <Text style={styles.transactionDate}>2024/03/10</Text>
                            </View>
                            <Text style={styles.transactionAmount}>5 كجم</Text>
                        </View>
                        <View style={styles.transactionItem}>
                            <View style={styles.transactionIcon}>
                                <Ionicons name="document-text" size={24} color="#FF9800" />
                            </View>
                            <View style={styles.transactionInfo}>
                                <Text style={styles.transactionTitle}>توثيق مستندات</Text>
                                <Text style={styles.transactionDate}>2024/03/05</Text>
                            </View>
                            <Text style={styles.transactionAmount}>مكتمل</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>الإشعارات</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                            <Text style={styles.viewAllText}>عرض الكل</Text>
                        </TouchableOpacity>
                    </View>
                    {loadingNotifications ? (
                        <ActivityIndicator size="large" color="#0A2784FF" style={styles.loadingIndicator} />
                    ) : notifications.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Ionicons name="notifications-off" size={48} color="#ccc" />
                            <Text style={styles.emptyStateText}>لا يوجد إشعارات الآن</Text>
                        </View>
                    ) : (
                        <View style={styles.notificationsList}>
                            {notifications.map((notification) => {
                                const icon = getNotificationIcon(notification.type);
                                return (
                                    <View key={notification.id} style={styles.notificationItem}>
                                        <View style={[styles.notificationIcon, { backgroundColor: `${icon.color}20` }]}>
                                            <Ionicons name={icon.name} size={24} color={icon.color} />
                                        </View>
                                        <View style={styles.notificationContent}>
                                            <Text style={styles.notificationText}>{notification.message}</Text>
                                            <Text style={styles.notificationTime}>
                                                {formatTimeAgo(notification.timestamp)}
                                            </Text>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>إعدادات الحساب</Text>
                    <View style={styles.settingsList}>
                        <View style={styles.settingItem}>
                            <View style={styles.settingInfo}>
                                <Ionicons name="notifications" size={24} color="#0A2784FF" />
                                <Text style={styles.settingLabel}>تفعيل إشعارات الموقع</Text>
                            </View>
                            <TouchableOpacity
                                onPress={handleToggle}
                                style={[styles.toggle, isActive ? styles.toggleActive : null]}
                            />
                        </View>
                        <View style={styles.settingItem}>
                            <View style={styles.settingInfo}>
                                <Ionicons name="language" size={24} color="#0A2784FF" />
                                <Text style={styles.settingLabel}>اللغة</Text>
                            </View>
                            <Text style={styles.settingValue}>العربية</Text>
                        </View>
                        <View style={styles.settingItem}>
                            <View style={styles.settingInfo}>
                                <Ionicons name="moon" size={24} color="#0A2784FF" />
                                <Text style={styles.settingLabel}>الوضع الليلي</Text>
                            </View>
                            <TouchableOpacity style={[styles.toggle]}>
                                <View style={[styles.toggleCircle]} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Ionicons name="log-out" size={24} color="#FF3B30" />
                    <Text style={styles.logoutText}>تسجيل الخروج</Text>
                </TouchableOpacity>
            </ScrollView>
            <BottomNav navigation={navigation} activePage="Profile" />
        </SafeAreaView>
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
    scrollView: {
        flex: 1,
        paddingBottom: 100,
    },
    header: {
        alignItems: 'center',
        padding: 25,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginBottom: 20,
    },
    profileImageContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 3,
        borderColor: '#0A2784FF',
    },
    editImageButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#0A2784FF',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    editImageText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        color: '#666',
    },
    section: {
        backgroundColor: '#fff',
        marginTop: 20,
        padding: 25,
        borderRadius: 15,
        marginHorizontal: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0A2784FF',
        marginBottom: 20,
    },
    infoContainer: {
        gap: 15,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginBottom: 5,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(10, 39, 132, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    infoValue: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#f9f9f9',
    },
    bioInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    actionsContainer: {
        padding: 25,
        marginBottom: 30,
        marginTop: 10,
    },
    editButton: {
        flexDirection: 'row',
        backgroundColor: '#0A2784FF',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 12,
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    infoSection: {
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#ecf0f1',
        paddingTop: 20,
    },
    tableContainer: {
        marginTop: 10,
    },
    tableRow: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        flexDirection: 'column',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: '#dcdde1',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    tableItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    deleteButton: {
        color: '#ff3b30',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 8,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    viewAllText: {
        color: '#0A2784FF',
        fontSize: 14,
        fontWeight: '500',
    },
    transactionsList: {
        gap: 15,
    },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
    },
    transactionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    transactionInfo: {
        flex: 1,
    },
    transactionTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 4,
    },
    transactionDate: {
        fontSize: 14,
        color: '#666',
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0A2784FF',
    },
    notificationsList: {
        gap: 15,
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
    },
    notificationIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    notificationContent: {
        flex: 1,
    },
    notificationText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 4,
    },
    notificationTime: {
        fontSize: 14,
        color: '#666',
    },
    settingsList: {
        gap: 20,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    settingInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingLabel: {
        fontSize: 16,
        color: '#333',
        marginLeft: 15,
    },
    settingValue: {
        fontSize: 16,
        color: '#666',
    },
    toggle: {
        width: 50,
        height: 28,
        borderRadius: 30,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        paddingHorizontal: 2,
    },
    toggleActive: {
        backgroundColor: '#4CAF50',
    },
    toggleCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#fff',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginHorizontal: 15,
        marginBottom: 110,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#FF3B30',
    },
    logoutText: {
        color: '#FF3B30',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    loadingIndicator: {
        marginVertical: 20,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#666',
        marginTop: 10,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0A2784FF',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    postsList: {
        gap: 15,
    },
    postItem: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        borderWidth: 1,
        borderColor: '#eee',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    postNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0A2784FF',
    },
    postDetails: {
        gap: 10,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        fontSize: 14,
        color: '#333',
        marginLeft: 10,
    },
    postDescription: {
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    descriptionLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#0A2784FF',
        marginBottom: 5,
    },
    descriptionText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
});

export default Profile;

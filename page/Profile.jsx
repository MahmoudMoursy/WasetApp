import React, { useEffect, useState } from "react";
import { View, Image, Text, TextInput, TouchableOpacity, Button, Modal, Alert, StyleSheet, ScrollView } from "react-native"; import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { deleteCurrentUser } from "../Redux/CurrentUser";
import { collection, query, where, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import db from "../story/firebaseconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosApi } from "../axios/axios";
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
    const [isActive, setIsActive] = useState(false);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingField, setEditingField] = useState(null);
    const [userData, setUserData] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null)
    const [fieldValues, setFieldValues] = useState({
        email: '',
        phonenumber: '',
        city: '',
        address: '',
        status: ''
    });

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
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);


    useEffect(() => {
        if (userData && userData.status === "publisher") {
            fetchPosts();
        }
    }, [userData]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "housing"), where("Id", "==", userData?.UserId));
            const querySnapshot = await getDocs(q);
            const postsData = [];
            querySnapshot.forEach((doc) => {
                postsData.push({ id: doc.id, ...doc.data() });
            });
            setPosts(postsData);
        } catch (error) {
            console.error("Error fetching posts: ", error);
        }
        setLoading(false);
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
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            });

            if (!result.canceled) {
                const imageUri = result.assets[0].uri;
                setImagePreview(imageUri);

                const fileName = imageUri.split('/').pop();
                const fileType = fileName.split('.').pop();

                const imageData = new FormData();
                imageData.append("file", {
                    uri: imageUri,
                    name: fileName,
                    type: `image/${fileType}`,
                });
                imageData.append("upload_preset", "waset_app"); 
                imageData.append("cloud_name", "dppa1o6y7");   

                try {
                    const response = await axiosApi.post("", imageData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });

                    const imageUrl = response.data.secure_url;
                    console.log("Image uploaded successfully:", imageUrl);

                    
                    const q = query(collection(db, "user"), where("UserId", "==", userData?.UserId));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        const userDocRef = doc(db, "user", querySnapshot.docs[0].id);
                        await updateDoc(userDocRef, { image: imageUrl });

                        
                        const updatedUser = { ...userData, image: imageUrl };
                        setUserData(updatedUser);
                        await AsyncStorage.setItem("currentUser", JSON.stringify(updatedUser));
                    } else {
                        Alert.alert('Error', 'User document not found');
                    }
                } catch (error) {
                    Alert.alert('Error', 'Failed to upload image');
                    console.error("Image upload error:", error);
                }
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to pick image');
            console.error("Image picker error:", error);
        }
    };

    return (
        <>
            <ScrollView style={styles.profileContainer}>
                <View style={styles.profileCard}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{
                                uri: userData?.image || "https://img.freepik.com/premium-vector/businessman-icon-profile-placeholder_34176-500.jpg",
                            }}
                            style={styles.profileImage}
                        />

                        <TouchableOpacity onPress={pickImage} style={styles.editIcon}>
                            <Text style={styles.editIconText}>➕</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.userName}>{userData.username || "اسم المستخدم"}</Text>
                    <Text style={styles.userId}>الجامعة: <Text>{userData.university || "الجامعة غير متاحة"}</Text></Text>
                    <Text style={styles.infoItem} >{userData.bio || "نبذة عن المستخدم"}                    </Text>
                    <View style={styles.infoSection}>
                        <Text style={styles.sectionTitle}>المعلومات الشخصية</Text>
                        {["email", "phonenumber", "city", "address", "status"].map((fieldKey) => (
                            <View style={styles.infoItem} key={fieldKey}>
                                <Text style={styles.infoLabel}>
                                    {fieldKey === "email" ? "البريد الإلكتروني:" :
                                        fieldKey === "phonenumber" ? "رقم الهاتف:" :
                                            fieldKey === "city" ? "المدينة:" :
                                                fieldKey === "address" ? "العنوان:" :
                                                    "الحالة:"}
                                </Text>
                                {editingField === fieldKey ? (
                                    <>
                                        <TextInput
                                            value={fieldValues[fieldKey]}
                                            onChangeText={(text) => setFieldValues({ ...fieldValues, [fieldKey]: text })}
                                            style={styles.input}
                                        />
                                        <Button title="حفظ" onPress={() => handleSave(fieldKey)} />
                                    </>
                                ) : (
                                    <>
                                        <Text>{fieldValues[fieldKey]}</Text>
                                        <TouchableOpacity onPress={() => setEditingField(fieldKey)}>
                                            <Text style={styles.editButton}>تعديل</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                                <View>

                                </View>
                            </View>

                        ))}
                    </View>

                    {userData?.status === "publisher" && (
                        <View style={styles.infoSection}>
                            <Text style={styles.sectionTitle}>الإعلانات المنشورة</Text>
                            {loading && <Text>جاري التحميل...</Text>}
                            <View style={styles.tableContainer}>
                                {posts.map((post, index) => (
                                    <View key={post.id} style={styles.tableRow}>
                                        <View style={styles.tableItem}>
                                            <Text style={styles.label}>رقم الإعلان:</Text>
                                            <Text>{index + 1}</Text>
                                        </View>
                                        <View style={styles.tableItem}>
                                            <Text style={styles.label}>الوصف:</Text>
                                            <Text>{post.description}</Text>
                                        </View>
                                        <View style={styles.tableItem}>
                                            <Text style={styles.label}>عدد السراير:</Text>
                                            <Text>{post.numbed}</Text>
                                        </View>
                                        <View style={styles.tableItem}>
                                            <Text style={styles.label}>عدد الحمامات:</Text>
                                            <Text>{post.numteu}</Text>
                                        </View>
                                        <View style={styles.tableItem}>
                                            <Text style={styles.label}>رقم الهاتف:</Text>
                                            <Text>{post.phone}</Text>
                                        </View>
                                        <View style={styles.tableItem}>
                                            <Text style={styles.label}>رقم الواتس:</Text>
                                            <Text>{post.whats}</Text>
                                        </View>
                                        <View style={styles.tableItem}>
                                            <Text style={styles.label}>العنوان:</Text>
                                            <Text>{post.address}</Text>
                                        </View>
                                        <View style={styles.tableItem}>
                                            <Text style={styles.label}> السعر:</Text>
                                            <Text>{post.price}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => deletePost(post.id)}>
                                            <Text style={styles.deleteButton}>حذف</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    <View style={styles.infoSection}>
                        <Text style={styles.sectionTitle}>المعاملات الأخيرة</Text>
                        <Text>2024/03/15: تحويل مالي - 1000 جنيه مصري</Text>
                        <Text>2024/03/10: شحن طرد - 5 كجم</Text>
                        <Text>2024/03/05: توثيق مستندات</Text>
                    </View>

                    <View style={styles.infoSection}>
                        <Text style={styles.sectionTitle}>الإشعارات</Text>
                        <View style={styles.notification}>
                            <Text>تم تأكيد الدفع - 1000 جنيه مصري مقابل تأجير شقة</Text>
                        </View>
                        <View style={styles.notification}>
                            <Text>تحديث حالة الخدمة - قيد التنفيذ</Text>
                        </View>
                    </View>

                    <View style={styles.infoSection}>
                        <Text style={styles.sectionTitle}>إعدادات الحساب</Text>
                        <View style={styles.settingItem}>
                            <Text style={styles.settingLabel}>تفعيل إشعارات الموقع</Text>
                            <TouchableOpacity onPress={handleToggle} style={[styles.toggle, isActive ? styles.toggleActive : null]} />
                        </View>
                    </View>

                    <Button title="تسجيل الخروج" onPress={handleLogout} />
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        backgroundColor: '#e9ecef',
        direction: "rtl"
    },
    profileCard: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 16,
        margin: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6,
    },
    userName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: 10,
    },
    userId: {
        fontSize: 16,
        color: '#7f8c8d',
        textAlign: 'center',
        marginBottom: 20,
    },
    infoSection: {
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#ecf0f1',
        paddingTop: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#34495e',
        marginBottom: 15,
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
    },
    infoLabel: {
        fontSize: 15,
        fontWeight: '500',
        color: '#2c3e50',
        width: '35%',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#bdc3c7',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
        marginRight: 10,
    },
    editButton: {
        color: '#2980b9',
        fontWeight: '600',
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
    notification: {
        backgroundColor: '#f1f2f6',
        padding: 12,
        borderRadius: 10,
        marginBottom: 8,
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 20,
        position: 'relative',
    },
    
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: '#ccc',
    },
    
    editIcon: {
        position: 'absolute',
        bottom: 10,
        right: (1 - 200) / 2 * -1 + 10,   
        backgroundColor: '#007BFF',
        height: 30,
        width: 30,
        borderRadius: 18,
        borderWidth: 2,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
    },
    
    editIconText: {
        fontSize: 10,
        color: '#fff',
        fontWeight: 'bold',
    }
,    

    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
    },
    settingLabel: {
        fontSize: 16,
        color: '#2d3436',
    },
    toggle: {
        width: 50,
        height: 28,
        borderRadius: 30,
        backgroundColor: '#dcdde1',
    },
    toggleActive: {
        backgroundColor: '#2ecc71',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 20,
    },
});
;

export default Profile;

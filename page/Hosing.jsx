import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { addDoc, collection, getDocs } from "firebase/firestore";
import { Picker } from '@react-native-picker/picker';
import db from "../story/firebaseconfig";
import Icon from 'react-native-vector-icons/FontAwesome';

function Housing() {
    const [housingData, setHousingData] = useState({
        address: "", description: "", numbed: "", numteu: "", phone: "", whats: "", price: "",
    });

    const [housingList, setHousingList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const [activeFilters, setActiveFilters] = useState({
        نطاق_السعر: "", الغرف: "", الأسرة: "", الموقع: "", الحمامات: ""
    });

    const handleChange = (name, value) => {
        setHousingData({ ...housingData, [name]: value });
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    useEffect(() => {
        const fetchHousing = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "housing"));
                const houses = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                console.log("المساكن المسترجعة:", houses);
                setHousingList(houses);
            } catch (error) {
                console.error("خطأ أثناء جلب البيانات:", error.message);
            }
        };

        fetchHousing();
    }, []);

    const handleSubmit = async () => {
        try {
            console.log("إضافة بيانات السكن:", housingData);
            await addDoc(collection(db, "housing"), housingData);
            alert("تمت إضافة السكن بنجاح!");
            setHousingData({
                address: "", description: "", numbed: "", numteu: "", phone: "", whats: "", price: "",
            });
            setModalVisible(false);
        } catch (error) {
            console.error("خطأ أثناء الحفظ: ", error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>البحث عن سكن</Text>

            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="ابحث عن موقع..."
                    style={styles.inputt}
                    value={searchTerm}
                    onChangeText={handleSearch}
                />
                <Button title="بحث" onPress={() => { }} />
                    
            </View>
            <TouchableOpacity style={styles.add} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>إضافة سكن جديد</Text>
            </TouchableOpacity>

            {housingList.map((house) => (
                <View key={house.id} style={styles.card}>
                    <Text style={styles.title}>{house.address}</Text>
                    <Text style={styles.price}>{house.price} ج.م/شهر</Text>
                    <Text style={styles.description}>{house.description}</Text>

                    <View style={styles.iconRow}>
                        <Icon name="bed" size={20} color="#2c3e50" />
                        <Text>{house.numbed} سرير</Text>
                    </View>

                    <View style={styles.iconRow}>
                        <Icon name="bath" size={20} color="#2c3e50" />
                        <Text>{house.numteu} حمام</Text>
                    </View>

                    <View style={styles.iconRow}>
                        <Icon name="phone" size={20} color="#2c3e50" />
                        <Text>{house.phone}</Text>
                    </View>

                    <View style={styles.iconRow}>
                        <Icon name="whatsapp" size={20} color="#25D366" />
                        <Text>{house.whats}</Text>
                    </View>

                    <TouchableOpacity style={styles.buttonContainer} onPress={() => { }}>
                        <Text style={styles.buttonText}>احجز الآن</Text>
                    </TouchableOpacity>
                </View>
            ))}


            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>إضافة سكن جديد</Text>

                        <TextInput placeholder="السعر" style={styles.input} value={housingData.price} onChangeText={(value) => handleChange('price', value)} keyboardType="numeric" />
                        <TextInput placeholder="العنوان" style={styles.input} value={housingData.address} onChangeText={(value) => handleChange('address', value)} />
                        <TextInput placeholder="الوصف" style={styles.input} value={housingData.description} onChangeText={(value) => handleChange('description', value)} />
                        <TextInput placeholder="عدد السراير" style={styles.input} value={housingData.numbed} onChangeText={(value) => handleChange('numbed', value)} keyboardType="numeric" />
                        <TextInput placeholder="عدد الحمامات" style={styles.input} value={housingData.numteu} onChangeText={(value) => handleChange('numteu', value)} keyboardType="numeric" />
                        <TextInput placeholder="رقم الهاتف" style={styles.input} value={housingData.phone} onChangeText={(value) => handleChange('phone', value)} keyboardType="phone-pad" />
                        <TextInput placeholder="رقم الواتس" style={styles.input} value={housingData.whats} onChangeText={(value) => handleChange('whats', value)} keyboardType="phone-pad" />

                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonTextt}>إغلاق</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>حفظ التغييرات</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

export default Housing;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "#f5f5f5",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
    },
    searchContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    inputt: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        textAlign: "right",
        flex: 1,
        color: "black",
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        textAlign: "right",
        backgroundColor: "#f5f5f5",
        color: "black",
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        padding: 15,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        color: "#2c3e50",
        fontWeight: "bold",
    },
    description: {
        fontSize: 14,
        color: "#666",
        marginBottom: 10,
    },
    add: {
        backgroundColor: "#2c3e50",
        padding: 15,
        width: "40%",
        borderRadius: 25,
        alignItems: "center",
        marginTop: 5,
        marginBottom: 20,
      },
    
    buttonContainer: {
        backgroundColor: "#2c3e50",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonTextt: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    iconRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        width: "80%",
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    saveButton: { backgroundColor: "#007bff", padding: 12, borderRadius: 8, },
    closeButton: {
        backgroundColor: "#D00505FF",
        padding: 10,
        borderRadius: 8,
        width: "20%",
        alignItems: "center",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },

});
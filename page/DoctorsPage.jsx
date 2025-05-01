import React, { useState } from 'react';
import { View, Text, Image, FlatList, TextInput, TouchableOpacity, Modal, StyleSheet, ScrollView, Linking, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import NavBar from '../component/NavBar';
import BottomNav from '../component/bottomNav';

const DoctorsPage = ({ navigation }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const doctors = [
        {
            id: 1,
            title: 'د. وائل طه',
            image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7',
            description: 'جراحة العظام والمفاصل ',
            rating: 4.9,
            phone: '01234567893',
            whatsapp: '01234567893',
            facebook: 'https://facebook.com/dr.ahmed',
            address: 'السيل أمام المستشفى العام',
            additionalImages: [
                'https://images.unsplash.com/photo-1537368910025-700350fe46c7',
                'https://images.unsplash.com/photo-1559839734-2b71ea197ec2',
                'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d',
                'https://images.unsplash.com/photo-1516549655169-df83a0774514'
            ]
        },
        {
            id: 2,
            title: 'د. فاطمة فوزي محمد',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2',
            description: 'د. أخصائية طب الاطفال ',
            rating: 4.9,
            phone: '01234567893',
            whatsapp: '01234567893',
            facebook: 'https://facebook.com/dr.ahmed',
            address: 'شارع  الشواربي',
            additionalImages: [
                'https://images.unsplash.com/photo-1537368910025-700350fe46c7',
                'https://images.unsplash.com/photo-1559839734-2b71ea197ec2',
                'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d',
                'https://images.unsplash.com/photo-1516549655169-df83a0774514'
            ]
        },
        {
            id: 3,
            title: 'د. أحمد محمد قناوي',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d',
            description: 'أخصائي نساء وتوليد',
            rating: 4.9,
            phone: '01234567893',
            whatsapp: '01234567893',
            facebook: 'https://facebook.com/dr.ahmed',
            address: 'ميدان الصالحين أمام الضراب. مواعيد العمل: من الساعة 2:30 مساءً. الإجازة: الجمعة. سعر الكشف: 250 جنيهًا.',
            additionalImages: [
                'https://images.unsplash.com/photo-1537368910025-700350fe46c7',
                'https://images.unsplash.com/photo-1559839734-2b71ea197ec2',
                'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d',
                'https://images.unsplash.com/photo-1516549655169-df83a0774514'
            ]
        },
        {
            id: 4,
            title: 'د. إلهام صلاح',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2',
            description: 'أخصائية أمراض الجهاز الهضمي وعسر الهضم .',
            rating: 4.9,
            phone: '01234567893',
            whatsapp: '01234567893',
            facebook: 'https://facebook.com/dr.ahmed',
            address: 'عيادة القدس للجراحة والمناظير',
            additionalImages: [
                'https://images.unsplash.com/photo-1537368910025-700350fe46c7',
                'https://images.unsplash.com/photo-1559839734-2b71ea197ec2',
                'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d',
                'https://images.unsplash.com/photo-1516549655169-df83a0774514'
            ]
        },
        {
            id: 5,
            title: 'د. محجوب حمزة ',
            image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7',
            description: 'أخصائي أمراض  الباطنة',
            rating: 4.9,
            phone: '01234567893',
            whatsapp: '01234567893',
            facebook: 'https://facebook.com/dr.ahmed',
            address: 'شارع السودانين ',
            additionalImages: [
                'https://images.unsplash.com/photo-1537368910025-700350fe46c7',
                'https://images.unsplash.com/photo-1559839734-2b71ea197ec2',
                'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d',
                'https://images.unsplash.com/photo-1516549655169-df83a0774514'
            ]
        },
        {
            id: 6,
            title: 'د. مصطفي حزين  ',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d',
            description: 'دكتور أسنان ',
            rating: 4.9,
            phone: '01234567893',
            whatsapp: '01234567893',
            facebook: 'https://facebook.com/dr.ahmed',
            address: 'بوابة المحطة ',
            additionalImages: [
                'https://images.unsplash.com/photo-1537368910025-700350fe46c7',
                'https://images.unsplash.com/photo-1559839734-2b71ea197ec2',
                'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d',
                'https://images.unsplash.com/photo-1516549655169-df83a0774514'
            ]
        },
    ];

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FontAwesome key={i} name="star" size={20} color="gold" />);
            } else if (i - 0.5 <= rating) {
                stars.push(<FontAwesome key={i} name="star-half" size={20} color="gold" />);
            } else {
                stars.push(<FontAwesome key={i} name="star-o" size={20} color="gold" />);
            }
        }
        return stars;
    };

    return (
        <View style={{ flex: 1 }}>
            <NavBar navigation={navigation} />
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>الأطباء</Text>

                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="ابحث عن طبيب أو عنوان..."
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                </View>

                <FlatList
                    data={filteredDoctors}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image source={{ uri: item.image }} style={styles.cardImage} />
                            <View style={styles.cardBody}>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                <Text style={styles.cardDescription}>{item.description}</Text>
                                <View style={styles.ratingContainer}>
                                    {renderStars(item.rating)}
                                    <Text style={styles.ratingText}>{item.rating}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.detailButton}
                                    onPress={() => {
                                        setSelectedItem(item);
                                        setMainImage(item.image);
                                        setShowModal(true);
                                    }}
                                >
                                    <Text style={styles.buttonText}>عرض التفاصيل</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />

                {showModal && selectedItem && (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={showModal}
                        onRequestClose={() => setShowModal(false)}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                                    <TouchableOpacity onPress={() => setShowModal(false)}>
                                        <Text style={styles.closeButton}>X</Text>
                                    </TouchableOpacity>
                                </View>
                                <ScrollView>
                                    <Image source={{ uri: mainImage }} style={styles.modalImage} />
                                    <View style={styles.imageThumbnails}>
                                        {selectedItem.additionalImages.map((img, index) => (
                                            <TouchableOpacity key={index} onPress={() => setMainImage(img)}>
                                                <Image source={{ uri: img }} style={styles.thumbnail} />
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                    <Text style={styles.modalDescription}>{selectedItem.description}</Text>
                                    <View style={styles.ratingContainer}>
                                        {renderStars(selectedItem.rating)}
                                        <Text style={styles.ratingText}>{selectedItem.rating} / 5</Text>
                                    </View>
                                    <View style={styles.contactInfo}>
                                        <View style={styles.contactItem}>
                                            <FontAwesome name="phone" size={20} color="#007BFF" />
                                            <Text style={styles.contactText}>{selectedItem.phone}</Text>
                                        </View>
                                        <View style={styles.contactItem}>
                                            <FontAwesome name="whatsapp" size={20} color="#25D366" />
                                            <TouchableOpacity onPress={() => Linking.openURL(`https://wa.me/${selectedItem.whatsapp}`)}>
                                                <Text style={styles.contactText}>واتساب</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.contactItem}>
                                            <FontAwesome name="facebook" size={20} color="#1877F2" />
                                            <TouchableOpacity onPress={() => Linking.openURL(selectedItem.facebook)}>
                                                <Text style={styles.contactText}>فيسبوك</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.contactItem}>
                                            <FontAwesome name="map-marker" size={20} color="#FF0000" />
                                            <Text style={styles.contactText}>{selectedItem.address}</Text>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>
                )}
            </SafeAreaView>
            <BottomNav navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
        marginBottom: 70, // Add margin to account for BottomNav
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    searchContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    searchInput: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: 'white',
        textAlign: 'right',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardImage: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardBody: {
        padding: 15,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'right',
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
        textAlign: 'right',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    ratingText: {
        marginLeft: 5,
        fontSize: 14,
        color: '#666',
    },
    detailButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    closeButton: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#666',
    },
    modalImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    imageThumbnails: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15,
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 5,
        margin: 5,
    },
    modalDescription: {
        fontSize: 16,
        marginBottom: 15,
        textAlign: 'right',
    },
    contactInfo: {
        marginTop: 15,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    contactText: {
        marginRight: 10,
        fontSize: 16,
    },
});

export default DoctorsPage; 
import React, { useState } from 'react';
import { View, Text, Image, FlatList, TextInput, TouchableOpacity, Modal, StyleSheet, ScrollView, Linking, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import NavBar from '../component/NavBar';
import BottomNav from '../component/bottomNav';

import abdin1 from '../assets/service_imgs/صيدليات/عابدين/abdin1.jpeg';
import abdin2 from '../assets/service_imgs/صيدليات/عابدين/abdin2.jpeg';
import abdin3 from '../assets/service_imgs/صيدليات/عابدين/abdin3.jpeg';
import abdin4 from '../assets/service_imgs/صيدليات/عابدين/abdin4.jpeg';

import ibtsam1 from '../assets/service_imgs/صيدليات/ibtsam1.jpeg';
import qlel from '../assets/service_imgs/صيدليات/qlel.jpeg';
import saber1 from '../assets/service_imgs/صيدليات/saber1.jpeg';

import ezaby1 from '../assets/service_imgs/صيدليات/العزبي/ezaby1.jpeg';
import ezaby2 from '../assets/service_imgs/صيدليات/العزبي/ezaby2.jpeg';
import ezaby3 from '../assets/service_imgs/صيدليات/العزبي/ezaby3.jpeg';
import ezaby4 from '../assets/service_imgs/صيدليات/العزبي/ezaby4.jpeg';

const PharmaciesPage = ({ navigation }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const pharmacies = [
        {
            id: 1,
            title: 'صيدلية عابدين',
            image: abdin1,
            description: 'خدمة 24 ساعة - توصيل مجاني',
            rating: 4.8,
            phone: '19036',
            whatsapp: '19036',
            facebook: 'https://www.facebook.com/AbdinPharmaciesOfficial?locale=ar_AR',
            address: ' الكورنيش اسوان',
            additionalImages: [abdin2, abdin3, abdin4],
        },
        {
            id: 2,
            title: 'صيدلية سيد صابر ',
            image: saber1,
            description: 'خدمة 24 ساعة - توصيل مجاني',
            rating: 4.8,
            phone: '01050767676',
            whatsapp: '01050767676',
            facebook: 'https://www.facebook.com/profile.php?id=100082585836170&locale=ar_AR',
            address: 'شارع عباس فريد',
            additionalImages: [saber1],
        },
        {
            id: 3,
            title: 'صيدلية إبتسام بخيت',
            image: ibtsam1,
            description: 'خدمة 24 ساعة - توصيل مجاني',
            rating: 4.8,
            phone: '01281255552',
            whatsapp: '01281255552',
            facebook: 'https://www.facebook.com/dr.ebtesam.pharmcy?locale=ar_AR',
            address: 'السيل برج الحج',
            additionalImages: [ibtsam1],
        },
        {
            id: 4,
            title: 'صيدلية أبو قليل  ',
            image: qlel,
            description: 'خدمة 24 ساعة - توصيل مجاني',
            rating: 4.8,
            phone: '01151428645',
            whatsapp: '01151428645',
            facebook: 'https://www.facebook.com/profile.php?id=100051283927225&locale=ar_AR',
            address: 'طريق الكرور، حي الزهور، امام فرع البنك الاهلي الجديد',
            additionalImages: [qlel],
        },
        {
            id: 5,
            title: 'صيدلية العزبي   ',
            image: ezaby1,
            description: 'خدمة 24 ساعة - توصيل مجاني',
            rating: 4.8,
            phone: '01151428645',
            whatsapp: '01151428645',
            facebook: 'https://www.facebook.com/profile.php?id=100051283927225&locale=ar_AR',
            address: 'طريق الكرور، حي الزهور، امام فرع البنك الاهلي الجديد',
            additionalImages: [ezaby2, ezaby3, ezaby4],
        },
    ];

    const filteredPharmacies = pharmacies.filter((pharmacy) =>
        pharmacy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase())
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
                <Text style={styles.title}>الصيدليات</Text>

                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="ابحث عن صيدلية أو عنوان..."
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                </View>

                <FlatList
                    data={filteredPharmacies}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image source={item.image} style={styles.cardImage} />
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
                                    <Image source={mainImage} style={styles.modalImage} />
                                    <View style={styles.imageThumbnails}>
                                        {selectedItem.additionalImages.map((img, index) => (
                                            <TouchableOpacity key={index} onPress={() => setMainImage(img)}>
                                                <Image source={img} style={styles.thumbnail} />
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

export default PharmaciesPage; 
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, ScrollView, StyleSheet, Dimensions, SafeAreaView, Animated } from 'react-native';
import Swiper from 'react-native-swiper';
import AddServiceForm from './AddServiceForm';
import NavBar from '../component/NavBar';
import BottomNav from '../component/bottomNav';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Services = ({ navigation }) => {
    const [showAddServiceModal, setShowAddServiceModal] = useState(false);
    const fadeAnim = new Animated.Value(0);

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    const services = {
        restaurants: [
            { id: 1, image: require('../assets/service_imgs/مطاعم/اسمه ايه/esmo1.jpeg') },
            { id: 2, image: require('../assets/service_imgs/مطاعم/الدوكة/doka1.jpeg') },
            { id: 3, image: require('../assets/service_imgs/مطاعم/قصر الشام/qsr1.jpeg') },
            { id: 4, image: require('../assets/service_imgs/مطاعم/بورتو سونو/porto1.jpeg') },
            { id: 5, image: require('../assets/service_imgs/مطاعم/مكانى/makany1.jpeg') },
            { id: 6, image: require('../assets/service_imgs/مطاعم/كيوى/kiwi1.jpeg') },
            { id: 7, image: require('../assets/service_imgs/مطاعم/هافانا/havana1.jpeg') },
        ],
        pharmacies: [
            { id: 1, image: require('../assets/service_imgs/صيدليات/عابدين/abdin1.jpeg') },
            { id: 2, image: require('../assets/service_imgs/صيدليات/saber1.jpeg') },
            { id: 3, image: require('../assets/service_imgs/صيدليات/ibtsam1.jpeg') },
            { id: 4, image: require('../assets/service_imgs/صيدليات/qlel.jpeg') },
        ],
        doctor: [
            { id: 1, image: { uri: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7' } },
            { id: 2, image: { uri: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2' } },
            { id: 3, image: { uri: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d' } },
            { id: 4, image: { uri: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2' } },
        ],
        supermarket: [
            { id: 1, image: require('../assets/service_imgs/سوبر ماركت/الراية/raya1.jpeg') },
            { id: 2, image: require('../assets/service_imgs/سوبر ماركت/الصفا ماركت/safa1.jpeg') },
            { id: 3, image: require('../assets/service_imgs/سوبر ماركت/الوردانى/wardny1.jpeg') },
            { id: 4, image: require('../assets/service_imgs/سوبر ماركت/خير زمان/kher1.jpeg') },
            { id: 5, image: require('../assets/service_imgs/سوبر ماركت/كارفور/carfor1.jpeg') },
        ],
    };

    const renderServiceCard = (item, category) => (
        <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
            <Image source={item.image} style={styles.image} resizeMode="cover" />
            <View style={styles.cardOverlay}>
                <Text style={styles.cardTitle}>{getCategoryTitle(category)}</Text>
                <TouchableOpacity
                    style={styles.moreButton}
                    onPress={() => handleMorePress(category)}
                >
                    <Text style={styles.moreButtonText}>اعرف المزيد</Text>
                    <FontAwesome name="arrow-left" size={16} color="#fff" style={styles.icon} />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );

    const getCategoryTitle = (category) => {
        switch (category) {
            case 'restaurants':
                return 'المطاعم والكافيهات';
            case 'pharmacies':
                return 'الصيدليات';
            case 'doctor':
                return 'الدكاترة';
            case 'supermarket':
                return 'السوبر ماركت';
            default:
                return '';
        }
    };

    const handleMorePress = (category) => {
        switch (category) {
            case 'restaurants':
                navigation.navigate('RestaurantsPage');
                break;
            case 'pharmacies':
                navigation.navigate('PharmaciesPage');
                break;
            case 'doctor':
                navigation.navigate('DoctorsPage');
                break;
            case 'supermarket':
                navigation.navigate('SupermarketsPage');
                break;
            default:
                break;
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <NavBar navigation={navigation} />
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>الخدمات في أسوان</Text>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => setShowAddServiceModal(true)}
                        >
                            <FontAwesome name="plus" size={20} color="#fff" style={styles.addIcon} />
                            <Text style={styles.addButtonText}>إضافة خدمة جديدة</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>المطاعم والكافيهات</Text>
                        {services.restaurants && services.restaurants.length > 0 ? (
                            <Swiper
                                style={styles.swiper}
                                showsPagination={true}
                                loop={true}
                                autoplay={true}
                                dotColor="#fff"
                                activeDotColor="#007bff"
                            >
                                {services.restaurants.map((item, index) => (
                                    <View key={index}>
                                        {renderServiceCard(item, 'restaurants')}
                                    </View>
                                ))}
                            </Swiper>
                        ) : (
                            <Text style={styles.noDataText}>لا توجد بيانات لعرضها</Text>
                        )}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>الصيدليات</Text>
                        {services.pharmacies && services.pharmacies.length > 0 ? (
                            <Swiper
                                style={styles.swiper}
                                showsPagination={true}
                                loop={true}
                                autoplay={true}
                                dotColor="#fff"
                                activeDotColor="#007bff"
                            >
                                {services.pharmacies.map((item, index) => (
                                    <View key={index}>
                                        {renderServiceCard(item, 'pharmacies')}
                                    </View>
                                ))}
                            </Swiper>
                        ) : (
                            <Text style={styles.noDataText}>لا توجد بيانات لعرضها</Text>
                        )}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>الدكاترة</Text>
                        {services.doctor && services.doctor.length > 0 ? (
                            <Swiper
                                style={styles.swiper}
                                showsPagination={true}
                                loop={true}
                                autoplay={true}
                                dotColor="#fff"
                                activeDotColor="#007bff"
                            >
                                {services.doctor.map((item, index) => (
                                    <View key={index}>
                                        {renderServiceCard(item, 'doctor')}
                                    </View>
                                ))}
                            </Swiper>
                        ) : (
                            <Text style={styles.noDataText}>لا توجد بيانات لعرضها</Text>
                        )}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>السوبر ماركت</Text>
                        {services.supermarket && services.supermarket.length > 0 ? (
                            <Swiper
                                style={styles.swiper}
                                showsPagination={true}
                                loop={true}
                                autoplay={true}
                                dotColor="#fff"
                                activeDotColor="#007bff"
                            >
                                {services.supermarket.map((item, index) => (
                                    <View key={index}>
                                        {renderServiceCard(item, 'supermarket')}
                                    </View>
                                ))}
                            </Swiper>
                        ) : (
                            <Text style={styles.noDataText}>لا توجد بيانات لعرضها</Text>
                        )}
                    </View>

                    <Modal visible={showAddServiceModal} animationType="slide" onRequestClose={() => setShowAddServiceModal(false)}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>إضافة خدمة جديدة</Text>
                                <TouchableOpacity onPress={() => setShowAddServiceModal(false)} style={styles.closeButton}>
                                    <FontAwesome name="times" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>
                            <AddServiceForm onClose={() => setShowAddServiceModal(false)} />
                        </View>
                    </Modal>
                </ScrollView>
            </SafeAreaView>
            <BottomNav navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        marginBottom: 70,
    },
    header: {
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1f2937',
        textAlign: 'center',
        marginBottom: 15,
    },
    addButton: {
        backgroundColor: '#0A2784FF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    addIcon: {
        marginLeft: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    section: {
        marginBottom: 25,
        paddingHorizontal: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 15,
        textAlign: 'right',
    },
    card: {
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 220,
    },
    cardOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 15,
    },
    cardTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'right',
    },
    moreButton: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    moreButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    icon: {
        marginRight: 8,
    },
    swiper: {
        height: 260,
        borderRadius: 16,
    },
    noDataText: {
        textAlign: 'center',
        color: '#6b7280',
        fontSize: 16,
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1f2937',
    },
    closeButton: {
        backgroundColor: '#ef4444',
        padding: 8,
        borderRadius: 8,
    },
    scrollView: {
        paddingBottom: 20,
    },
});

export default Services;

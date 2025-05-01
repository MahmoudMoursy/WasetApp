import React, { useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from '../component/NavBar';
import BottomNav from '../component/bottomNav';
import Swiper from 'react-native-swiper';
import { Linking } from 'react-native';
import aswulogo2 from '../assets/aswulogo2.png';
import ColoredLogo from '../assets/iti.png';
import contactImg from '../assets/contact.png';
import userGif from '../assets/user.png';
import chooseGif from '../assets/choose.png';
import servGif from '../assets/serv.png';
import payGif from '../assets/pay.png';
import underline2 from '../assets/underline2.png';
import underline3 from '../assets/underline3.png';

const { width } = Dimensions.get('window');

// Vendor data for the swiper
const vendors = [
    {
        img: "https://img.freepik.com/free-photo/old-historical-abu-simbel-temple-ramesses-ii-egypt_181624-43854.jpg",
        title: "معبد أبو سمبل",
        desc: "أحد أهم المعالم الأثرية في أسوان"
    },
    {
        img: "https://img.freepik.com/free-photo/closeup-engravings-walls-luxor-temple-egypt_181624-38326.jpg",
        title: "معبد فيلة",
        desc: "معبد فيلة الرائع في جزيرة فيلة"
    },
    {
        img: "https://r-xx.bstatic.com/xdata/images/xphoto/max1200/304284640.jpg",
        title: "معبد كوم أمبو",
        desc: "معبد مزدوج مخصص لحورس وسوبك"
    },
    {
        img: "https://q-xx.bstatic.com/xdata/images/xphoto/max1200/127822994.jpg",
        title: "متحف النوبة",
        desc: "يضم مجموعة رائعة من الآثار النوبية"
    },
    {
        img: "https://img.freepik.com/premium-photo/sailboat-is-traveling-down-river_662214-415717.jpg",
        title: "رحلات الفلوكة",
        desc: "استمتع برحلة مميزة في نهر النيل"
    }
];

function Home() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkUser = async () => {
            const user = await AsyncStorage.getItem("currentUser");
            if (!user) {
                navigation.navigate('ProfileForm');
            }
        };
        checkUser();
    }, []);

    const renderServiceCard = (icon, title) => (
        <TouchableOpacity style={styles.serviceCard}>
            <Image source={icon} style={styles.serviceIcon} />
            <Text style={styles.serviceTitle}>{title}</Text>
        </TouchableOpacity>
    );

    const renderVendorSlide = (vendor, index) => (
        <View key={index} style={styles.slide}>
            <Image source={{ uri: vendor.img }} style={styles.vendorImage} />
            <View style={styles.vendorInfo}>
                <Text style={styles.vendorTitle}>{vendor.title}</Text>
                <Text style={styles.vendorDesc}>{vendor.desc}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <NavBar />
            <ScrollView style={styles.scrollView}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>ما الذي علي فعله ؟</Text>
                    <Image source={underline2} style={styles.underline} />
                    <View style={styles.servicesContainer}>
                        {renderServiceCard(payGif, "احجز")}
                        {renderServiceCard(servGif, "اختر الخدمة المناسبة")}
                        {renderServiceCard(chooseGif, "اختر من مقدمي الخدمة من يناسبك")}
                        {renderServiceCard(userGif, "قم بالتسجيل بالموقع")}
                    </View>
                </View>

                <View style={styles.swiperContainer}>
                    <Text style={styles.sectionTitle}>مقدمو الخدمة الأكثر طلباً</Text>
                    <Image source={underline2} style={styles.underline} />
                    <Swiper
                        style={styles.swiper}
                        showsPagination={true}
                        autoplay={true}
                        autoplayTimeout={4}
                        paginationStyle={styles.pagination}
                        dotStyle={styles.dot}
                        activeDotStyle={styles.activeDot}
                        loop={true}
                        autoplayDirection={true}
                        removeClippedSubviews={false}
                    >
                        {vendors.map((vendor, index) => renderVendorSlide(vendor, index))}
                    </Swiper>
                </View>

                <View style={styles.partnersSection}>
                    <Text style={styles.sectionTitle}>شركاؤنا</Text>
                    <Image source={underline3} style={styles.partnerUnderline} />
                    <View style={styles.partnersContainer}>
                        <TouchableOpacity onPress={() => Linking.openURL('https://iti.gov.eg')}>
                            <Image source={ColoredLogo} style={styles.partnerLogo} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL('https://aswu.edu.eg/')}>
                            <Image source={aswulogo2} style={styles.partnerLogo} />
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.contactSection}>
                    <View style={styles.contactContent}>
                        <Text style={styles.contactTitle}>تحتاج إلى مساعدة</Text>
                        <Text style={styles.contactText}>
                            تواصل مع فريق العمل في حالة وجود أي استفسار
                        </Text>
                        <TouchableOpacity
                            style={styles.contactButton}
                            onPress={() => navigation.navigate('Contact')}
                        >
                            <Text style={styles.contactButtonText}>تواصل معنا</Text>
                        </TouchableOpacity>
                    </View>
                    <Image source={contactImg} style={styles.contactImage} />
                </View>
            </ScrollView>
            <BottomNav navigation={navigation} activePage="Home" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollView: {
        flex: 1,
        marginBottom: 100,
    },
    section: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 15,
        borderRadius: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginHorizontal: 10,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0A2784FF',
        marginBottom: 10,
        textAlign: 'center',
    },
    underline: {
        width: width * 0.8,
        height: 20,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    servicesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: 10,
        width: '100%',
    },
    serviceCard: {
        width: width * 0.4,
        alignItems: 'center',
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    serviceIcon: {
        width: 80,
        height: 80,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    serviceTitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
        fontWeight: '600',
    },
    swiperContainer: {
        height: 400,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        marginHorizontal: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        overflow: 'hidden',
    },
    swiper: {
        height: 350,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        margin: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        position: 'relative',
    },
    vendorImage: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        resizeMode: 'cover',
    },
    vendorInfo: {
        padding: 20,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    vendorTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0A2784FF',
        textAlign: 'center',
        marginBottom: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    vendorDesc: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        lineHeight: 24,
        fontWeight: '500',
        paddingHorizontal: 10,
    },
    pagination: {
        bottom: 15,
    },
    dot: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 5,
    },
    activeDot: {
        backgroundColor: '#0A2784FF',
        width: 12,
        height: 12,
        borderRadius: 6,
        margin: 5,
    },
    partnersSection: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 15,
        borderRadius: 15,
        marginHorizontal: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    partnerUnderline: {
        width: width * 0.3,
        height: 20,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    partnersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        padding: 10,
    },
    partnerLogo: {
        width: width * 0.4,
        height: 100,
        resizeMode: 'contain',
    },
    contactSection: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        marginBottom: 15,
        borderRadius: 15,
        marginHorizontal: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    contactContent: {
        flex: 1,
        paddingRight: 20,
    },
    contactTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0A2784FF',
        marginBottom: 10,
    },
    contactText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        lineHeight: 24,
    },
    contactButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#0A2784FF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
    },
    contactButtonText: {
        color: '#0A2784FF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    contactImage: {
        width: width * 0.4,
        height: 200,
        resizeMode: 'contain',
    },
});

export default Home;

import NavBar from '../component/NavBar';
import Header from '../component/Header';
import CardSlider from '../component/Cardslide';
import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import ColoredLogo from '../assets/iti.png';
import AswanLogo from '../assets/aswulogo2.png';
import UserImage from '../assets/user.jpg';
import BottomNav from '../component/bottomNav';

const Home = ({ navigation }) => {
    useEffect(() => {
        const checkImages = [ColoredLogo, AswanLogo, UserImage].every((image) => image != null);
        if (!checkImages) {
            console.log('One or more images failed to load');
        }
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <NavBar navigation={navigation} />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Header />


                    <View style={styles.headerContainer}>
                        <Text style={styles.mainTitle}>خدماتنا الرئيسية</Text>
                    </View>
                    <View width="100%" height={450} style={{ marginBottom: 30 }}>
                    <CardSlider />
                    </View>
                    <View style={styles.cardContainer}>
                        <Text style={styles.serviceTitle}>خدمة توفير السكن</Text>
                        <Text style={styles.serviceDescription}>
                            نوفر لك السكن الطلابي المثالي بالقرب من جامعتك، مع بيئة مريحة وآمنة تساعدك على التركيز في دراستك. اختر من بين خيارات متعددة تناسب ميزانيتك، سواء كنت تبحث عن غرفة فردية أو سكن مشترك. استمتع بخدمات متكاملة تشمل الإنترنت، الصيانة، والأمان على مدار الساعة.

                        </Text>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>ابحث</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.partnersContainer}>
                        <Text style={styles.partnersTitle}>شركاؤنا</Text>
                        <View style={styles.partnersImages}>

                            <Image source={ColoredLogo} width={200} height={200} />
                            <Image source={AswanLogo} style={styles.partnerLogo} />
                        </View>
                    </View>


                    <View style={styles.testimonialsContainer}>
                        <Text style={styles.testimonialsTitle}>أراء المستخدمين</Text>
                        {[1, 2, 3].map((index) => (
                            <View style={styles.testimonialCard} key={index}>
                                <View style={styles.testimonialText}>
                                    <Text style={styles.testimonialTitle}>I have found everything I want here as I am in my country</Text>
                                    <Text style={styles.testimonialSubtitle}>John Doe - 3 hours ago</Text>
                                    <Text style={styles.testimonialStars}>★★★★★</Text>
                                </View>
                                <Image source={UserImage} style={styles.userImage} />
                            </View>
                        ))}
                    </View>


                    <View style={styles.mapContainer}>
                        <Text style={styles.mapTitle}>Explore Aswan</Text>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: 24.0889,
                                longitude: 32.8998,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Marker coordinate={{ latitude: 24.0889, longitude: 32.8998 }} />
                        </MapView>
                    </View>

                    <View style={styles.contactContainer}>
                        <Text style={styles.contactTitle}>Contact Us</Text>
                        <View style={styles.formContainer}>
                            <Text>Name</Text>
                            <TextInput style={styles.input} placeholder="Your Name" />
                            <Text>Email</Text>
                            <TextInput style={styles.input} placeholder="Your Email" />
                            <Text>Message</Text>
                            <TextInput style={styles.input} placeholder="Your Message" multiline />
                            <TouchableOpacity style={styles.submitButton}>
                                <Text style={styles.buttonText}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <View>
            <BottomNav navigation={navigation} />    
                </View>
        </View>

    );
};

export default Home;

const styles = StyleSheet.create({
    headerContainer: {
        paddingBottom: 32,
        alignItems: 'center',
        marginTop: 30,
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
        textShadowColor: '#bdc3c7',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    cardContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        marginBottom: 24,
        elevation: 5,    
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    serviceTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e', 
        marginBottom: 8,
    },
    serviceDescription: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        textAlign: 'center',
        marginBottom: 16,
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#2575fc',
        padding: 12,
        borderRadius: 25, 
        marginTop: 16,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    partnersContainer: {
        marginBottom: 24,
    },
    partnersTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        color: '#34495e',
    },
    partnersImages: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    partnerLogo: {
        width: 180,
        height: 120,
        marginVertical: 5,
        borderRadius: 12, 
    },
    
    testimonialsContainer: {
        marginBottom: 24,
    },
    testimonialsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        color: '#2c3e50',
    },
    testimonialCard: {
        flexDirection: 'row',
        marginBottom: 16,
        padding: 15,
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        elevation: 3, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    testimonialText: {
        flex: 1,
    },
    testimonialTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    testimonialSubtitle: {
        fontSize: 14,
        color: '#888',
    },
    testimonialStars: {
        fontSize: 20,
        color: '#ffd700',
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 12,
    },
    mapContainer: {
        marginBottom: 24,
    },
    mapTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        color: '#2c3e50',
    },
    map: {
        width: '100%',
        height: 250,
        borderRadius: 12,
        marginBottom: 16,
    },
    contactContainer: {
        marginBottom: 70,
    },
    contactTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        color: '#2c3e50',
    },
    formContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        elevation: 3, 
    },
    input: {
        backgroundColor: '#f8f9fa',
        padding: 14,
        marginVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
        color: '#555',
    },
    submitButton: {
        backgroundColor: '#2575fc',
        padding: 14,
        borderRadius: 25,
        marginTop: 20,
        elevation: 3, 
    },
});

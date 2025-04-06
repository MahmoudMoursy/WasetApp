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
                        <Text style={styles.mainTitle}>Our Main Services</Text>
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

                    <View style={styles.faqContainer}>
                        <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
                        <View style={styles.faqItem}>
                            <Text style={styles.faqQuestion}>How can I contact customer support?</Text>
                            <Text style={styles.faqAnswer}>You can contact us via email or our hotline available 24/7.</Text>
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    cardContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 24,
    },
    serviceTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    serviceDescription: {
        fontSize: 16,
        color: '#555',
        marginVertical: 8,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#2575fc',
        padding: 12,
        borderRadius: 8,
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    partnersContainer: {
        marginBottom: 24,
    },
    partnersTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    partnersImages: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    partnerLogo: {
        width: 200,
        height: 120,
        marginVertical: 5,
    },
    faqContainer: {
        marginBottom: 24,
    },
    faqTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        color: "black"
    },
    faqItem: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    faqQuestion: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    faqAnswer: {
        fontSize: 16,
        color: '#555',
    },
    testimonialsContainer: {
        marginBottom: 24,
    },
    testimonialsTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    testimonialCard: {
        flexDirection: 'row',
        marginBottom: 16,
        padding: 8,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
    },
    testimonialText: {
        flex: 1,
    },
    testimonialTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    testimonialSubtitle: {
        fontSize: 14,
        color: '#888',
    },
    testimonialStars: {
        fontSize: 18,
        color: '#ffd700',
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 8,
    },
    mapContainer: {
        marginBottom: 24,
    },
    mapTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    map: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    contactContainer: {
        marginBottom: 70,
    },
    contactTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    formContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
    },
    input: {
        backgroundColor: '#f8f9fa',
        padding: 12,
        marginVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    submitButton: {
        backgroundColor: '#2575fc',
        padding: 12,
        borderRadius: 8,
        marginTop: 16,
    },
});

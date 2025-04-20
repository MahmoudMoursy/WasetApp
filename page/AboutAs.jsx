import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import img from "../assets/bannerzilliqastory.png";
import BottomNav from '../component/bottomNav';
import NavBar from '../component/NavBar';
const AboutUsScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <NavBar navigation={navigation} />
            <SafeAreaView style={styles.container}>
                <ScrollView >
                    <Animatable.Text animation="fadeInDown" style={styles.title}>
                        مرحبًا بكم في <Text style={styles.highlight}>وسيط</Text>
                    </Animatable.Text>

                    <Animatable.Image
                        animation="pulse"
                        easing="ease-out"
                        iterationCount="infinite"
                        duration={3000}
                        source={img}
                        style={styles.banner}
                        resizeMode="cover"
                    />

                    <Animatable.View animation="fadeInRight" delay={300} duration={800} style={styles.section}>
                        <Text style={styles.sectionTitle}>من نحن؟</Text>
                        <Text style={styles.paragraph}>
                            نحن منصه وسيط نسعى إلى تقديم تجربة رقمية متكاملة تدعم المغتربين في كل تفاصيل حياتهم بأسوان. نؤمن بأهمية توفير حلول تقنية تُسهم في تسهيل الحياة اليومية وتعزيز الترابط المجتمعي بين الأفراد في الغربة.
                        </Text>
                        <Text style={styles.paragraph}>
                            نقدم خدمات متنوعة تشمل السكن، معرفه الاماكن السياحيه ، والدعم الاجتماعي. كما نحرص على توفير معلومات محدثة وموثوقة تساعد المغتربين على اتخاذ قراراتهم بثقة، سواء في مجالات العمل، التعليم، أو حتى الأنشطة الاجتماعية.
                        </Text>
                        <Text style={styles.paragraph}>
                            رؤيتنا هي بناء مجتمع رقمي تفاعلي يُشعر كل مغترب بأنه في وطنه، ويمنحه الأدوات اللازمة للاندماج والنجاح في بيئته الجديدة. نحن هنا لنرافقك في رحلتك، ونسهّل عليك الوصول إلى كل ما تحتاجه، بخطوات بسيطة وتجربة استخدام سلسة.
                        </Text>
                    </Animatable.View>

                    <Animatable.View animation="fadeInLeft" delay={500} duration={800} style={styles.section}>
                        <Image
                            source={{ uri: 'https://img.freepik.com/premium-photo/close-up-view-colorful-faluca-traditional-boat-sailing-river-sorrounded-by-vegetation_1048944-11883581.jpg' }}
                            style={styles.image}
                        />
                        <Text style={styles.sectionTitle}>رؤيتنا</Text>
                        <Text style={styles.paragraph}>
                            نطمح إلى أن نكون الجسر الذي يربط المغترب بالحياة المستقرة، من خلال بناء منصة ذكية تقدم حلولًا حقيقية تلبي احتياجاته اليومية. نحن نؤمن بأن الاستقرار يبدأ من الشعور بالأمان والانتماء، ولهذا نركز على تقديم خدمات تدعم كل جانب من جوانب حياة المغترب، سواء على المستوى المهني، الاجتماعي، أو النفسي.
                        </Text>
                        <Text style={styles.paragraph}>
                            هدفنا ليس فقط تيسير الوصول إلى الخدمات، بل أيضًا خلق مجتمع متكامل يشعر فيه المغترب بأنه ليس وحيدًا، بل محاط بدعم حقيقي وشبكة من الموارد التي تمكّنه من بناء مستقبل أفضل.
                        </Text>
                    </Animatable.View>

                    <Animatable.View animation="fadeInRight" delay={700} duration={800} style={styles.section}>
                        <Image
                            source={{ uri: 'https://img.freepik.com/premium-photo/sailboats-by-entrance-botanical-garden-aswan-egypt_219958-1139.jpg' }}
                            style={styles.image}
                        />
                        <Text style={styles.sectionTitle}>مهمتنا</Text>
                        <Text style={styles.paragraph}>
                            نعمل على تسهيل حياة المغتربين وتمكينهم من الاندماج في مجتمع أسوان بسلاسة، مع توفير بيئة داعمة تساعدهم على النجاح والتأقلم. نسعى إلى بناء حلول رقمية تُراعي احتياجاتهم الفعلية، وتمنحهم الوصول إلى المعلومات والخدمات بطريقة بسيطة وآمنة.
                        </Text>
                        <Text style={styles.paragraph}>
                            من خلال منصتنا، نهدف إلى تقليص الفجوة بين المغترب والمجتمع المحلي، وتقديم أدوات ذكية تُسهم في تعزيز التفاعل، بناء العلاقات، وتوفير فرص حقيقية للنمو الشخصي والمهني.
                        </Text>
                        <Text style={styles.paragraph}>
                            مهمتنا تنبع من إيماننا بأن كل مغترب يستحق بداية جديدة وفرصة عادلة للنجاح، ونحن هنا لنكون شركاء حقيقيين في رحلته نحو حياة أكثر استقرارًا وطمأنينة.
                        </Text>
                    </Animatable.View>

                    <Animatable.View animation="fadeInLeft" delay={900} duration={800} style={styles.section}>
                        <Image
                            source={{ uri: 'https://img.freepik.com/premium-photo/nile-traditional-african-village-near-aswan-egypt_400112-2293.jpg' }}
                            style={styles.image}
                        />
                        <Text style={styles.sectionTitle}>قيمنا</Text>
                        <Text style={styles.paragraph}>
                            نؤمن بالشفافية، الابتكار، والمصداقية كقيم رئيسية تقود كل قراراتنا وخدماتنا. هذه المبادئ ليست مجرد شعارات، بل هي جزء لا يتجزأ من الطريقة التي نعمل بها ونتفاعل من خلالها مع مجتمعنا.
                        </Text>
                        <Text style={styles.paragraph}>
                            نضع الإنسان في قلب كل ما نقوم به، ونسعى دائمًا لتقديم حلول تُبنى على الثقة والاحترام المتبادل. نؤمن بأن الابتكار هو الطريق نحو التقدم، ولهذا نعمل باستمرار على تطوير منصتنا بما يواكب احتياجات المستخدم المتغيرة.
                        </Text>
                        <Text style={styles.paragraph}>
                            هدفنا هو أن يشعر كل مغترب بأنه مُقدّر، مدعوم، وله صوت مسموع في المنصة التي صُممت خصيصًا من أجله.
                        </Text>
                    </Animatable.View>

                    <View style={{ padding: 20, alignItems: 'center' }}>
                        <Text style={{ color: '#aaa', fontSize: 14 }}>© 2025 جميع الحقوق محفوظة - وسيط</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <BottomNav navigation={navigation} />
        </View>
    );
};

export default AboutUsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        direction: 'rtl',
        marginBottom: 90,
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        marginVertical: 25,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: 'linear-gradient(to right, #05020BFF, #15458EFF)', // تأثير التدرج
        paddingVertical: 15,
        borderRadius: 15,
        marginHorizontal: 15,
        elevation: 5,
        shadowColor: '#020B18FF',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
    },
    highlight: {
        // backgroundColor: '#091e3d',
        color: 'black',
        paddingHorizontal: 10,
        borderRadius: 25,
    },
    banner: {
        width: '100%',
        height: 220,
        borderRadius: 12,
        marginHorizontal: 10,
        marginBottom: 20,
    },
    section: {
        padding: 25,
        backgroundColor: '#f4f4f4',
        borderRadius: 20,
        marginVertical: 15,
        marginHorizontal: 15,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#0F2649FF',
    },
    paragraph: {
        fontSize: 17,
        lineHeight: 26,
        color: '#555',
        marginBottom: 12,
        textAlign: 'justify',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 15,
        marginBottom: 20,
        transition: 'transform 0.3s ease',
    },
    imageHover: {
        transform: [{ scale: 1.05 }],
    },
    footer: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    footerText: {
        color: '#777',
        fontSize: 14,
    },
});

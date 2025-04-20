import React from 'react';
import { ScrollView, Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import img2 from '../assets/img2.jpeg';
import img6 from '../assets/img6.jpeg';
function CardSlider() {
  const cards = [
    { id: 1, img: img6, title: 'مرحبًا بكم في خدمات أسوان', text: 'نساعدك في معرفة كل شيء عن أسوان.' },
    { id: 2, img: img2, title: 'ثق بنا', text: 'نحن هنا لمساعدتك في العثور على جميع الحلول الممكنة.' },
    { id: 3, img: img6, title: 'استكشف أسوان', text: 'اكتشف أفضل الأماكن التي يمكنك زيارتها في أسوان.' },
    { id: 4, img: img2, title: 'الحجز السهل', text: 'احجز الخدمات بسهولة من خلال منصتنا.' },
    { id: 5, img: img6, title: 'دعم على مدار الساعة', text: 'نحن متاحون في أي وقت لمساعدتك.' },
    { id: 6, img: img2, title: 'أسعار معقولة', text: 'ابحث عن أفضل العروض بأسعار منخفضة.' },
    { id: 7, img: img6, title: 'أماكن للإقامة', text: 'نقدم لك أفضل الأماكن للإقامة في مختلف المحافظات في أقرب وقت ممكن.' },
    { id: 8, img: img2, title: 'المطاعم والمقاهي', text: 'نعمل على توفير جميع المطاعم والمقاهي في المحافظة.' },
  ];
  

  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={true}
      autoplay={true}
      autoplayTimeout={2.5}
      showsPagination={true}
      loop={true}
    >
      {cards.map(card => (
        <View key={card.id} style={styles.card}>
          <Image source={card.img} style={styles.cardImage} />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardText}>{card.text}</Text>
            {/* <TouchableOpacity style={styles.button} onPress={() => alert('Contact Us')}>
              <Text style={styles.buttonText}>Contact Us</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 100,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardBody: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#2575fc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CardSlider;

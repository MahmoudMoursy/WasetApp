import React from 'react';
import { ScrollView, Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

import img2 from '../assets/img2.jpeg';
import img6 from '../assets/img6.jpeg';

function CardSlider() {
  const cards = [
    { id: 1, img: img6, title: 'Welcome to Aswan Services', text: 'We help you know everything about Aswan.' },
    { id: 2, img: img2, title: 'Trust Us', text: 'We will help you find all possible solutions.' },
    { id: 3, img: img6, title: 'Explore Aswan', text: 'Discover the best places to visit in Aswan.' },
    { id: 4, img: img2, title: 'Easy Booking', text: 'Book services easily with our platform.' },
    { id: 5, img: img6, title: '24/7 Support', text: 'We are available anytime to assist you.' },
    { id: 6, img: img2, title: 'Affordable Prices', text: 'Find the best deals at the lowest prices.' },
    { id: 7, img: img6, title: 'Places to Live', text: 'We provide you with the best places to live in various governorates as soon as possible.' },
    { id: 8, img: img2, title: 'Restaurants and Cafes', text: 'We are working to provide all restaurants and cafes in the province.' },
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
            <TouchableOpacity style={styles.button} onPress={() => alert('Contact Us')}>
              <Text style={styles.buttonText}>Contact Us</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
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
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CardSlider;

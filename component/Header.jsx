import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native';

const { width } = Dimensions.get('window');

const images = [
  {
    source: require('../assets/img6.jpeg') , 
    title: 'Welcome to Aswan Services',
    subtitle: 'We help you know everything about Aswan',
  },
  {
    source: require('../assets/img2.jpeg'),
    title: 'Trust us',
    subtitle: 'We will help you find all possible solutions.',
  }
];

const Header = () => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

 
  useEffect(() => {
    const checkImages = images.every(item => item.source != null);
    if (!checkImages) {
      console.log('One or more images failed to load');
    }
  }, []);


  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.source} style={styles.image} />
        <View style={styles.overlay}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
    
      <FlatList
        data={images}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
  },
  slide: {
    width: width,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Header;

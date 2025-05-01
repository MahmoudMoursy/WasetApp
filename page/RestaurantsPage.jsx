import React, { useState } from 'react';
import { View, Text, Image, FlatList, TextInput, TouchableOpacity, Modal, StyleSheet, ScrollView, Linking, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import NavBar from '../component/NavBar';
import BottomNav from '../component/bottomNav';

import esmo1 from '../assets/service_imgs/مطاعم/اسمه ايه/esmo1.jpeg';
import esmo2 from '../assets/service_imgs/مطاعم/اسمه ايه/esmo2.jpeg';
import esmo3 from '../assets/service_imgs/مطاعم/اسمه ايه/esmo3.jpeg';
import esmo4 from '../assets/service_imgs/مطاعم/اسمه ايه/esmo4.jpeg';
import esmo5 from '../assets/service_imgs/مطاعم/اسمه ايه/esmo5.jpeg';

import doka1 from '../assets/service_imgs/مطاعم/الدوكة/doka1.jpeg';
import doka2 from '../assets/service_imgs/مطاعم/الدوكة/doka2.jpeg';
import doka3 from '../assets/service_imgs/مطاعم/الدوكة/doka3.jpeg';
import doka4 from '../assets/service_imgs/مطاعم/الدوكة/doka4.jpeg';
import doka5 from '../assets/service_imgs/مطاعم/الدوكة/doka5.jpeg';

import qsr1 from '../assets/service_imgs/مطاعم/قصر الشام/qsr1.jpeg';
import qsr2 from '../assets/service_imgs/مطاعم/قصر الشام/qsr2.jpeg';
import qsr3 from '../assets/service_imgs/مطاعم/قصر الشام/qsr3.jpeg';
import qsr4 from '../assets/service_imgs/مطاعم/قصر الشام/qsr4.jpeg';
import qsr5 from '../assets/service_imgs/مطاعم/قصر الشام/qsr5.jpeg';

import porto1 from '../assets/service_imgs/مطاعم/بورتو سونو/porto1.jpeg';
import porto2 from '../assets/service_imgs/مطاعم/بورتو سونو/porto2.jpeg';
import porto3 from '../assets/service_imgs/مطاعم/بورتو سونو/porto3.jpeg';
import porto4 from '../assets/service_imgs/مطاعم/بورتو سونو/porto4.jpeg';
import porto5 from '../assets/service_imgs/مطاعم/بورتو سونو/porto5.jpeg';

import makany1 from '../assets/service_imgs/مطاعم/مكانى/makany1.jpeg';
import makany2 from '../assets/service_imgs/مطاعم/مكانى/makany2.jpeg';
import makany3 from '../assets/service_imgs/مطاعم/مكانى/makany3.jpeg';
import makany4 from '../assets/service_imgs/مطاعم/مكانى/makany4.jpeg';
import makany5 from '../assets/service_imgs/مطاعم/مكانى/makany5.jpeg';

import kiwi1 from '../assets/service_imgs/مطاعم/كيوى/kiwi1.jpeg';
import kiwi2 from '../assets/service_imgs/مطاعم/كيوى/kiwi2.jpeg';
import kiwi3 from '../assets/service_imgs/مطاعم/كيوى/kiwi3.jpeg';
import kiwi4 from '../assets/service_imgs/مطاعم/كيوى/kiwi4.jpeg';
import kiwi5 from '../assets/service_imgs/مطاعم/كيوى/kiwi5.jpeg';

import havana1 from '../assets/service_imgs/مطاعم/هافانا/havana1.jpeg';
import havana2 from '../assets/service_imgs/مطاعم/هافانا/havana2.jpeg';
import havana3 from '../assets/service_imgs/مطاعم/هافانا/havana3.jpeg';
import havana4 from '../assets/service_imgs/مطاعم/هافانا/havana4.jpeg';
import havana5 from '../assets/service_imgs/مطاعم/هافانا/havana5.jpeg';

function RestaurantsPage({ navigation }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mainImage, setMainImage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const restaurants = [
    {
      id: 1,
      title: "مطعم اسمه ايه",
      description: "مطعم متخصص في المأكولات المصرية والشرقية، يقدم أشهى الأطباق بنكهات أصيلة وأجواء عائلية مميزة",
      rating: 4.5,
      category: "مأكولات مصرية",
      phone: "01234567890",
      whatsapp: "201234567890",
      facebook: "https://www.facebook.com/",
      address: "شارع كورنيش النيل، أسوان",
      mainImage: esmo1,
      additionalImages: [esmo1, esmo2, esmo3, esmo4, esmo5]
    },
    {
      id: 2,
      title: "مطعم الدوكة",
      description: "مطعم متخصص في المأكولات النوبية والأسوانية التقليدية، يقدم تجربة طعام فريدة مع إطلالة رائعة على النيل",
      rating: 4.8,
      category: "مأكولات نوبية",
      phone: "01234567891",
      whatsapp: "201234567891",
      facebook: "https://www.facebook.com/",
      address: "شارع السوق، أسوان",
      mainImage: doka1,
      additionalImages: [doka1, doka2, doka3, doka4, doka5]
    },
    {
      id: 3,
      title: "قصر الشام",
      description: "مطعم متخصص في المأكولات الشامية والسورية الأصيلة، يقدم أطباق شهية في أجواء راقية",
      rating: 4.3,
      category: "مأكولات شامية",
      phone: "01234567892",
      whatsapp: "201234567892",
      facebook: "https://www.facebook.com/",
      address: "شارع أبطال التحرير، أسوان",
      mainImage: qsr1,
      additionalImages: [qsr1, qsr2, qsr3, qsr4, qsr5]
    },
    {
      id: 4,
      title: "بورتو سونو",
      description: "مطعم إيطالي يقدم أشهى أطباق المطبخ الإيطالي من البيتزا والمعكرونة والريزوتو في أجواء عصرية",
      rating: 4.6,
      category: "مأكولات إيطالية",
      phone: "01234567893",
      whatsapp: "201234567893",
      facebook: "https://www.facebook.com/",
      address: "شارع المطار، أسوان",
      mainImage: porto1,
      additionalImages: [porto1, porto2, porto3, porto4, porto5]
    },
    {
      id: 5,
      title: "مكاني",
      description: "كافيه ومطعم عصري يقدم مجموعة متنوعة من المشروبات والوجبات الخفيفة والحلويات في أجواء هادئة",
      rating: 4.2,
      category: "كافيه",
      phone: "01234567894",
      whatsapp: "201234567894",
      facebook: "https://www.facebook.com/",
      address: "شارع الكورنيش، أسوان",
      mainImage: makany1,
      additionalImages: [makany1, makany2, makany3, makany4, makany5]
    },
    {
      id: 6,
      title: "كيوي",
      description: "مطعم وكافيه يقدم مزيجًا من المأكولات العالمية والمشروبات المميزة في أجواء عصرية",
      rating: 4.4,
      category: "مأكولات عالمية",
      phone: "01234567895",
      whatsapp: "201234567895",
      facebook: "https://www.facebook.com/",
      address: "شارع صلاح الدين، أسوان",
      mainImage: kiwi1,
      additionalImages: [kiwi1, kiwi2, kiwi3, kiwi4, kiwi5]
    },
    {
      id: 7,
      title: "هافانا",
      description: "مطعم وكافيه يقدم مأكولات بحرية طازجة ومشروبات متنوعة مع إطلالة خلابة على النيل",
      rating: 4.7,
      category: "مأكولات بحرية",
      phone: "01234567896",
      whatsapp: "201234567896",
      facebook: "https://www.facebook.com/",
      address: "كورنيش النيل، أسوان",
      mainImage: havana1,
      additionalImages: [havana1, havana2, havana3, havana4, havana5]
    }
  ];
  const categories = ["الكل", "مأكولات مصرية", "مأكولات نوبية", "مأكولات شامية", "مأكولات إيطالية", "مأكولات عالمية", "مأكولات بحرية", "كافيه"];

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setMainImage(item.mainImage);
    setShowModal(true);
  };

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

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesCategory = selectedCategory === "الكل" || restaurant.category === selectedCategory;
    const matchesSearch = restaurant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={{ flex: 1 }}>
      <NavBar navigation={navigation} />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>المطاعم والكافيهات في أسوان</Text>

        {/* Search and Filter */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="ابحث عن مطعم أو كافيه"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>

        <View style={styles.filterContainer}>
          <Text>التصنيف:</Text>
          <View style={styles.filter}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Restaurants List */}
        <FlatList
          data={filteredRestaurants}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity onPress={() => handleItemClick(item)}>
                <Image source={item.mainImage} style={styles.cardImage} />
              </TouchableOpacity>
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardCategory}>{item.category}</Text>
                <Text style={styles.cardDescription}>{item.description.substring(0, 100)}...</Text>
                <View style={styles.cardFooter}>
                  <View style={styles.stars}>
                    {renderStars(item.rating)}
                    <Text style={styles.rating}>{item.rating}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleItemClick(item)} style={styles.detailButton}>
                    <Text style={styles.buttonText}>عرض التفاصيل</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />

        {/* Modal for Restaurant Details */}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
    marginBottom: 70, // Add margin to account for BottomNav
  },
  title: { fontSize: 24, textAlign: 'center', marginVertical: 20 },
  searchContainer: { marginBottom: 20, alignItems: 'center' },
  searchInput: { width: '80%', padding: 10, borderWidth: 1, borderRadius: 20 },
  filterContainer: { marginBottom: 20 },
  filter: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
  categoryButton: { padding: 10, margin: 5, borderWidth: 1, borderRadius: 20 },
  selectedCategory: { backgroundColor: '#ddd' },
  card: { flexDirection: 'row', marginBottom: 20 },
  cardImage: { width: 100, height: 100, borderRadius: 10 },
  cardBody: { flex: 1, marginLeft: 10 },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  cardCategory: { fontSize: 14, color: 'gray' },
  cardDescription: { fontSize: 14, color: 'gray' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  stars: { flexDirection: 'row' },
  rating: { fontSize: 14, color: 'gold' },
  detailButton: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5 },
  buttonText: { color: 'white' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '80%', backgroundColor: 'white', borderRadius: 10, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold' },
  closeButton: { fontSize: 18, fontWeight: 'bold' },
  modalImage: { width: '100%', height: 200, borderRadius: 10 },
  imageThumbnails: { flexDirection: 'row', marginTop: 10 },
  thumbnail: { width: 50, height: 50, margin: 5, borderRadius: 5 },
  modalDescription: { marginTop: 20 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  ratingText: { fontSize: 14, color: 'gold', marginLeft: 10 },
  contactInfo: { marginTop: 20 },
  contactItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  contactText: { marginLeft: 10 },
});

export default RestaurantsPage;

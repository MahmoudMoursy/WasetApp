import React, { useState } from 'react';
import { View, Text, Image, FlatList, TextInput, TouchableOpacity, Modal, StyleSheet, ScrollView, Linking, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import NavBar from '../component/NavBar';
import BottomNav from '../component/bottomNav';

import raya1 from '../assets/service_imgs/سوبر ماركت/الراية/raya1.jpeg';
import raya2 from '../assets/service_imgs/سوبر ماركت/الراية/raya2.jpeg';
import raya3 from '../assets/service_imgs/سوبر ماركت/الراية/raya3.jpeg';
import raya4 from '../assets/service_imgs/سوبر ماركت/الراية/raya4.jpeg';
import raya5 from '../assets/service_imgs/سوبر ماركت/الراية/raya5.jpeg';

import carfor1 from '../assets/service_imgs/سوبر ماركت/كارفور/carfor1.jpeg';
import carfor2 from '../assets/service_imgs/سوبر ماركت/كارفور/carfor2.jpeg';
import carfor3 from '../assets/service_imgs/سوبر ماركت/كارفور/carfor3.jpeg';
import carfor4 from '../assets/service_imgs/سوبر ماركت/كارفور/carfor4.jpeg';
import carfor5 from '../assets/service_imgs/سوبر ماركت/كارفور/carfor5.jpeg';

import safa1 from '../assets/service_imgs/سوبر ماركت/الصفا ماركت/safa1.jpeg';
import safa2 from '../assets/service_imgs/سوبر ماركت/الصفا ماركت/safa2.jpeg';
import safa3 from '../assets/service_imgs/سوبر ماركت/الصفا ماركت/safa3.jpeg';
import safa4 from '../assets/service_imgs/سوبر ماركت/الصفا ماركت/safa4.jpeg';
import safa5 from '../assets/service_imgs/سوبر ماركت/الصفا ماركت/safa5.jpeg';

import wardny1 from '../assets/service_imgs/سوبر ماركت/الوردانى/wardny1.jpeg';
import wardny2 from '../assets/service_imgs/سوبر ماركت/الوردانى/wardny2.jpeg';

import kher1 from '../assets/service_imgs/سوبر ماركت/خير زمان/kher1.jpeg';
import kher2 from '../assets/service_imgs/سوبر ماركت/خير زمان/kher2.jpeg';
import kher3 from '../assets/service_imgs/سوبر ماركت/خير زمان/kher3.jpeg';
import kher4 from '../assets/service_imgs/سوبر ماركت/خير زمان/kher4.jpeg';

function SupermarketsPage({ navigation }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mainImage, setMainImage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const supermarkets = [
    {
      id: 1,
      title: 'سوبر ماركت الراية',
      image: raya1,
      description: 'جميع احتياجاتك اليومية بأفضل الأسعار ',
      rating: 4.7,
      phone: '16508',
      whatsapp: '01003116508',
      facebook: 'https://facebook.com/ahrammarket',
      address: 'الكورنيش ',
      additionalImages: [
        raya2,
        raya3,
        raya4,
        raya5
      ]
    },
    {
      id: 2,
      title: 'سوبر ماركت كارفور',
      image: carfor1,
      description: 'منتجات طازجة يومياً - عروض وخصومات أسبوعية',
      rating: 4.6,
      phone: '01234567895',
      whatsapp: '01234567895',
      facebook: 'https://www.facebook.com/profile.php?id=61572669683671',
      address: 'شارع الفنادق، أمام فندق أولد كتراكت.',
      additionalImages: [
        carfor2,
        carfor3,
        carfor4,
        carfor5
      ]
    },
    {
      id: 3,
      title: 'سوبر ماركت الصفا',
      image: safa1,
      description: 'منتجات محلية وعالمية - أسعار منافسة',
      rating: 4.5,
      phone: '01234567896',
      whatsapp: '01234567896',
      facebook: 'https://www.facebook.com/profile.php?id=100063958424261',
      address: 'الرضوان',
      additionalImages: [
        safa2,
        safa3,
        safa4,
        safa5
      ]
    },
    {
      id: 4,
      title: 'سوبر ماركت الورداني',
      image: wardny1,
      description: 'تشكيلة واسعة من المنتجات - خدمة 24 ساعة',
      rating: 4.4,
      phone: '01222970744',
      whatsapp: '01222970744',
      facebook: 'https://www.facebook.com/profile.php?id=100063954844223',
      address: 'أمام مبني المحافظة',
      additionalImages: [
        wardny2,
        'https://images.unsplash.com/photo-1578916171728-46686eac8d58',
        'https://images.unsplash.com/photo-1542838132-92c53300491e',
        'https://images.unsplash.com/photo-1534723452862-4c874018d66d'
      ]
    },
    {
      id: 5,
      title: 'سوبر ماركت خير زمان',
      image: kher1,
      description: 'تشكيلة واسعة من المنتجات - خدمة 24 ساعة',
      rating: 4.4,
      phone: '01222970744',
      whatsapp: '01222970744',
      facebook: 'https://www.facebook.com/profile.php?id=61569073838882',
      address: 'كسر الحجر ، الاشارة ، مطلع الشهر العقارى امام المخبز البلدي',
      additionalImages: [
        kher2,
        kher3,
        kher4,
      ]
    }
  ];

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

  const filteredSupermarkets = supermarkets.filter(supermarket =>
    supermarket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supermarket.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      <NavBar navigation={navigation} />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>السوبر ماركت في أسوان</Text>

        {/* Search and Filter */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="   ابحث عن سوبر ماركت "
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>

        {/* Supermarkets List */}
        <FlatList
          data={filteredSupermarkets}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity onPress={() => handleItemClick(item)}>
                <Image source={item.image} style={styles.cardImage} />
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
  ratingText: { fontSize: 14, fontWeight: 'bold', marginLeft: 10 },
  contactInfo: { marginTop: 20 },
  contactItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  contactText: { marginLeft: 10 },
});

export default SupermarketsPage;

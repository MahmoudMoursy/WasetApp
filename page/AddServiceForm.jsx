import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

const AddServiceForm = () => {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    rating: '',
    phone: '',
    whatsapp: '',
    facebook: '',
    address: '',
    mainImage: null,
    additionalImages: []
  });

  const categories = [
    { id: '1', name: 'المطاعم والكافيهات' },
    { id: '2', name: 'الصيدليات' },
    { id: '3', name: 'الأطباء' },
    { id: '4', name: 'سوبر ماركت' }
  ];

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const pickMainImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData(prev => ({
        ...prev,
        mainImage: result.assets[0],
      }));
    }
  };

  const pickAdditionalImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData(prev => ({
        ...prev,
        additionalImages: [...prev.additionalImages, ...result.assets],
      }));
    }
  };

  const removeAdditionalImage = (index) => {
    const newImages = [...formData.additionalImages];
    newImages.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      additionalImages: newImages,
    }));
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>إضافة خدمة جديدة</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>نوع الخدمة:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={formData.category}
            onValueChange={(value) => handleInputChange('category', value)}
            style={styles.picker}
          >
            <Picker.Item label="اختر نوع الخدمة" value="" />
            {categories.map(category => (
              <Picker.Item key={category.id} label={category.name} value={category.id} />
            ))}
          </Picker>
        </View>
      </View>

      {[
        { key: 'title', label: 'اسم المكان', placeholder: 'أدخل اسم المكان' },
        { key: 'description', label: 'الوصف', placeholder: 'أدخل الوصف', multiline: true },
        { key: 'rating', label: 'التقييم', placeholder: 'من 0 إلى 5', keyboardType: 'numeric' },
        { key: 'phone', label: 'رقم الهاتف', placeholder: 'أدخل رقم الهاتف', keyboardType: 'phone-pad' },
        { key: 'whatsapp', label: 'رقم الواتساب', placeholder: 'أدخل رقم الواتساب', keyboardType: 'phone-pad' },
        { key: 'facebook', label: 'رابط الفيسبوك', placeholder: 'أدخل رابط الفيسبوك', keyboardType: 'url' },
        { key: 'address', label: 'العنوان', placeholder: 'أدخل العنوان' },
      ].map(field => (
        <View key={field.key} style={styles.formGroup}>
          <Text style={styles.label}>{field.label}:</Text>
          <TextInput
            style={[styles.input, field.multiline && styles.textArea]}
            value={formData[field.key]}
            onChangeText={(text) => handleInputChange(field.key, text)}
            placeholder={field.placeholder}
            keyboardType={field.keyboardType}
            multiline={field.multiline}
            numberOfLines={field.multiline ? 4 : 1}
          />
        </View>
      ))}

      <View style={styles.formGroup}>
        <Text style={styles.label}>الصورة الرئيسية:</Text>
        <TouchableOpacity style={styles.imageButton} onPress={pickMainImage}>
          <Text style={styles.buttonText}>اختر صورة رئيسية</Text>
        </TouchableOpacity>
        {formData.mainImage && (
          <Image source={{ uri: formData.mainImage.uri }} style={styles.imagePreview} />
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>صور إضافية (حد أقصى 4 صور):</Text>
        <TouchableOpacity style={styles.imageButton} onPress={pickAdditionalImages}>
          <Text style={styles.buttonText}>اختر صور إضافية</Text>
        </TouchableOpacity>
        <View style={styles.imagePreviews}>
          {formData.additionalImages.map((image, index) => (
            <View key={index} style={styles.imagePreviewContainer}>
              <Image source={{ uri: image.uri }} style={styles.imagePreview} />
              <TouchableOpacity style={styles.removeImageButton} onPress={() => removeAdditionalImage(index)}>
                <Text style={styles.removeImageText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>إضافة الخدمة</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 5, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', color: '#3498db', textAlign: 'center', marginBottom: 20 },
  formGroup: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50', marginBottom: 8, textAlign: 'right' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 4, padding: 10, fontSize: 16, textAlign: 'right' },
  textArea: { height: 100, textAlignVertical: 'top' },
  pickerWrapper: { borderWidth: 1, borderColor: '#ddd', borderRadius: 4 },
  picker: { height: 50, width: '100%' },
  imageButton: { backgroundColor: '#f0f0f0', padding: 12, borderRadius: 4, alignItems: 'center', marginBottom: 10 },
  buttonText: { color: '#2c3e50', fontSize: 16 },
  imagePreview: { width: 100, height: 100, borderRadius: 4, marginRight: 10 },
  imagePreviews: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 },
  imagePreviewContainer: { position: 'relative', marginRight: 10, marginBottom: 10 },
  removeImageButton: {
    position: 'absolute', top: 0, right: 0, backgroundColor: 'red',
    width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center'
  },
  removeImageText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  submitButton: { backgroundColor: '#3498db', padding: 15, borderRadius: 4, alignItems: 'center', marginTop: 20 ,marginBottom: 10},
  submitButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});

export default AddServiceForm;
// UploadPhoto.js
import axios from 'axios';

export const UploadPhoto = async (file) => {
  try {
    const data = new FormData();
    data.append('file', {
      uri: file.uri,
      type: 'image/jpeg',
      name: 'photo.jpg'
    });
    data.append('upload_preset', 'Abdalla');
    data.append('cloud_name', 'dfievnowq');

    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dfievnowq/image/upload',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        },
        timeout: 30000, // 30 seconds timeout
        maxContentLength: 10485760, // 10MB max file size
        maxBodyLength: 10485760
      }
    );

    if (response.data && response.data.secure_url) {
      return response.data.secure_url;
    } else {
      throw new Error('No secure URL returned from Cloudinary');
    }
  } catch (error) {
    console.error('Upload error:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(`Upload failed: ${error.response.data.error.message}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from server. Please check your internet connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Upload failed: ${error.message}`);
    }
  }
};

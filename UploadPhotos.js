export const UploadPhotos = async (images) => {
    const uploadedUrls = [];

    for (const image of images) {
        try {
            const formData = new FormData();
            formData.append('file', {
                uri: image.uri,
                type: image.type || 'image/jpeg',
                name: image.name || 'photo.jpg'
            });
            formData.append('upload_preset', 'Abdalla');
            formData.append('cloud_name', 'dfievnowq');

            const res = await fetch('https://api.cloudinary.com/v1_1/dfievnowq/image/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (!res.ok) {
                throw new Error(`Upload failed with status ${res.status}`);
            }

            const data = await res.json();
            if (data.secure_url) {
                uploadedUrls.push(data.secure_url);
            } else {
                throw new Error('No secure URL returned from Cloudinary');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error(`Failed to upload image: ${error.message}`);
        }
    }

    return uploadedUrls;
};

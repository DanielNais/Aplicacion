import React, { useState, useEffect } from 'react';
import { imagePaths } from './ImageContainer.jsx';

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const importImages = async () => {
      const importedImages = await Promise.all(
        imagePaths.map(imagePath => import(imagePath))
      );

      setImages(importedImages.map(image => image.default));
    };

    importImages();
  }, []);

  return (
    <div className='col-4'>
      {images.map((image, index) => (
        <img key={index} src={image} alt={`Image ${index}`} style={{maxWidth: "400px"}}/>
      ))}
    </div>
  );
};

export default ImageGallery;

import { PrimaryButton } from "@fluentui/react";
import React, { useState } from 'react';
import ThreeDImage from './Components/Components.jsx';
import ImageGallery from './Components/ImageGallery.jsx';

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    setUploadedImage(file);
  };

  return (
    <div>
      <h1>Subir imagen desde el navegador</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {uploadedImage && (
        <div>
          <h2>Imagen cargada:</h2>
          <img src={URL.createObjectURL(uploadedImage)} alt="Imagen cargada" style={{ maxWidth: '100%', maxHeight: '400px' }} />
          <ThreeDImage imageFile={uploadedImage} />
        </div>
      )}
      <ImageGallery />
      <div>
                {/* ----------------- HOST PAGE UI */}
                <div style={{ display: 'flex' }}>
                    Host page
                    <PrimaryButton
                        text={"Load Project"}
                        //onClick={this.loadProject}
                        style={{ marginLeft: '10px' }}
                    />
                    <PrimaryButton
                        text={"Apply Tile"}
                        //onClick={this.applyTile}
                        style={{ marginLeft: '10px' }}
                    />

                    <PrimaryButton
                        text={"Apply Tile 2"}
                        //onClick={this.applyTile2}
                        style={{ marginLeft: '10px' }}
                    />

                    <PrimaryButton
                        text={"Change pattern"}
                        //onClick={this.changePattern}
                        style={{ marginLeft: '10px' }}
                    />
                </div>


            </div>
    </div>
  );
}

export default App;

import React, { useState, useRef } from 'react';

const ImageUploader = ({ onImagesChange, initialImages = [] }) => {
  const [images, setImages] = useState(initialImages);
  const [previewImages, setPreviewImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddImages = () => {
    const newImages = [...images, ...previewImages];
    setImages(newImages);
    setPreviewImages([]);
    onImagesChange(newImages);
    fileInputRef.current.value = '';
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages);
  };

  const handleRemovePreview = (index) => {
    const newPreviews = previewImages.filter((_, i) => i !== index);
    setPreviewImages(newPreviews);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <label className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
          Seleccionar fotos
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            ref={fileInputRef}
          />
        </label>
        
        {previewImages.length > 0 && (
          <button
            onClick={handleAddImages}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Agregar fotos
          </button>
        )}
      </div>

      {/* Vista previa de nuevas imágenes */}
      {previewImages.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium text-gray-700">Vista previa:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {previewImages.map((img, index) => (
              <div key={`preview-${index}`} className="relative group">
                <img
                  src={img}
                  alt={`Preview ${index}`}
                  className="h-24 w-full object-cover rounded-lg"
                />
                <button
                  onClick={() => handleRemovePreview(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Imágenes existentes */}
      <div className="space-y-2">
        <h3 className="font-medium text-gray-700">Fotos del quincho:</h3>
        {images.length === 0 ? (
          <p className="text-gray-500 text-sm">No hay fotos aún</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {images.map((img, index) => (
              <div key={`image-${index}`} className="relative group">
                <img
                  src={img}
                  alt={`Quincho ${index}`}
                  className="h-24 w-full object-cover rounded-lg"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;

// DONE
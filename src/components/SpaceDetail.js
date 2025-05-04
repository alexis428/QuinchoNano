import React, { useState, useEffect } from 'react';
import { getSpaceById, updateSpaceImages } from '../utilities/storage';
import ImageUploader from './ImageUploader';

const SpaceDetail = ({ id, onBack, onBooking }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [space, setSpace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    console.log('ID recibido:', id);
    const loadedSpace = getSpaceById(id);
    console.log('Espacio cargado:', loadedSpace);
    setSpace(loadedSpace);
    setIsLoading(false);
  }, [id]);

  const nextImage = () => {
    if (space?.images?.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % space.images.length);
    }
  };

  const prevImage = () => {
    if (space?.images?.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + space.images.length) % space.images.length);
    }
  };

  const handleImagesChange = (newImages) => {
    const updatedSpace = { ...space, images: newImages };
    setSpace(updatedSpace);
  };

  const handleSave = () => {
    updateSpaceImages(space.id, space.images);
    setIsEditing(false);
  };

  if (isLoading) return <div className="text-center py-12">Cargando...</div>;
  if (!space) return <div className="text-center py-12">No se encontró el espacio</div>;

  const hasImages = space.images?.length > 0;
  const currentImage = hasImages ? space.images[currentImageIndex] : null;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <button 
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver a espacios
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {isEditing ? (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Editar fotos del quincho</h3>
            <ImageUploader 
              onImagesChange={handleImagesChange} 
              initialImages={space.images} 
            />
            <button
              onClick={handleSave}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Guardar cambios
            </button>
          </div>
        ) : (
          <>
            <div className="relative h-[500px] overflow-hidden bg-gray-100 flex items-center justify-center">
              {hasImages && (
                <>
                  <img 
                    src={currentImage} 
                    alt={space.name}
                    className="w-full h-full object-contain"
                  />
                  {space.images.length > 1 && (
                    <>
                      <button 
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 z-10"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button 
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 z-10"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20">
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="flex space-x-2">
                        {space.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{space.name}</h2>
                  <p className="text-gray-600">{space.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">${space.price.toLocaleString()}</p>
                  <p className="text-gray-500">por día</p>
                </div>
              </div>

              {space.features && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Características</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {space.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {space.included && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Incluye</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {space.included.map((item, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {space.rules && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Reglas</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {space.rules.map((rule, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={() => onBooking(space.id)}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg shadow-md"
              >
                Reservar ahora
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SpaceDetail;
import { useState, useEffect } from 'react';
import { getSpacesData, deleteSpace } from '../utilities/storage';
import { isAdmin, verifyAdminPassword } from '../utilities/auth';
import LoginForm from './LoginForm';

const SpacesGallery = ({ onSpaceSelect, onCreateNew }) => {
  const [spaces, setSpaces] = useState([]);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [spaceToDelete, setSpaceToDelete] = useState(null);

  useEffect(() => {
    const loadSpaces = () => {
      const storedSpaces = getSpacesData();
      setSpaces(storedSpaces);
    };

    loadSpaces();
    // Recargar espacios cuando la vista se monta
    window.addEventListener('storage', loadSpaces);
    return () => window.removeEventListener('storage', loadSpaces);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleCreateNewClick = () => {
    if (isAdmin()) {
      onCreateNew();
    } else {
      setShowLoginForm(true);
    }
  };

  const handleDelete = (e, spaceId) => {
    e.stopPropagation();
    setSpaceToDelete(spaceId);
    setShowDeleteConfirm(true);
    setDeleteError('');
  };

  const confirmDelete = (e) => {
    e.preventDefault();
    if (verifyAdminPassword(deletePassword)) {
      deleteSpace(spaceToDelete);
      const updatedSpaces = spaces.filter(space => space.id !== spaceToDelete);
      setSpaces(updatedSpaces);
      setShowDeleteConfirm(false);
      setDeletePassword('');
      setSpaceToDelete(null);
    } else {
      setDeleteError('Contraseña incorrecta');
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Nuestros Espacios</h2>
          <button
            onClick={handleCreateNewClick}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            {isAdmin() ? 'Crear Nuevo Espacio' : 'Acceso Admin'}
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          {spaces.map((space) => (
            <div 
              key={space.id} 
              className="relative bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 cursor-pointer"
              onClick={() => onSpaceSelect(space.id)}
            >
              {isAdmin() && (
                <button
                  onClick={(e) => handleDelete(e, space.id)}
                  className="absolute top-2 right-2 z-10 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                  title="Eliminar espacio"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <div className="h-48 sm:h-64 relative overflow-hidden">
                <img 
                  src={space.images[0]} 
                  alt={space.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white">{space.name}</h3>
                  <p className="text-gray-200 text-sm sm:text-base">{space.description}</p>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div className="mb-2 sm:mb-0">
                    <span className="text-lg sm:text-xl font-bold text-gray-900">
                      {formatPrice(space.price)}
                    </span>
                    <p className="text-gray-500 text-sm">por día</p>
                  </div>
                  <button 
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Seleccionando espacio con ID:', space.id);
                      onSpaceSelect(space.id);
                    }}
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} />}
      
      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirmar eliminación</h2>
            <form onSubmit={confirmDelete}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ingrese la contraseña de administrador para confirmar
                </label>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              {deleteError && <p className="text-red-500 mb-4">{deleteError}</p>}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeletePassword('');
                    setDeleteError('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpacesGallery;
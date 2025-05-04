import { useState, useEffect } from 'react';
import { getReservations, updateReservation, deleteReservation } from '../utilities/storage';
import { spacesData } from '../mock/data';

const ReservationsList = ({ onBack }) => {
  const [reservations, setReservations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    date: '',
    guests: 1
  });

  useEffect(() => {
    setReservations(getReservations());
  }, []);

  const getSpaceImage = (spaceId) => {
    const space = spacesData.find(s => s.id === spaceId);
    return space ? space.image : '';
  };

  const handleEditClick = (reservation) => {
    setEditingId(reservation.id);
    setEditForm({
      date: reservation.date,
      guests: reservation.guests
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = (id) => {
    updateReservation(id, {
      date: editForm.date,
      guests: parseInt(editForm.guests)
    });
    setReservations(getReservations());
    setEditingId(null);
  };

  const handleCancelReservation = (id) => {
    if (window.confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      deleteReservation(id);
      setReservations(getReservations());
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 sm:py-16 px-4 sm:px-6">
      <div className="mb-6 sm:mb-12">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a inicio
        </button>
      </div>
      
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Mis Reservas</h2>
      
      {reservations.length === 0 ? (
        <div className="text-center py-12 sm:py-16 bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200">
          <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg sm:text-xl font-medium text-gray-700 mb-2">No tienes reservas aún</h3>
          <p className="text-gray-500 text-sm sm:text-base mb-4 sm:mb-6">Explora nuestros espacios y haz tu primera reserva</p>
          <button 
            className="bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm sm:text-base"
            onClick={onBack}
          >
            Ver espacios disponibles
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Espacio</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservations.map(reservation => (
                <tr key={reservation.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full object-cover" src={getSpaceImage(reservation.spaceId)} alt={reservation.space} />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{reservation.space}</div>
                        <div className="text-xs text-gray-500">{reservation.guests} invitados</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-4 py-4 whitespace-nowrap">
                    {editingId === reservation.id ? (
                      <input
                        type="date"
                        name="date"
                        value={editForm.date}
                        onChange={handleEditChange}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    ) : (
                      <div className="text-sm text-gray-900">{reservation.date}</div>
                    )}
                  </td>
                  
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    {editingId === reservation.id ? (
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEditSubmit(reservation.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Guardar
                        </button>
                        <button 
                          onClick={() => setEditingId(null)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => handleEditClick(reservation)}
                          className="text-gray-900 hover:text-gray-600"
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => handleCancelReservation(reservation.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Cancelar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReservationsList;

// DONE
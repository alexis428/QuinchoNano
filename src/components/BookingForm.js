import { useState } from 'react';
import { addReservation } from '../utilities/storage';
import { spacesData } from '../mock/data';

const BookingForm = ({ spaceId, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: 1,
    spaceId: spaceId || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedSpace = spacesData.find(s => s.id === parseInt(formData.spaceId));
    
    const reservation = {
      id: Date.now(),
      space: selectedSpace.name,
      spaceId: selectedSpace.id,
      date: formData.date,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      guests: formData.guests,
      price: selectedSpace.price
    };

    addReservation(reservation);
    alert(`Reserva confirmada para ${selectedSpace.name} el ${formData.date}`);
    onBack();
  };

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-16 px-4 sm:px-6">
      <div className="mb-6 sm:mb-8">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a espacios
        </button>
      </div>
      
      <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="bg-gray-900 text-white px-6 py-3 sm:px-8 sm:py-4">
          <h2 className="text-xl sm:text-2xl font-semibold">Formulario de Reserva</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">Nombre completo</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm sm:text-base"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm sm:text-base"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">Teléfono</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm sm:text-base"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">Fecha</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm sm:text-base"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">Espacio</label>
              <select
                name="spaceId"
                value={formData.spaceId}
                onChange={handleChange}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm sm:text-base"
                required
                disabled={!!spaceId}
              >
                <option value="">Selecciona un espacio</option>
                {spacesData.map(space => (
                  <option key={space.id} value={space.id}>{space.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">Invitados</label>
              <input
                type="number"
                name="guests"
                min="1"
                value={formData.guests}
                onChange={handleChange}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm sm:text-base"
                required
              />
            </div>
          </div>
          
          <div className="mt-6 sm:mt-10">
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-sm sm:text-base sm:text-lg shadow-md"
            >
              Confirmar Reserva
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
import { useState } from 'react';
import HeroSection from './components/HeroSection';
import FeaturesGrid from './components/FeaturesGrid';
import SpacesGallery from './components/SpacesGallery';
import BookingForm from './components/BookingForm';
import ReservationsList from './components/ReservationsList';
import SpaceDetail from './components/SpaceDetail';
import Footer from './components/Footer';
import CreateSpace from './components/CreateSpace';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedSpaceId, setSelectedSpaceId] = useState(null);

  const renderView = () => {
    switch(currentView) {
      case 'createSpace':
        return <CreateSpace onBack={() => setCurrentView('home')} />;
      case 'booking':
        return <BookingForm spaceId={selectedSpaceId} onBack={() => setCurrentView('home')} />;
      case 'reservations':
        return <ReservationsList onBack={() => setCurrentView('home')} />;
      case 'spaceDetail':
        return (
          <SpaceDetail 
            id={selectedSpaceId} 
            onBack={() => setCurrentView('home')}
            onBooking={(id) => {
              setSelectedSpaceId(id);
              setCurrentView('booking');
            }}
          />
        );
      default:
        return (
          <>
            <HeroSection />
            <FeaturesGrid />
            <SpacesGallery 
              onSpaceSelect={(id) => {
                setSelectedSpaceId(id);
                setCurrentView('spaceDetail');
              }}
              onCreateNew={() => setCurrentView('createSpace')}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-600">QuinchoNano</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <button 
                  onClick={() => setCurrentView('home')}
                  className={`font-medium ${currentView === 'home' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}
                >
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setSelectedSpaceId(null);
                    setCurrentView('booking');
                  }}
                  className={`font-medium ${currentView === 'booking' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}
                >
                  Reservar
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentView('reservations')}
                  className={`font-medium ${currentView === 'reservations' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}
                >
                  Mis Reservas
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow">
        {renderView()}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
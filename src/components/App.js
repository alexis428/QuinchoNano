import { useState, useEffect } from 'react';
import { initializeDefaultSpaces } from '../utilities/storage';
import Header from './Header';
import SpacesGallery from './SpacesGallery';
import SpaceDetail from './SpaceDetail';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedSpaceId, setSelectedSpaceId] = useState(null);

  // Inicializar datos por defecto
  useEffect(() => {
    initializeDefaultSpaces();
  }, []);

  const renderView = () => {
    switch(currentView) {
      case 'spaceDetail':
        return (
          <SpaceDetail 
            spaceId={selectedSpaceId} 
            onBack={() => setCurrentView('home')}
          />
        );
      default:
        return (
          <>
            <SpacesGallery 
              onSpaceSelect={(id) => {
                setSelectedSpaceId(id);
                setCurrentView('spaceDetail');
              }}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        setSelectedSpaceId={setSelectedSpaceId}
      />
      <main className="flex-grow">
        {renderView()}
      </main>
    </div>
  );
};

export default App;

// DONE
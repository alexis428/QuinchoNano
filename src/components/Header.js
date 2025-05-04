const Header = ({ currentView, setCurrentView }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600">QuinchoNano</h1>
        
        {/* Menú para desktop */}
        <nav className="hidden md:block">
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
        
        {/* Menú hamburguesa para móvil */}
        <button 
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="md:hidden bg-white py-2 px-4 shadow-md">
          <ul className="space-y-3">
            <li>
              <button 
                onClick={() => {
                  setCurrentView('home');
                  setMenuOpen(false);
                }}
                className={`block w-full text-left py-2 ${currentView === 'home' ? 'text-green-600' : 'text-gray-600'}`}
              >
                Inicio
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  setSelectedSpaceId(null);
                  setCurrentView('booking');
                  setMenuOpen(false);
                }}
                className={`block w-full text-left py-2 ${currentView === 'booking' ? 'text-green-600' : 'text-gray-600'}`}
              >
                Reservar
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  setCurrentView('reservations');
                  setMenuOpen(false);
                }}
                className={`block w-full text-left py-2 ${currentView === 'reservations' ? 'text-green-600' : 'text-gray-600'}`}
              >
                Mis Reservas
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
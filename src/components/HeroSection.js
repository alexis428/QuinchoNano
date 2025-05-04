const HeroSection = () => {
  return (
    <div className="relative text-white py-28 px-4 overflow-hidden">
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        }}
      />
      {/* Superposición gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50"></div>
      
      {/* Contenido */}
      <div className="max-w-6xl mx-auto relative z-10 text-center">
        <h1 className="text-5xl font-bold mb-6 leading-tight">Espacios Exclusivos <br/> para tus Eventos</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">Reserva quinchos y canchas con nuestro sistema de reservas de alto nivel</p>
        <button className="bg-white text-gray-900 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
          Explorar Espacios
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
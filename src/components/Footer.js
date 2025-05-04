const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">QuinchoNano</h3>
          <p className="text-gray-400">Los mejores espacios para tus eventos y reuniones.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Contacto</h3>
          <p className="text-gray-400">info@quinchoreserve.com</p>
          <p className="text-gray-400">+54 11 1234-5678</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Horarios</h3>
          <p className="text-gray-400">Lunes a Viernes: 9am - 8pm</p>
          <p className="text-gray-400">Sábados y Domingos: 10am - 10pm</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
        <p>© 2023 QuinchoReserve. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
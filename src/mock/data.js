export const defaultSpaces = [
  {
    id: 1,
    name: "Quincho Fiesta",
    description: "Espacio amplio con parrilla profesional y piscina climatizada",
    price: 18000,
    images: [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
    ],
    features: [
      "Parrilla profesional de acero inoxidable",
      "Piscina climatizada con hidromasaje",
      "Capacidad para 25 personas",
      "Terraza con vista panorámica",
      "Cocina totalmente equipada"
    ],
    dimensions: "120 m²",
    included: ["Muebles de exterior", "Vajilla completa", "Equipo de sonido", "WiFi premium"],
    rules: ["No fumar en áreas cerradas", "Máximo 30 personas", "Prohibido ingresar con mascotas"]
  },
  {
    id: 2,
    name: "Cancha de Fútbol 5",
    description: "Cancha profesional con césped sintético",
    price: 9000,
    images: [
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1605&q=80"
    ]
  }
];

export let spacesData = [...defaultSpaces];

export const updateSpacesData = (newSpaces) => {
  spacesData = newSpaces;
};
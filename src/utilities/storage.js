import { defaultSpaces, updateSpacesData } from '../mock/data';

export const getSpacesData = () => {
  const data = localStorage.getItem('spacesData');
  try {
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error parsing spaces data:', error);
    return [];
  }
};

export const saveSpacesData = (data) => {
  try {
    localStorage.setItem('spacesData', JSON.stringify(data));
    updateSpacesData(data); // Sincronizar con data.js
  } catch (error) {
    console.error('Error saving spaces data:', error);
  }
};

export const getSpaceById = (id) => {
  const spaces = getSpacesData();
  const numericId = parseInt(id);
  console.log('Buscando espacio con ID:', numericId);
  console.log('Espacios disponibles:', spaces);
  return spaces.find(space => space.id === numericId);
};

export const updateSpaceImages = (id, images) => {
  const spaces = getSpacesData();
  const updatedSpaces = spaces.map(space => 
    space.id === id ? { ...space, images } : space
  );
  saveSpacesData(updatedSpaces);
  return updatedSpaces;
};

export const initializeDefaultSpaces = () => {
  if (!localStorage.getItem('spacesData')) {
    saveSpacesData(defaultSpaces);
  }
};

export const getReservations = () => {
  const data = localStorage.getItem('reservationsData');
  try {
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error parsing reservations data:', error);
    return [];
  }
};

export const saveReservations = (data) => {
  try {
    localStorage.setItem('reservationsData', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving reservations data:', error);
  }
};

export const addReservation = (reservation) => {
  const reservations = getReservations();
  reservations.push(reservation);
  saveReservations(reservations);
};

export const updateReservation = (id, updates) => {
  const reservations = getReservations();
  const updatedReservations = reservations.map(reservation =>
    reservation.id === id ? { ...reservation, ...updates } : reservation
  );
  saveReservations(updatedReservations);
};

export const deleteReservation = (id) => {
  const reservations = getReservations();
  const filteredReservations = reservations.filter(reservation => reservation.id !== id);
  saveReservations(filteredReservations);
};

export const addNewSpace = (spaceData) => {
  const spaces = getSpacesData();
  const newSpace = {
    ...spaceData,
    id: spaces.length > 0 ? Math.max(...spaces.map(s => s.id)) + 1 : 1
  };
  
  const updatedSpaces = [...spaces, newSpace];
  saveSpacesData(updatedSpaces);
  updateSpacesData(updatedSpaces); // Sincronizar con data.js
  
  return newSpace;
};

export const deleteSpace = (id) => {
  const spaces = getSpacesData();
  const updatedSpaces = spaces.filter(space => space.id !== id);
  saveSpacesData(updatedSpaces);
  updateSpacesData(updatedSpaces);
  return updatedSpaces;
};
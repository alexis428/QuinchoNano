const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

export const login = (username, password) => {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    localStorage.setItem('isAdmin', 'true');
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem('isAdmin');
};

export const isAdmin = () => {
  return localStorage.getItem('isAdmin') === 'true';
};

export const verifyAdminPassword = (password) => {
  return password === ADMIN_CREDENTIALS.password;
};

export const getStorageKey = (baseKey, user) => {
  if (user && user.uid) {
    return `${baseKey}_${user.uid}`;
  }
  return `${baseKey}_guest`;
};

export const saveToStorage = (baseKey, user, data) => {
  const key = getStorageKey(baseKey, user);
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromStorage = (baseKey, user, fallback = []) => {
  const key = getStorageKey(baseKey, user);
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : fallback;
};

export const removeFromStorage = (baseKey, user) => {
  const key = getStorageKey(baseKey, user);
  localStorage.removeItem(key);
};

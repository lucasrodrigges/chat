export const getFromLS = (key) => JSON.parse(localStorage.getItem(key));

export const setToLS = (key, data) => localStorage.setItem(key, JSON.stringify(data));

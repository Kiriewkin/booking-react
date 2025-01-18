export function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

export function clearLocalStorage(key) {
    localStorage.removeItem(key)
}
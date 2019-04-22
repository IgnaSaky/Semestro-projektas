export function getFromStorage(key) {
    if (!key) {
        return null;
    }
    try {
        const valueStr = localStorage.getItem(key); 
        if (valueStr) {
            return JSON.parse(valueStr);
        }
        else {
            return null;
        }
    } catch (error) {
        return null
    }
}
export function setInStorage(key, obj) {
    if (!key) {
        console.error('Error: key is missing')
    }
    try {
        localStorage.setItem(key, JSON.stringify(obj));
    } catch (error) {
        console.error(error);
    }
}
export function removeFromStorage(key) {
    if (!key) {
        console.error('Error: key is missing')
    }
    try {
        localStorage.removeItem(key)
    } catch (error) {
        console.error(error);
    }
}
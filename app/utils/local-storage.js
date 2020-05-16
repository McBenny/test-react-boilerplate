/**
 * localStorageService use window.localStorage
 * @type {string}
 */
const ERROR_MSG = 'key is undefined, please verify code';

let localData;
let isStorageValid;

function chooseStorage() {
    let chosenStorage;
    try {
        chosenStorage = window.localStorage;
        isStorageValid = true;
    } catch (e) {
        isStorageValid = false;
    }
    return chosenStorage;
}

const storage = chooseStorage();
function isValid() {
    return isStorageValid;
}

function get(key) {
    if (!key) {
        return false;
    }

    if (localData && localData[key]) {
        return localData[key];
    }

    try {
        let data;
        if (isValid()) {
            try {
                data = storage.getItem(key);
                isStorageValid = true;
            } catch (e) {
                isStorageValid = false;
            }
        }
        if (!localData) {
            localData = {};
        }
        localData[key] = JSON.parse(data);

        return localData[key];
    } catch (e) {
        return undefined;
    }
}

function set(key, value) {
    if (!key) {
        throw ERROR_MSG;
    }

    if (!localData) {
        localData = {};
    }
    localData[key] = value;

    if (isValid()) {
        try {
            storage.setItem(key, JSON.stringify(value));
            isStorageValid = true;
        } catch (e) {
            isStorageValid = false;
        }
    }
}

function clear() {
    localData = undefined;
    if (isValid()) {
        try {
            storage.clear();
            isStorageValid = true;
        } catch (e) {
            isStorageValid = false;
        }
    }
}

function remove(key) {
    if (localData) {
        delete localData[key];
        if (isValid()) {
            try {
                storage.removeItem(key);
                isStorageValid = true;
            } catch (e) {
                isStorageValid = false;
            }
        }
    }
}

export default { get, set, remove, clear };

import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secret-key'; // Change this to a strong key

// Encrypt function
export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt function
export const decryptData = (data) => {
    if (!data) {
        return {}; // Return an empty object if data is empty
    }

    try {
        const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedData) {
            return {}; // Return an empty object if decryption results in an empty string
        }

        return JSON.parse(decryptedData);
    } catch (error) {
        console.error('Decryption error:', error);
        return {}; // Return an empty object in case of decryption failure
    }
};

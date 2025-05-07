// utils/auth.js
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode'; //to decode the token

// get the token from the SecureStore
export const getToken = async () => {
    return await SecureStore.getItemAsync('token');
};

// check if the token exists
export const isAuthenticated = async () => {
    const token = await getToken();
    return !!token; // return true if the token exists
};

// get the userId and the role from the token
export const getUserInfo = async () => {
    const token = await getToken();
    if (!token) return null;

    const decoded = jwtDecode(token);
    return { userId: decoded.userId, role: decoded.role };
};
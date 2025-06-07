// utils/auth.js
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode'; // Updated import syntax for v4

// get the token from the SecureStore
export const getToken = async () => {
    try {
        // Use the correct getItemAsync method
        const token = await SecureStore.getItemAsync('token');
        return token;
    } catch (error) {
        console.error('Error retrieving token:', error);
        return null;
    }
};

// check if the token exists
export const isAuthenticated = async () => {
    try {
        const token = await getToken();
        return !!token; // return true if the token exists
    } catch (error) {
        console.error('Error checking authentication:', error);
        return false;
    }
};

// get the userId and the role from the token
export const getUserInfo = async () => {
    try {
        const token = await getToken();
        if (!token) return null;

        const decoded = jwtDecode(token);
        return { userId: decoded.userId, role: decoded.role };
    } catch (error) {
        console.error('Error getting user info:', error);
        return null;
    }
};
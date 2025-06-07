import axios from "axios";
import { API_URL } from '@/config/config';
import { router } from 'expo-router';
import { Alert } from 'react-native'; // استبدل alert بـ Alert
import * as SecureStore from 'expo-secure-store';

// Import useNotifications would cause circular dependency, so we'll pass it as a parameter

export const login = async (identifier: string, password: string, onLoginSuccess?: () => Promise<void>) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, {
      identifier: identifier,
      password: password
    }, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200 && response.data) {
      const token = response.data.token;
      if (!token) {
        throw new Error('Token not found in response');
      }
      try {
        await SecureStore.setItemAsync('token', token);
        
        // Call the onLoginSuccess callback if provided (to update NotificationContext)
        if (onLoginSuccess) {
          await onLoginSuccess();
        }
      } catch (secureStoreError) {
        console.error('Failed to save token:', secureStoreError);
        throw new Error('Failed to save token');
      }

      router.push('/(home)/home');
      
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error: any) {
    console.log('Login error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });

    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || 
                           error.response?.data?.message || 
                           'Error signing in';
      Alert.alert('Error', errorMessage); // استخدام Alert من react-native
    }
    throw error;
  }
};

export default login;
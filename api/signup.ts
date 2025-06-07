import Config from 'react-native-config';
import axios from 'axios';
import alert from '@/errors/alert';
import { API_URL } from '@/config/config';
import { router } from 'expo-router';

export const signup = async (name: string, phone: string, email: string, password: string) => {
  try {
    if (!API_URL) {
      alert('error', 'server address (API_URL) is not defined');
      throw new Error('API_URL not defined');
    }

    const response = await axios.post(`${API_URL}/api/signup`,
       { name, phone, email, password },
       {
         timeout: 10000,
         headers: {
           'Content-Type': 'application/json'
         }
       });
 
    console.log('Server response:', response.data);
    router.push('/(auth)/login');
    return ;

  } catch (error: any) {
    console.log('Detailed error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || 
                         error.response?.data?.message || 
                         'an error occurred during signup';
      alert('error', errorMessage);
      throw new Error(errorMessage);
    }
    throw error;
  }
};

export default signup;
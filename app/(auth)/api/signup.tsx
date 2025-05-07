import Config from 'react-native-config';
import axios from 'axios';
import alert from '@/errors/alert';
import { API_URL , LOCAL_URL} from '@/config/config';
import { router } from 'expo-router';
const URL = LOCAL_URL; 

export const signup = async (name: string, phone: string, email: string, password: string) => {
  try {
    if (!URL) {
      alert('error', 'server address (API_URL) is not defined');
      throw new Error('API_URL not defined');
    }

    const response = await axios.post(`${URL}/api/signup`,
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
      const errorMessage = error.response?.data?.message || 
                         error.response?.data || 
                         'an error occurred during signup';
      alert('error', errorMessage);
      throw new Error(errorMessage);
    }
    throw error;
  }
};

export default signup;
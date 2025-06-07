import axios from 'axios';
import { API_URL, LOCAL_URL } from "@/config/config";
import { BabyName } from '@/data/babyNames';

const URL = LOCAL_URL;

export const saveBabyNames = async (token: string, letter: string, names: BabyName[]) => {
  try {
    console.log('Updating baby names for letter:', letter, 'Names:', names);
    
    // استخدام نقطة النهاية الجديدة للتحديث الشامل
    const response = await fetch(`${URL}/api/savedBabyNames/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ letter, names })
    });
    
    if (!response.ok) {
      throw new Error('فشل في تحديث الأسماء');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating baby names:', error);
    throw error;
  }
};

export const deleteBabyName = async (token: string, letter: string, name: string) => {
  try {
    console.log('Deleting baby name:', name, 'from letter:', letter);
    const response = await axios.delete(`${URL}/api/savedBabyNames/${letter}/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Delete baby name response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting baby name:', error);
    throw error;
  }
};

export const deleteLetter = async (token: string, letter: string) => {
  try {
    console.log('Deleting all baby names for letter:', letter);
    const response = await axios.delete(`${URL}/api/savedBabyNames/${letter}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Delete letter response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting letter:', error);
    throw error;
  }
};

export const getSavedBabyNames = async (token: string) => {
  try {
    if (!token) {
      console.log('No token provided');
      return [];
    }

    console.log('Fetching saved baby names with token:', token.substring(0, 10) + '...');
    const response = await axios.get(`${URL}/api/savedBabyNames`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000,
    });

    if (!response.data) {
      console.log('No data received from server');
      return [];
    }

    console.log('Saved baby names fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers
        }
      });

      if (error.response?.status === 404 || error.response?.status === 500) {
        console.log('No saved baby names found or server error, returning empty array');
        return [];
      }
    }

    console.error('Error fetching saved baby names:', error);
    return [];
  }
};

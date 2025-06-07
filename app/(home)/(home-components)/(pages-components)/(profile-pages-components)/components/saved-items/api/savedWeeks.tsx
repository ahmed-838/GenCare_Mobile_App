import axios from 'axios';
import { API_URL, LOCAL_URL } from "@/config/config";

const URL = LOCAL_URL;

export const saveWeek = async (token: string, week: string) => {
  try {
    console.log('Saving week:', week);
    
    const response = await axios.post(
      `${URL}/api/savedWeeks`,
      { week },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        timeout: 8000
      }
    );

    console.log('Save week response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error saving week:', error);
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        console.log('Week already saved');
        // إذا كان الأسبوع محفوظًا بالفعل، نعتبره نجاحًا
        return { success: true, message: 'Week already saved' };
      }
      
      if (error.response?.status === 500) {
        console.error('Server error (500):', error.response.data);
      }
      
      if (error.code === 'ECONNABORTED') {
        console.error('Request timeout');
      } else if (error.code === 'ERR_NETWORK') {
        console.error('Network error - check server connection');
      } else if (error.response) {
        console.error('Server responded with error:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('No response received from server');
      }
    }
    
    throw error;
  }
};

export const deleteWeek = async (token: string, week: string) => {
  try {
    console.log('Deleting week:', week);
    const response = await axios.delete(`${URL}/api/savedWeeks/${week}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Delete week response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting week:', error);
    throw error;
  }
};

export const getSavedWeeks = async (token: string) => {
  try {
    if (!token) {
      console.log('No token provided');
      return [];
    }

    console.log('Fetching saved weeks with token:', token.substring(0, 10) + '...');
    const response = await axios.get(`${URL}/api/savedWeeks`, {
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

    console.log('Saved weeks fetched successfully:', response.data);
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
        console.log('No saved weeks found or server error, returning empty array');
        return [];
      }
    }

    console.error('Error fetching saved weeks:', error);
    return [];
  }
};


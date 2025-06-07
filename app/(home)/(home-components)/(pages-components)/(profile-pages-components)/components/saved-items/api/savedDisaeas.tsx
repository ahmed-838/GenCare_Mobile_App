import axios from 'axios';
import { API_URL, LOCAL_URL } from "@/config/config";

const URL = LOCAL_URL;

export const getSavedItems = async (token: string) => {
  const response = await axios.get(`${URL}/saved-items`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const saveWeek = async (token: string, week: string) => {
  const response = await axios.post(
    `${URL}/saved-items/weeks`,
    { week },
    { headers: { Authorization: `Bearer ${token}` }}
  );
  return response.data;
};

export const deleteWeek = async (token: string, week: string) => {
  const response = await axios.delete(
    `${URL}/saved-items/weeks/${week}`,
    { headers: { Authorization: `Bearer ${token}` }}
  );
  return response.data;
};

export const saveDisease = async (token: string, disease: { name: string, _id: string }) => {
  try {
    console.log('Saving disease:', disease);
    
    const response = await axios.post(
      `${URL}/api/savedDiseases`,
      {
        diseaseId: disease._id,
        name: disease.name
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        timeout: 8000
      }
    );

    console.log('Save disease response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error saving disease:', error);
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        console.log('Disease already saved');
        // إذا كان المرض محفوظًا بالفعل، نعتبره نجاحًا
        return { success: true, message: 'Disease already saved' };
      }
      
      if (error.response?.status === 500) {
        console.error('Server error (500):', error.response.data);
        // يمكن إضافة معالجة خاصة لأخطاء ObjectId هنا
        if (error.response.data.error && error.response.data.error.includes('ObjectId')) {
          console.error('ObjectId error - this might be a server configuration issue');
        }
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

export const deleteDisease = async (token: string, diseaseId: string) => {
  try {
    console.log('Deleting disease:', diseaseId);
    const response = await axios.delete(`${URL}/api/savedDiseases/${diseaseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Delete disease response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting disease:', error);
    throw error;
  }
};

export const getSavedDiseases = async (token: string) => {
  try {
    if (!token) {
      console.log('No token provided');
      return [];
    }

    console.log('Fetching saved diseases with token:', token.substring(0, 10) + '...');
    const response = await axios.get(`${URL}/api/savedDiseases`, {
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

    console.log('Saved diseases fetched successfully:', response.data);
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
        console.log('No saved diseases found or server error, returning empty array');
        return [];
      }
    }

    console.error('Error fetching saved diseases:', error);
    return [];
  }
};

export const checkServerStatus = async () => {
  try {
    const response = await axios.get(`${URL}`, { timeout: 5000 });
    console.log('Server status:', response.status);
    return response.status === 200;
  } catch (error) {
    console.error('Server check failed:', error);
    return false;
  }
};
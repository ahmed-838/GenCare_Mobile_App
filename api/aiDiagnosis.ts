import axios from 'axios';
import { API_URL } from '@/config/config';

export const uploadImageForDiagnosis = async (imageUri: string): Promise<any> => {
  console.log('sending image for diagnosis:', imageUri);
  
  try {
    const formData = new FormData();
    
    const fileObj = {
      uri: imageUri,
      name: `image_${Date.now()}.jpg`,
      type: 'image/jpeg',
    };
    
    formData.append('file', fileObj as any);
    
    console.log('sending image to server...');
    
    const response = await axios.post(
      `${API_URL}/api/ai-diagnosis/analyze`, 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    
    console.log('received response:', response.status);
    
    return response.data;
  } catch (error: any) {
    console.error('error in sending image:', error.message);
    return { 
      success: false, 
      error: 'failed to analyze image' 
    };
  }
}; 

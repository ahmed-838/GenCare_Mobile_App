import { API_URL } from "@/config/config";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { ProfileFormData } from "../../../types/profile.types";
import { createSelfNotification } from "@/utils/notificationService";

// إضافة بيانات افتراضية للاستخدام في حالة فشل الاتصال بالخادم
const defaultProfileData: ProfileFormData = {
    fullName: '',
    age: '',
    phone: '',
    bloodType: '',
    pregnancyWeek: '',
    avatar: 'default.png'
};

export const getPersonalInfo = async () => {
    try {
        const token = await SecureStore.getItemAsync('token');

        console.log('API URL:', `${API_URL}/api/personalInfo`);
        
        const response = await axios.get(`${API_URL}/api/personalInfo`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        console.log('API Response:', response.data);
        
        if (response.data && response.data.personalInfo) {
            return response.data.personalInfo;
        } else if (response.data) {
            return response.data;
        }
        
        return defaultProfileData;
    } catch (error) {
        console.error('Error fetching personal info:', error);
        console.log('Error details:', (error as any).response?.data || 'No response data');
        
        return defaultProfileData;
    }
};

export const updatePersonalInfo = async (data: Partial<ProfileFormData>) => {
    try {
        const token = await SecureStore.getItemAsync('token');
        
        // تغيير المسار إلى المسار الصحيح المستخدم في الباك إند
        console.log('Update API URL:', `${API_URL}/api/personalInfo`);
        console.log('Update Data:', data);
        
        const response = await axios.put(`${API_URL}/api/personalInfo`, { personalInfo: data }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        console.log('Update API Response:', response.data);
        
        // Create a notification about the successful profile update
        try {
            await createSelfNotification({
                title: 'Profile Updated',
                description: 'Your profile information has been successfully updated.',
                icon: 'person-circle-outline',
                type: 'system'
            });
            
            // Refresh notifications in the app (optional implementation)
            // You could dispatch an event or use context to refresh the notifications list
        } catch (notificationError) {
            console.error('Error creating notification:', notificationError);
            // Continue even if notification creation fails
        }
        
        return response.data;
    } catch (error) {
        console.error('Error updating personal info:', error);
        console.log('Update Error details:', (error as any).response?.data || 'No response data');
        throw error;
    }
};

export default { getPersonalInfo, updatePersonalInfo };

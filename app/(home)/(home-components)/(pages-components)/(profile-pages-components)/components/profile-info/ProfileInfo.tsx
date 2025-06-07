import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { ProfileFormData } from '../../types/profile.types';
import { validateProfileForm, ValidationErrors } from './ProfileInfo-valiation';
import { avatarImages } from './avatarImages';
import { styles } from './ProfileInfoStyles';
import ProfileField from './components/ProfileField';
import EditProfileModal from './components/EditProfileModal';
import AvatarPickerModal from './components/AvatarPickerModal';
import MainButton from '@/constants/MainButton';
import { getPersonalInfo, updatePersonalInfo } from './api/PersonalInfo';
import { useNotifications } from '@/contexts/NotificationContext';

interface ProfileInfoProps {
  formData: ProfileFormData;
  setFormData: (data: ProfileFormData) => void;
}

export default function ProfileInfo({ formData, setFormData }: ProfileInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempFormData, setTempFormData] = useState(formData);
  const [isImagePickerVisible, setImagePickerVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(require('@/assets/profile_images/default.png'));
  const [errors, setErrors] = useState<ValidationErrors>({});
  const { fetchNotifications } = useNotifications();

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const data = await getPersonalInfo();
        console.log('Fetched data:', data);
        
        // تعيين البيانات المستلمة
        setFormData(data);
        setTempFormData(data);
        
        // تعيين صورة الملف الشخصي إذا كانت موجودة
        if (data.avatar && avatarImages[data.avatar]) {
          setProfileImage(avatarImages[data.avatar]);
        }
      } catch (error) {
        console.error('Error in ProfileInfo component:', error);
      }
    };

    fetchPersonalInfo();
  }, []);

  const validateForm = (): boolean => {
    const { isValid, errors: validationErrors } = validateProfileForm(tempFormData);
    setErrors(validationErrors);
    return isValid;
  };

  const handleAvatarSelect = (avatarName: string) => {
    setProfileImage(avatarImages[avatarName]);
    setImagePickerVisible(false);
    
    // تحديث البيانات المؤقتة لتشمل اسم الصورة الجديدة
    setTempFormData({
      ...tempFormData,
      avatar: avatarName
    });
    
    // حفظ التغييرات مباشرة في قاعدة البيانات
    updatePersonalInfo({
      ...tempFormData,
      avatar: avatarName
    }).then(() => {
      // تحديث البيانات الرئيسية بعد الحفظ
      setFormData({
        ...formData,
        avatar: avatarName
      });
      
      // Refresh notifications after updating avatar
      fetchNotifications();
    }).catch(error => {
      console.error('Error updating avatar:', error);
    });
  };

  const handleSaveChanges = async () => {
    if (validateForm()) {
      try {
        await updatePersonalInfo(tempFormData);
        setFormData(tempFormData);
        setIsEditing(false);
        
        // Refresh notifications after updating profile info
        fetchNotifications();
      } catch (error) {
        console.error('Error updating personal info:', error);
        // يمكنك إضافة معالجة الأخطاء هنا
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.imageContainer}>
          <Image source={profileImage} style={styles.profileImage} />
          <TouchableOpacity 
            style={styles.editImageButton}
            onPress={() => setImagePickerVisible(true)}
          >
            <FontAwesome6 name="camera" size={16} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <ProfileField label="Full Name" value={tempFormData.fullName} icon="user" />
          <ProfileField label="Age" value={tempFormData.age} icon="calendar" />
          <ProfileField label="Phone Number" value={tempFormData.phone} icon="phone" />
          <ProfileField label="Blood Type" value={tempFormData.bloodType} icon="droplet" />
          <ProfileField 
            label="Pregnancy Week" 
            value={tempFormData.pregnancyWeek} 
            icon="baby" 
            isPregnancyWeek={true}
          />
        </View>
        <View style={styles.editButtons}>
            <MainButton 
              title="Edit"
              onPress={() => setIsEditing(true)}
              backgroundColor="#623AA2"
            />
          </View>
      </View>

      <EditProfileModal
        isVisible={isEditing}
        onClose={() => setIsEditing(false)}
        tempFormData={tempFormData}
        setTempFormData={setTempFormData}
        errors={errors}
        onSave={handleSaveChanges}
        onCancel={() => {
          setTempFormData(formData);
          setIsEditing(false);
          setErrors({});
        }}
      />

      <AvatarPickerModal
        isVisible={isImagePickerVisible}
        onClose={() => setImagePickerVisible(false)}
        onSelectAvatar={handleAvatarSelect}
        avatarImages={avatarImages}
        currentAvatar={tempFormData.avatar}
      />
    </View>
  );
}


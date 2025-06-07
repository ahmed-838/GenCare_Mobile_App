import React from 'react';
import { View, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import MainButton from '@/constants/MainButton';
import { ProfileFormData } from '../../../types/profile.types';
import { ValidationErrors } from '../ProfileInfo-valiation';
import { styles } from '../ProfileInfoStyles';
import EditField from './EditField';

interface EditProfileModalProps {
  isVisible: boolean;
  onClose: () => void;
  tempFormData: ProfileFormData;
  setTempFormData: (data: ProfileFormData) => void;
  errors: ValidationErrors;
  onSave: () => void;
  onCancel: () => void;
}

const EditProfileModal = ({
  isVisible,
  onClose,
  tempFormData,
  setTempFormData,
  errors,
  onSave,
  onCancel
}: EditProfileModalProps) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={[styles.modalOverlay, { backgroundColor: 'rgba(255,255,255,0.8)' }]}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <ThemedText style={styles.modalTitle}>Edit Profile</ThemedText>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#623AA2" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.modalScrollContent}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <EditField 
              label="Full Name" 
              field="fullName" 
              formData={tempFormData} 
              setFormData={setTempFormData} 
              errors={errors} 
            />
            <EditField 
              label="Age" 
              field="age" 
              formData={tempFormData} 
              setFormData={setTempFormData} 
              errors={errors} 
            />
            <EditField 
              label="Phone" 
              field="phone" 
              formData={tempFormData} 
              setFormData={setTempFormData} 
              errors={errors} 
            />
            <EditField 
              label="Blood Type" 
              field="bloodType" 
              formData={tempFormData} 
              setFormData={setTempFormData} 
              errors={errors} 
            />
            <EditField 
              label="Pregnancy Progress" 
              field="pregnancyWeek" 
              formData={tempFormData} 
              setFormData={setTempFormData} 
              errors={errors} 
            />
          </ScrollView>

          <View style={styles.modalButtons}>
            <MainButton 
              title="Save Changes"
              onPress={onSave}
              backgroundColor="#623AA2"
            />
            <MainButton 
              title="Cancel"
              onPress={onCancel}
              backgroundColor="#9CA3AF"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditProfileModal; 
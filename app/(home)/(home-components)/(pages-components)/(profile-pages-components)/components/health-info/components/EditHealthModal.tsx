import React from 'react';
import { View, Modal, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import MainButton from '@/constants/MainButton';
import { HealthData } from '../../../types/profile.types';
import { ValidationErrors } from '../infoTypes';
import styles from '../HealthSectionStyles';

interface EditHealthModalProps {
  isEditingHealth: boolean;
  isLoading: boolean;
  tempHealthData: HealthData;
  errors: ValidationErrors;
  setTempHealthData: (data: HealthData | ((prev: HealthData) => HealthData)) => void;
  handleSaveHealthInfo: () => Promise<void>;
  closeModal: () => void;
}

export const EditHealthModal: React.FC<EditHealthModalProps> = ({
  isEditingHealth,
  isLoading,
  tempHealthData,
  errors,
  setTempHealthData,
  handleSaveHealthInfo,
  closeModal
}) => {
  const renderEditField = (label: string, value: string, field: keyof HealthData, placeholder: string) => {
    return (
      <View style={styles.editFieldContainer}>
        <ThemedText style={styles.fieldLabel}>{label}</ThemedText>
        <TextInput
          style={[
            styles.editInput,
            field === 'symptoms' && styles.symptomsInput,
            errors[field] && { borderColor: '#EF4444' },
          ]}
          value={value || ''}
          onChangeText={(text) => setTempHealthData(prev => ({...prev, [field]: text}))}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          keyboardType={field === 'bloodSugar' || field === 'weight' ? 'numeric' : 'default'}
          multiline={field === 'symptoms'}
        />
        {errors[field] && (
          <ThemedText style={{ color: '#EF4444', fontSize: 12, marginTop: 4 }}>{errors[field]}</ThemedText>
        )}
      </View>
    );
  };

  return (
    <Modal
      visible={isEditingHealth}
      transparent
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <ThemedText style={styles.modalTitle}>Edit Health Information</ThemedText>
            <TouchableOpacity onPress={closeModal}>
              <Ionicons name="close" size={24} color="#623AA2" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.modalScrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.bpContainer}>
              <View style={[styles.editFieldContainer, { flex: 1, marginRight: 8 }]}>
                <ThemedText style={styles.fieldLabel}>Blood Pressure (Systolic)</ThemedText>
                <TextInput
                  style={[styles.editInput, errors.bloodPressure && { borderColor: '#EF4444' }]}
                  value={tempHealthData.bloodPressure?.split('/')[0] || ''}
                  onChangeText={(text) => {
                    const diastolic = tempHealthData.bloodPressure?.split('/')[1] || '';
                    setTempHealthData(prev => ({
                      ...prev,
                      bloodPressure: `${text}/${diastolic}`
                    }))
                  }}
                  placeholder="e.g. 120"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                />
                {errors.bloodPressure && (
                  <ThemedText style={{ color: '#EF4444', fontSize: 12, marginTop: 4 }}>{errors.bloodPressure}</ThemedText>
                )}
              </View>
              
              <View style={[styles.editFieldContainer, { flex: 1, marginLeft: 8 }]}>
                <ThemedText style={styles.fieldLabel}>Blood Pressure (Diastolic)</ThemedText>
                <TextInput
                  style={[styles.editInput, errors.bloodPressure && { borderColor: '#EF4444' }]}
                  value={tempHealthData.bloodPressure?.split('/')[1] || ''}
                  onChangeText={(text) => {
                    const systolic = tempHealthData.bloodPressure?.split('/')[0] || '';
                    setTempHealthData(prev => ({
                      ...prev,
                      bloodPressure: `${systolic}/${text}`
                    }))
                  }}
                    placeholder="e.g. 80"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                />
                {errors.bloodPressure && (
                  <ThemedText style={{ color: '#EF4444', fontSize: 12, marginTop: 4 }}>{errors.bloodPressure}</ThemedText>
                )}
              </View>
            </View>

            {renderEditField('Blood Sugar (mg/dL)', tempHealthData.bloodSugar || '', 'bloodSugar', 'e.g. 100')}
            {renderEditField('Weight (kg)', tempHealthData.weight || '', 'weight', 'e.g. 65')}
            {renderEditField('Symptoms', tempHealthData.symptoms || '', 'symptoms', 'Enter symptoms separated by commas')}
          </ScrollView>

          <View style={styles.modalButtons}>
            <MainButton 
              title={isLoading ? "Saving..." : "Save"}
              backgroundColor="#623AA2"
              onPress={handleSaveHealthInfo}
            />
            <MainButton 
              title="Cancel"
              onPress={closeModal}
              backgroundColor="#9CA3AF"
            />
          </View>
          
          {isLoading && (
            <View style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255,255,255,0.7)',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}>
              <ActivityIndicator size="large" color="#623AA2" />
              <ThemedText style={{ marginTop: 10, color: '#623AA2' }}>جاري الحفظ...</ThemedText>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default EditHealthModal; 
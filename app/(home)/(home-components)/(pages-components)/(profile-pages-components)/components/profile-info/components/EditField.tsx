import React from 'react';
import { View, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemedText } from '@/components/ThemedText';
import { ProfileFormData } from '../../../types/profile.types';
import { ValidationErrors, BLOOD_TYPES } from '../ProfileInfo-valiation';
import { styles } from '../ProfileInfoStyles';
import PregnancyWeekPicker from './PregnancyWeekPicker';

interface EditFieldProps {
  label: string;
  field: keyof ProfileFormData;
  formData: ProfileFormData;
  setFormData: (data: ProfileFormData) => void;
  errors: ValidationErrors;
}

const EditField = ({ label, field, formData, setFormData, errors }: EditFieldProps) => {
  if (field === 'bloodType') {
    return (
      <View style={styles.editFieldContainer}>
        <ThemedText style={styles.editFieldLabel}>{label}</ThemedText>
        <View style={[styles.editInput, styles.pickerWrapper]}>
          <Picker
            selectedValue={formData[field]}
            onValueChange={(text) => setFormData({...formData, [field]: text})}
            style={styles.bloodTypePicker}
            dropdownIconColor="#623AA2"
            mode="dropdown"
          >
            <Picker.Item 
              label="Select Blood Type" 
              value="" 
              enabled={false}
            />
            {BLOOD_TYPES.map((type) => (
              <Picker.Item 
                key={type} 
                label={type} 
                value={type}
              />
            ))}
          </Picker>
        </View>
        {errors[field] && (
          <ThemedText style={styles.errorText}>{errors[field]}</ThemedText>
        )}
      </View>
    );
  }

  if (field === 'pregnancyWeek') {
    return (
      <View style={styles.editFieldContainer}>
        <ThemedText style={styles.editFieldLabel}>{label}</ThemedText>
        <PregnancyWeekPicker
          value={formData.pregnancyWeek}
          onChange={(week) => setFormData({...formData, pregnancyWeek: week})}
        />
        {errors.pregnancyWeek && (
          <ThemedText style={styles.errorText}>{errors.pregnancyWeek}</ThemedText>
        )}
      </View>
    );
  }

  return (
    <View style={styles.editFieldContainer}>
      <ThemedText style={styles.editFieldLabel}>{label}</ThemedText>
      <TextInput
        style={[
          styles.editInput,
          errors[field as keyof ValidationErrors] ? styles.inputError : null
        ]}
        value={formData[field]}
        onChangeText={(text) => {
          let newText = text;
          
          if (field === 'age') {
            newText = text.replace(/[^0-9]/g, '');
          } else if (field === 'phone') {
            newText = text.replace(/[^0-9]/g, '').slice(0, 11);
          } else if (field === 'fullName') {
            newText = text.replace(/[^a-zA-Z\s]/g, '');
          }
          
          setFormData({...formData, [field]: newText});
        }}
        placeholder={`Enter your ${label.toLowerCase()}`}
        placeholderTextColor="#9CA3AF"
        keyboardType={field === 'phone' || field === 'age' ? 'numeric' : 'default'}
        maxLength={field === 'phone' ? 11 : undefined}
      />
      {errors[field as keyof ValidationErrors] && (
        <ThemedText style={styles.errorText}>{errors[field as keyof ValidationErrors]}</ThemedText>
      )}
    </View>
  );
};

export default EditField; 
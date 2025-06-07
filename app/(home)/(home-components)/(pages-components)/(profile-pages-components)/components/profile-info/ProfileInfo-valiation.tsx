import { ProfileFormData } from '../../types/profile.types';

export interface ValidationErrors {
  fullName?: string;
  age?: string;
  phone?: string;
  bloodType?: string;
  pregnancyWeek?: string;
}

export const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export const validateProfileForm = (formData: ProfileFormData): { isValid: boolean; errors: ValidationErrors } => {
  const errors: ValidationErrors = {};
  let isValid = true;

  if (formData.fullName.trim() && !/^[a-zA-Z\s]+$/.test(formData.fullName)) {
    errors.fullName = 'Name should contain only letters';
    isValid = false;
  } else if (formData.fullName.trim() && formData.fullName.length < 3) {
    errors.fullName = 'Name must be at least 3 characters';
    isValid = false;
  }

  if (formData.age) {
    const age = Number(formData.age);
    if (isNaN(age) || age < 15 || age > 60) {
      errors.age = 'Age must be between 15 and 60';
      isValid = false;
    }
  }

  if (formData.phone && !/^\d{11}$/.test(formData.phone)) {
    errors.phone = 'Phone number must be exactly 11 digits';
    isValid = false;
  }

  if (formData.bloodType && !BLOOD_TYPES.includes(formData.bloodType)) {
    errors.bloodType = 'Please select a valid blood type';
    isValid = false;
  }

  if (formData.pregnancyWeek) {
    const week = Number(formData.pregnancyWeek);
    if (isNaN(week) || week < 1 || week > 42) {
      errors.pregnancyWeek = 'Week must be between 1 and 42';
      isValid = false;
    }
  }

  return { isValid, errors };
};

export default validateProfileForm;
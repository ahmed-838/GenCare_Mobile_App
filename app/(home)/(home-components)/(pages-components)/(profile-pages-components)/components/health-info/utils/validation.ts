import { HealthData } from '../../../types/profile.types';
import { ValidationErrors } from '../infoTypes';

export const validateHealthForm = (data: HealthData): { isValid: boolean; errors: ValidationErrors } => {
  const errors: ValidationErrors = {};
  let isValid = true;

  // Check blood pressure
  if (data.bloodPressure) {
    const bpPattern = /^\d{2,3}\/\d{2,3}$/;
    if (!bpPattern.test(data.bloodPressure)) {
      errors.bloodPressure = 'Invalid blood pressure format. Use the format: 120/80';
      isValid = false;
    }
  }

  // Check blood sugar
  if (data.bloodSugar) {
    const sugar = Number(data.bloodSugar);
    if (isNaN(sugar) || sugar < 50 || sugar > 500) {
      errors.bloodSugar = 'Blood sugar must be between 50 and 500 mg/dL';
      isValid = false;
    }
  }

  // Check weight
  if (data.weight) {
    const weight = Number(data.weight);
    if (isNaN(weight) || weight < 30 || weight > 200) {
      errors.weight = 'Weight must be between 30 and 200 kg';
      isValid = false;
    }
  }

  return { isValid, errors };
}; 

export default validateHealthForm;
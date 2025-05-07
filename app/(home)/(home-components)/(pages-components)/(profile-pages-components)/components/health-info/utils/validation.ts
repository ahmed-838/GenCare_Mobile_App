import { HealthData } from '../../../types/profile.types';
import { ValidationErrors } from '../infoTypes';

export const validateHealthForm = (data: HealthData): { isValid: boolean; errors: ValidationErrors } => {
  const errors: ValidationErrors = {};
  let isValid = true;

  // التحقق من ضغط الدم
  if (data.bloodPressure) {
    const bpPattern = /^\d{2,3}\/\d{2,3}$/;
    if (!bpPattern.test(data.bloodPressure)) {
      errors.bloodPressure = 'صيغة غير صحيحة. استخدم الصيغة: 120/80';
      isValid = false;
    }
  }

  // التحقق من مستوى السكر في الدم
  if (data.bloodSugar) {
    const sugar = Number(data.bloodSugar);
    if (isNaN(sugar) || sugar < 50 || sugar > 500) {
      errors.bloodSugar = 'يجب أن يكون سكر الدم بين 50 و 500 ملغ/ديسيلتر';
      isValid = false;
    }
  }

  // التحقق من الوزن
  if (data.weight) {
    const weight = Number(data.weight);
    if (isNaN(weight) || weight < 30 || weight > 200) {
      errors.weight = 'يجب أن يكون الوزن بين 30 و 200 كغم';
      isValid = false;
    }
  }

  return { isValid, errors };
}; 

export default validateHealthForm;
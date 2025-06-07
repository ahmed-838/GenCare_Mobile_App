export interface ProfileFormData {
  fullName: string;
  age: string;
  pregnancyWeek: string;
  phone: string;
  bloodType: string;
  avatar: string;
}

export interface HealthData {
  bloodPressure: string;
  bloodSugar: string;
  weight: string;
  symptoms: string;
}

export interface Disease {
  name: string;
  risk: string;
  symptoms: string[];
  nextCheckup: string;
}

export interface ExpandedSections {
  weeks: boolean;
  diseases: boolean;
  babyNames: boolean;
}

export interface ExpandedCards {
  healthPredictor: boolean;
  savedDiseases: boolean;
  savedItems: boolean;
}

export interface SavedDisease {
  _id: string;
  name: string;
  date?: string;
}

// إضافة مكون افتراضي فارغ
const ProfileTypes = () => null;
export default ProfileTypes;

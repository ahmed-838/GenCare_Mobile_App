import { BabyName } from '@/data/babyNames';
import { HealthData, ExpandedCards, ExpandedSections, SavedDisease } from '../../types/profile.types';
import { Dispatch, SetStateAction } from 'react';

export interface HealthSectionProps {
  currentHealth: HealthData;
  setCurrentHealth: (data: HealthData) => void;
  expandedCards: ExpandedCards;
  setExpandedCards: Dispatch<SetStateAction<ExpandedCards>>;
  expandedSections: ExpandedSections;
  setExpandedSections: Dispatch<SetStateAction<ExpandedSections>>;
  savedWeeks: Array<{ week: string; date: string }>;
  onDeleteWeek?: (week: string) => void;
  savedDiseases?: SavedDisease[];
  onDeleteDisease?: (id: string) => void;
  savedBabyNames: Array<{
    letter: string;
    names: BabyName[];
  }>;
  onUpdateBabyNames: (names: Array<{
    letter: string;
    names: BabyName[];
  }>) => void;
}

export interface ValidationErrors {
  bloodPressure?: string;
  bloodSugar?: string;
  weight?: string;
  symptoms?: string;
}

export default function InfoTypes() {
  return null;
}


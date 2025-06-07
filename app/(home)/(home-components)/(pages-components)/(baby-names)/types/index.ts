import { BabyName } from '@/data/babyNames';

export interface AlphabetSection {
  letter: string;
  names: BabyName[];
}

export interface SavedNamesState {
  [key: string]: BabyName[];
} 
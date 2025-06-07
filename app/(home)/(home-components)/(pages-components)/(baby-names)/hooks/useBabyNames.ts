import { useState, useEffect } from 'react';
import { BabyName } from '@/data/babyNames';
import { SavedNamesState } from '../types';
import { getSavedBabyNames, saveBabyNames, deleteBabyName } from '@/app/(home)/(home-components)/(pages-components)/(profile-pages-components)/components/saved-items/api/savedBabeNames';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { Alert } from 'react-native';

export const useBabyNames = () => {
  const [selectedLetter, setSelectedLetter] = useState('A');
  const [selectedNames, setSelectedNames] = useState<BabyName[]>([]);
  const [savedNamesByLetter, setSavedNamesByLetter] = useState<SavedNamesState>({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [tempSelectedNames, setTempSelectedNames] = useState<BabyName[]>([]);

  useEffect(() => {
    fetchSavedNames();
  }, []);

  const fetchSavedNames = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) return;

      const savedNames = await getSavedBabyNames(token);
      console.log('Fetched saved names:', savedNames);
      
      const formattedNames: SavedNamesState = {};
      savedNames.forEach((item: any) => {
        formattedNames[item.letter] = item.names;
      });
      
      setSavedNamesByLetter(formattedNames);
      
      if (formattedNames[selectedLetter]) {
        setSelectedNames(formattedNames[selectedLetter]);
        setTempSelectedNames(formattedNames[selectedLetter]);
      } else {
        setSelectedNames([]);
        setTempSelectedNames([]);
      }
      
      setHasChanges(false);
    } catch (error) {
      console.error('Error fetching saved names:', error);
    }
  };

  const handleNameSelection = async (name: BabyName) => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      const isNameSelected = tempSelectedNames.some(n => n.name === name.name);
      
      if (isNameSelected) {
        setTempSelectedNames(prev => prev.filter(n => n.name !== name.name));
      } else {
        setTempSelectedNames(prev => [...prev, name]);
      }
      
      const savedNames = savedNamesByLetter[selectedLetter] || [];
      const updatedTempNames = isNameSelected 
        ? tempSelectedNames.filter(n => n.name !== name.name)
        : [...tempSelectedNames, name];
      
      const hasChangesNow = !areArraysEqual(
        updatedTempNames.map(n => n.name).sort(),
        savedNames.map(n => n.name).sort()
      );
      
      setHasChanges(hasChangesNow);
      console.log(`Has changes: ${hasChangesNow}`);
      
    } catch (error) {
      console.error('Error handling name selection:', error);
    }
  };

  const areArraysEqual = (arr1: string[], arr2: string[]) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  const handleLetterChange = (letter: string) => {
    if (hasChanges) {
      Alert.alert(
        'Unsaved changes',
        'You have unsaved changes. Do you want to save them before changing the letter?',
        [
          {
            text: 'Ignore',
            style: 'cancel',
            onPress: () => {
              changeLetterWithoutSaving(letter);
            }
          },
          {
            text: 'Save',
            onPress: async () => {
              await saveChanges();
              changeLetterWithoutSaving(letter);
            }
          }
        ]
      );
    } else {
      // لا توجد تغييرات، يمكن الانتقال مباشرة
      changeLetterWithoutSaving(letter);
    }
  };

  const changeLetterWithoutSaving = (letter: string) => {
    setSelectedLetter(letter);
    const savedNames = savedNamesByLetter[letter] || [];
    setSelectedNames(savedNames);
    setTempSelectedNames(savedNames);
    setHasChanges(false);
  };

  const saveChanges = async () => {
    try {
      setIsUpdating(true);
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        Alert.alert('Error', 'You must be logged in first');
        return;
      }

      console.log(`Saving names for letter ${selectedLetter}:`, tempSelectedNames);
      
      await saveBabyNames(token, selectedLetter, tempSelectedNames);
      
      setSavedNamesByLetter(prev => {
        const updated = { ...prev };
        if (tempSelectedNames.length === 0) {
          delete updated[selectedLetter];
        } else {
          updated[selectedLetter] = tempSelectedNames;
        }
        return updated;
      });
      
      setSelectedNames(tempSelectedNames);
      setHasChanges(false);
      Alert.alert('Success', 'Names saved successfully');
    } catch (error) {
      console.error('Error saving changes:', error);
      Alert.alert('Error', 'An error occurred while saving the names, please try again');
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    selectedLetter,
    selectedNames: tempSelectedNames, 
    savedNamesByLetter,
    isUpdating,
    hasChanges,
    isDeleting,
    handleNameSelection,
    handleLetterChange,
    saveChanges,
    fetchSavedNames
  };
};
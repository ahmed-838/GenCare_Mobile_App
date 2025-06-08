import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, Alert } from 'react-native';
import { SavedItemsSection } from './SavedItemsSection';
import { SavedDisease, ExpandedSections } from '../../types/profile.types';
import { BabyName } from '@/data/babyNames';
import { deleteDisease, getSavedDiseases } from './api/savedDisaeas';
import { getSavedWeeks, deleteWeek } from './api/savedWeeks';
import { getSavedBabyNames, deleteLetter, deleteBabyName } from './api/savedBabeNames';
import * as SecureStore from 'expo-secure-store';

  // Type for expanded sections
type SectionName = 'weeks' | 'diseases' | 'babyNames';

const SavedItems = () => {
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    weeks: true, // Open weeks section by default
    diseases: true, // Open diseases section by default
    babyNames: true  // Open baby names section by default
  });
  const [savedWeeks, setSavedWeeks] = useState<Array<{ week: string; date: string }>>([]);
  const [savedDiseases, setSavedDiseases] = useState<SavedDisease[]>([]);
  const [savedBabyNames, setSavedBabyNames] = useState<Array<{ letter: string; names: BabyName[] }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Toggle section state
  const toggleSection = (section: keyof ExpandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
    // Fetch saved items when the component loads
  useEffect(() => {
    fetchSavedItems();
  }, []);
  
  const fetchSavedItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        setError('please login to view saved items');
        return;
      }
      
      // Fetch saved diseases
      const diseases = await getSavedDiseases(token);
      console.log('Fetched saved diseases:', diseases);
      
      // Convert data to the required format
      const formattedDiseases = diseases.map((disease: any) => ({
        _id: disease.diseaseId || disease._id,
        name: disease.name,
        date: disease.savedAt || new Date().toISOString()
      }));
      
      setSavedDiseases(formattedDiseases);
      
      // Fetch saved weeks
      const weeks = await getSavedWeeks(token);
      console.log('Fetched saved weeks:', weeks);
      
      // Convert data to the required format
      const formattedWeeks = weeks.map((week: any) => ({
        week: week.week,
        date: week.savedAt || new Date().toISOString()
      }));
      
      setSavedWeeks(formattedWeeks);
      
      // Fetch saved baby names
      const babyNames = await getSavedBabyNames(token);
      console.log('Fetched saved baby names:', babyNames);
      
      // Convert data to the required format
      const formattedBabyNames = babyNames.map((item: any) => ({
        letter: item.letter,
        names: item.names
      }));
      
      setSavedBabyNames(formattedBabyNames);
      
    } catch (error) {
      console.error('Error fetching saved items:', error);
      setError('Error fetching saved items');
    } finally {
      setLoading(false);
    }
  };
  
  const onDeleteDisease = async (id: string) => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        Alert.alert('Error', 'please login to delete items');
        return;
      }
      
      // Delete disease
      await deleteDisease(token, id);
      
      // Update the list after deletion
      setSavedDiseases(prev => prev.filter(disease => disease._id !== id));
      
      Alert.alert('Success', 'Disease deleted successfully');
    } catch (error) {
      console.error('Error deleting disease:', error);
      Alert.alert('Error', 'Failed to delete disease');
    }
  };
  
  const onDeleteWeek = async (week: string) => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        Alert.alert('Error', 'please login to delete items');
        return;
      }
      
      // Delete week
      await deleteWeek(token, week);
      
      // Update the list after deletion
      setSavedWeeks(prev => prev.filter(w => w.week !== week));
      
      Alert.alert('Success', 'Week deleted successfully');
    } catch (error) {
      console.error('Error deleting week:', error);
      Alert.alert('Error', 'Failed to delete week');
    }
  };
  
  const onDeleteBabyNameLetter = async (letter: string) => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        Alert.alert('Error', 'please login to delete items');
        return;
      }
      
      // Delete letter
      await deleteLetter(token, letter);
      
      // Update the list after deletion
      setSavedBabyNames(prev => prev.filter(item => item.letter !== letter));
      
      Alert.alert('Success', 'All names deleted successfully');
    } catch (error) {
      console.error('Error deleting baby name letter:', error);
      Alert.alert('Error', 'Failed to delete baby name letter');
    }
  };
  
  const onDeleteBabyName = async (letter: string, name: string) => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        Alert.alert('Error', 'please login to delete items');
        return;
      }
      
      // Delete name
      await deleteBabyName(token, letter, name);
      
      // Update the list after deletion
      setSavedBabyNames(prev => {
        const updated = [...prev];
        const letterIndex = updated.findIndex(item => item.letter === letter);
        
        if (letterIndex !== -1) {
          // Delete name from letter
          updated[letterIndex].names = updated[letterIndex].names.filter(n => n.name !== name);
          
          // If there are no names in this letter, delete the letter
          if (updated[letterIndex].names.length === 0) {
            return updated.filter(item => item.letter !== letter);
          }
        }
        
        return updated;
      });
      
      Alert.alert('Success', 'Name deleted successfully');
    } catch (error) {
      console.error('Error deleting baby name:', error);
      Alert.alert('Error', 'Failed to delete baby name');
    }
  };
  
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#623AA2" />
        <Text style={{ marginTop: 10, color: '#623AA2' }}>Loading saved items...</Text>
      </View>
    );
  }
  
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: '#FF4444', fontSize: 16, textAlign: 'center' }}>{error}</Text>
        <Text 
          style={{ 
            color: '#623AA2', 
            marginTop: 20, 
            textDecorationLine: 'underline',
            fontSize: 16
          }}
          onPress={fetchSavedItems}
        >
          Try again
        </Text>
      </View>
    );
  }
  
  return (
    <SavedItemsSection
      expandedSections={expandedSections}
      toggleSection={toggleSection}
      savedWeeks={savedWeeks}
      savedDiseases={savedDiseases}
      savedBabyNames={savedBabyNames}
      onDeleteWeek={onDeleteWeek}
      onDeleteDisease={onDeleteDisease}
      onDeleteBabyNameLetter={onDeleteBabyNameLetter}
      onDeleteBabyName={onDeleteBabyName}
      onRefresh={fetchSavedItems}
    />
  );
};

export default SavedItems;  
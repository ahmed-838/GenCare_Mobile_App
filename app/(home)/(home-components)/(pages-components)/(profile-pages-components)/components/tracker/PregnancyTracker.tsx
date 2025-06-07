import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Alert, TouchableOpacity, Text, Modal } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { NewsList } from '@/data/pregnancyweeks';
import MainButton from '@/constants/MainButton';
import { useRouter } from 'expo-router';
import { getPersonalInfo, updatePersonalInfo } from '../profile-info/api/PersonalInfo';


const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PregnancySectionProps {
  pregnancyWeek: string;
  onWeekChange?: (week: string) => void;
  onSaveWeek?: (weekData: { week: string; date: string }) => Promise<void>;
}

export default function PregnancySection({ onWeekChange, onSaveWeek }: PregnancySectionProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [currentWeek, setCurrentWeek] = useState('');
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPersonalInfo();
        if (!response) {
          console.error("No response received from getPersonalInfo");
          return;
        }
        
        const data = typeof response === 'object' ? response : await response.json();
        
        if (data && data.pregnancyWeek) {
          setCurrentWeek(data.pregnancyWeek.toString());
          setInitialDataLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching pregnancy week:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (initialDataLoaded && onWeekChange && currentWeek) {
      onWeekChange(currentWeek);
    }
  }, [initialDataLoaded, currentWeek]);

  const progress = (parseInt(currentWeek) || 0) / 40;
  const weekInfo = NewsList.find(item => item.id === parseInt(currentWeek));

  const handleWeekChange = useCallback((newWeek: string) => {
    setCurrentWeek(newWeek);
    
    updatePersonalInfo({ pregnancyWeek: newWeek })
      .then(() => console.log("Pregnancy week updated successfully"))
      .catch(err => console.error("Error updating pregnancy week:", err));
    
  }, []);

  return (
    <View style={styles.container}>
      <Modal
        visible={isEditing}
        transparent
        animationType="fade"
        onRequestClose={() => setIsEditing(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: 'rgba(255,255,255,0.8)' }]}>
          <View style={styles.modalContent}>
            {/* محتوى Modal */}
          </View>
        </View>
      </Modal>

      <ThemedText style={styles.cardTitle}>Pregnancy Tracker</ThemedText>

      <View style={styles.progressContainer}>
        <LinearGradient
          colors={['#9370DB', '#F78DA7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.progressBar, { width: `${progress * 100}%` }]}
        />
      </View>
      <ThemedText style={styles.weekText}>
        Week {currentWeek || '0'} of 40
      </ThemedText>

      {weekInfo && (
        <View style={styles.developmentCard}>
          <ThemedText style={styles.developmentTitle}>
            Baby's Development - Week {weekInfo.id}
          </ThemedText>
          <View style={styles.measurementsContainer}>
            <View style={styles.measurementItem}>
              <View style={styles.measurementHeader}>
                <FontAwesome5 name="weight" size={16} color="#623AA2" />
                <ThemedText style={styles.measurementLabel}>Weight</ThemedText>
              </View>
              <ThemedText style={styles.measurementValue}>{weekInfo.author}</ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.measurementItem}>
              <View style={styles.measurementHeader}>
                <FontAwesome5 name="ruler-vertical" size={16} color="#623AA2" />
                <ThemedText style={styles.measurementLabel}>Length</ThemedText>
              </View>
              <ThemedText style={styles.measurementValue}>{weekInfo.title}</ThemedText>
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            <MainButton 
              title={`View Week ${currentWeek}`}
              onPress={() => router.push({
                pathname: '/(home)/(home-components)/(pages-components)/pregnancyPage',
                params: { news: JSON.stringify(weekInfo) }
              })}
              backgroundColor="#623AA2"
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginHorizontal: SCREEN_WIDTH * 0.04,
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center', 
    alignItems: 'center',
    paddingVertical: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '90%',
  },
  cardTitle: {
    fontSize: SCREEN_WIDTH * 0.045,
    fontWeight: 'bold',
    marginBottom: SCREEN_WIDTH * 0.03,
    color: '#623AA2',
  },
  progressContainer: {
    height: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    borderRadius: 10,
  },
  weekText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#495057',
  },
  developmentCard: {
    marginTop: 20,
    paddingTop: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  developmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9370DB',
    marginBottom: 15,
    textAlign: 'center',
  },
  measurementsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  measurementItem: {
    flex: 1,
    alignItems: 'center',
  },
  measurementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  measurementLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
  },
  measurementValue: {
    fontSize: 14,
    color: '#6c757d',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#dee2e6',
    marginHorizontal: 15,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
});

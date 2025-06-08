import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { FontAwesome } from '@expo/vector-icons';
import MainButton from '@/constants/MainButton';
import { HealthData, ExpandedCards } from '../../../types/profile.types';
import styles from '../HealthSectionStyles';

interface HealthInfoCardProps {
  expandedCards: ExpandedCards;
  toggleCard: (card: keyof ExpandedCards) => void;
  tempHealthData: HealthData;
  handleEditHealthInfo: () => void;
}

export const HealthInfoCard: React.FC<HealthInfoCardProps> = ({
  expandedCards,
  toggleCard,
  tempHealthData,
  handleEditHealthInfo
}) => {
  // تحويل النص إلى مصفوفة إذا كان نصًا
  const getSymptomsList = () => {
    if (!tempHealthData.symptoms) return [];
    
    if (Array.isArray(tempHealthData.symptoms)) {
      return tempHealthData.symptoms;
    }
    
    return tempHealthData.symptoms.split(/[,\n]+/).map(s => s.trim()).filter(s => s);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity 
        style={styles.cardHeader}
        onPress={() => toggleCard('healthPredictor')}
      >
        <ThemedText style={styles.cardTitle}>Health Information</ThemedText>
        <FontAwesome 
          name={expandedCards.healthPredictor ? 'chevron-up' : 'chevron-down'} 
          size={16} 
          color="#623AA2" 
        />
      </TouchableOpacity>

      {expandedCards.healthPredictor && (
        <View style={styles.cardContent}>
          <View style={styles.healthInfo}>
            <View style={styles.infoField}>
              <ThemedText style={styles.fieldLabel}>Blood Pressure</ThemedText>
              <ThemedText style={styles.fieldValue}>
                {tempHealthData.bloodPressure ? tempHealthData.bloodPressure : '—'}
              </ThemedText>
            </View>
            <View style={styles.infoField}>
              <ThemedText style={styles.fieldLabel}>Blood Sugar (mg/dL)</ThemedText>
              <ThemedText style={styles.fieldValue}>
                {tempHealthData.bloodSugar || '—'}
              </ThemedText>
            </View>
            <View style={styles.infoField}>
              <ThemedText style={styles.fieldLabel}>Weight (kg)</ThemedText>
              <ThemedText style={styles.fieldValue}>
                {tempHealthData.weight || '—'}
              </ThemedText>
            </View>
            <View style={styles.infoField}>
              <ThemedText style={styles.fieldLabel}>Symptoms</ThemedText>
              <View style={styles.symptomsList}>
                {getSymptomsList().length > 0 ? (
                  getSymptomsList().map((symptom, index) => (
                    <View key={index} style={styles.nameItem}>
                      <ThemedText style={styles.nameText}>{symptom}</ThemedText>
                    </View>
                  ))
                ) : (
                  <ThemedText style={styles.fieldValue}>—</ThemedText>
                )}
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <MainButton
              title="Edit"
              onPress={handleEditHealthInfo}
              backgroundColor="#623AA2"
            />
          </View>
        </View>
      )}
    </View>
  );
}; 

export default HealthInfoCard;
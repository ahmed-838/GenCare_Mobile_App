import React from 'react';
import { View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { styles } from '../ProfileInfoStyles';

interface ProfileFieldProps {
  label: string;
  value: string;
  icon: string;
  isPregnancyWeek?: boolean;
}

const ProfileField = ({ label, value, icon, isPregnancyWeek }: ProfileFieldProps) => (
  <View style={styles.fieldContainer}>
    <FontAwesome6 name={icon} size={20} color="#623AA2" style={styles.fieldIcon} />
    <View style={styles.fieldContent}>
      <ThemedText style={styles.fieldLabel}>{label}</ThemedText>
      <ThemedText style={[styles.fieldValue, !value && styles.emptyFieldValue]}>
        {isPregnancyWeek && value ? `Week ${value}` : value || '—'}
      </ThemedText>
    </View>
  </View>
);

export default ProfileField; 
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

interface PregnancyWeekPickerProps {
  value: string;
  onChange: (week: string) => void;
}

export default function PregnancyWeekPicker({ value, onChange }: PregnancyWeekPickerProps) {
  const [durationType, setDurationType] = useState<'weeks' | 'months' | 'days' | 'date'>('weeks');
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const validateInput = (type: string, val: string | Date): boolean => {
    setError('');
    
    if (typeof val === 'string' && !val) {
      setError('This field is required');
      return false;
    }

    switch (type) {
      case 'days':
        const days = Number(val);
        if (isNaN(days) || days < 1 || days > 280) {
          setError('Days must be between 1 and 280');
          return false;
        }
        break;
      case 'weeks':
        const weeks = Number(val);
        if (isNaN(weeks) || weeks < 1 || weeks > 42) {
          setError('Weeks must be between 1 and 42');
          return false;
        }
        break;
      case 'months':
        const months = Number(val);
        if (isNaN(months) || months < 1 || months > 9) {
          setError('Months must be between 1 and 9');
          return false;
        }
        break;
      case 'date':
        const inputDate = val as Date;
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - inputDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > 280) {
          setError('Selected date is too far in the past');
          return false;
        }
        if (inputDate > today) {
          setError('Cannot select future date');
          return false;
        }
        break;
    }
    return true;
  };

  const calculateWeeks = (type: string, val: string | Date) => {
    if (!validateInput(type, val)) {
      return;
    }

    let weeks = 0;
    switch (type) {
      case 'days':
        weeks = Math.floor(Number(val) / 7);
        break;
      case 'weeks':
        weeks = Number(val);
        break;
      case 'months':
        weeks = Math.floor(Number(val) * 4.33);
        break;
      case 'date':
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - (val as Date).getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        weeks = Math.floor(diffDays / 7);
        break;
    }
    
    onChange(Math.min(weeks, 42).toString());
    setInputValue(val.toString());
  };

  const getPickerLabel = () => {
    switch (durationType) {
      case 'weeks': return 'Weeks';
      case 'months': return 'Months';
      case 'days': return 'Days';
      case 'date': return 'Date';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        {durationType === 'date' ? (
          <TouchableOpacity 
            style={[styles.inputField, styles.dateInput]}
            onPress={() => setShowDatePicker(true)}
          >
            <ThemedText style={styles.inputText}>
              {selectedDate.toLocaleDateString()}
            </ThemedText>
          </TouchableOpacity>
        ) : (
          <TextInput
            style={[styles.inputField, styles.numberInput]}
            keyboardType="numeric"
            value={inputValue}
            onChangeText={(text) => {
              setInputValue(text);
              calculateWeeks(durationType, text);
            }}
            placeholder={`Enter ${durationType}`}
            placeholderTextColor="#9CA3AF"
          />
        )}

        <View style={styles.pickerContainer}>
          <View style={styles.pickerLabel}>
            <View style={styles.pickerLabelContent}>
              <ThemedText style={styles.pickerLabelText}>{getPickerLabel()}</ThemedText>
              <Ionicons 
                name="chevron-down" 
                size={20} 
                color="#623AA2"
                style={styles.dropdownIcon}
              />
            </View>
          </View>
          <Picker
            selectedValue={durationType}
            onValueChange={(itemValue) => setDurationType(itemValue)}
            style={[styles.picker, Platform.OS === 'ios' && styles.pickerIOS]}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Weeks" value="weeks" />
            <Picker.Item label="Months" value="months" />
            <Picker.Item label="Days" value="days" />
            <Picker.Item label="Date" value="date" />
          </Picker>
        </View>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) {
              setSelectedDate(date);
              calculateWeeks('date', date);
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  inputField: {
    flex: 0.5,
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1F2937',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  numberInput: {
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
  },
  dateInput: {
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 16,
    color: '#1F2937',
  },
  pickerContainer: {
    flex: 0.5,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#623AA2',
    backgroundColor: '#F9FAFB',
    overflow: 'hidden',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  pickerLabel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: Platform.OS === 'android' ? -1 : 0,
  },
  pickerLabelContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pickerLabelText: {
    fontSize: 16,
    color: '#623AA2',
    fontWeight: '500',
  },
  dropdownIcon: {
    marginTop: 2,
  },
  picker: {
    height: 50,
    width: '100%',
    color: 'transparent',
    opacity: Platform.OS === 'android' ? 0 : 1,
  },
  pickerIOS: {
    opacity: 0,
  },
  pickerItem: {
    fontSize: 16,
    height: 50,
    color: '#623AA2',
  },
  inputError: {
    borderColor: '#EF4444',
    borderWidth: 1.5,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  inputContainer: {
    flex: 0.5,
  },
}); 
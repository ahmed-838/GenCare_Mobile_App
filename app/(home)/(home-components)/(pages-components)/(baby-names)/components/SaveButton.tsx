import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

interface SaveButtonProps {
  hasChanges: boolean;
  isUpdating: boolean;
  onSave: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({
  hasChanges,
  isUpdating,
  onSave
}) => {
  return (
    <TouchableOpacity 
      style={[styles.saveButton, hasChanges && styles.updateButton]} 
      onPress={onSave}
      disabled={!hasChanges || isUpdating}
    >
      <MaterialIcons 
        name={hasChanges ? "update" : "bookmark"} 
        size={24} 
        color={hasChanges ? "#fff" : "#623AA2"} 
      />
      <Text style={[styles.saveButtonText, hasChanges && styles.updateButtonText]}>
        {isUpdating ? 'جارٍ التحديث...' : hasChanges ? 'تحديث القائمة' : 'الأسماء المحفوظة'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(98, 58, 162, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#623AA2',
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  saveButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#623AA2',
  },
  updateButtonText: {
    color: '#fff',
  },
});

export default SaveButton; 
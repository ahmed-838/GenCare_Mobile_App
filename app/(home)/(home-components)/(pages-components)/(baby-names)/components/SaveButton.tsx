import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Text, Animated, View, ActivityIndicator } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import Font from '@/constants/Fonts';

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
  // تأثيرات متحركة للزر
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  
  // تأثير النبض عندما تكون هناك تغييرات
  useEffect(() => {
    if (hasChanges) {
      // تأثير النبض المستمر
      const pulse = Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]);
      
      const pulseLoop = Animated.loop(pulse);
      pulseLoop.start();
      
      return () => {
        pulseLoop.stop();
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      };
    }
  }, [hasChanges]);
  
  // تأثير الضغط
  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacityAnim, {
      toValue: 0.9,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  
  return (
    <TouchableOpacity 
      onPress={onSave}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
      disabled={!hasChanges || isUpdating}
    >
      <Animated.View 
        style={[
          styles.saveButton, 
          hasChanges && styles.updateButton,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim
          }
        ]}
      >
        {isUpdating ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <MaterialIcons 
            name={hasChanges ? "update" : "bookmark"} 
            size={24} 
            color={hasChanges ? "#fff" : "#623AA2"} 
          />
        )}
        <Text style={[styles.saveButtonText, hasChanges && styles.updateButtonText]}>
          {isUpdating ? 'updating...' : hasChanges ? 'update list' : 'saved names'}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#623AA2',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
    shadowColor: "#388E3C",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  saveButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#623AA2',
    fontFamily: Font.raleway,
  },
  updateButtonText: {
    color: '#fff',
  },
});

export default React.memo(SaveButton); 
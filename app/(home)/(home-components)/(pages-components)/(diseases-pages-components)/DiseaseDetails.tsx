import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Alert, ActivityIndicator, I18nManager } from 'react-native';
import { diseases } from '@/data/diseases';
import { bgColors } from '@/constants/Colors';
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from 'react';
import { saveDisease, deleteDisease, getSavedDiseases } from '@/app/(home)/(home-components)/(pages-components)/(profile-pages-components)/components/saved-items/api/savedDisaeas';
import * as SecureStore from 'expo-secure-store';
import { useLanguage } from '@/contexts/LanguageContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface DiseaseDetailsProps {
  disease: typeof diseases[number];
  updateSavedDiseases?: (callback: (prevDiseases: any[]) => any[]) => void;
}

export default function DiseaseDetails({ disease, updateSavedDiseases }: DiseaseDetailsProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();
  
  const isArabic = language === 'ar';
  
  useEffect(() => {
    const getToken = async () => {
      try {
        setIsLoading(true);
        const storedToken = await SecureStore.getItemAsync('token');
        setToken(storedToken);
        
        if (storedToken) {
          try {
            const savedDiseases = await getSavedDiseases(storedToken);
            console.log('Checking if disease is saved:', disease.id);
            console.log('Saved diseases:', savedDiseases);
            
            const isAlreadySaved = savedDiseases.some((d: any) => 
              d.diseaseId === disease.id.toString() || d._id === disease.id.toString()
            );
            
            console.log('Is disease saved:', isAlreadySaved);
            setIsSaved(isAlreadySaved);
          } catch (error) {
            console.error('Error checking if disease is saved:', error);
          }
        }
      } catch (error) {
        console.error('Error getting token:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getToken();
  }, [disease.id]);

  const handleSave = async () => {
    if (!token) {
      Alert.alert('Alert', isArabic ? 'الرجاء تسجيل الدخول أولاً' : 'Please login first');
      return;
    }

    try {
      setIsSaving(true);
      if (!isSaved) {
        await saveDisease(token, { name: disease.name, _id: disease.id.toString() });
        if (updateSavedDiseases) {
          updateSavedDiseases(prev => [...prev, disease]);
        }
        setIsSaved(true);
        Alert.alert(
          isArabic ? 'تم بنجاح' : 'Success', 
          isArabic ? 'تم حفظ المرض بنجاح' : 'Disease saved successfully'
        );
      } else {
        await deleteDisease(token, disease.id.toString());
        if (updateSavedDiseases) {
          updateSavedDiseases(prev => prev.filter(d => d.id !== disease.id));
        }
        setIsSaved(false);
        Alert.alert(
          isArabic ? 'تم بنجاح' : 'Success', 
          isArabic ? 'تمت إزالة المرض من العناصر المحفوظة' : 'Disease removed from saved items'
        );
      }
    } catch (error: any) {
      console.error('Error saving/deleting disease:', error);
      Alert.alert(
        isArabic ? 'خطأ' : 'Error', 
        error.response?.data?.error || (isArabic ? 'حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.' : 'Error processing your request. Please try again.')
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#623AA2" />
        <Text style={{ marginTop: 10, color: '#623AA2' }}>
          {isArabic ? 'جاري التحميل...' : 'Loading...'}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, isArabic && styles.containerRTL]}>
      <View style={[
        styles.buttonsContainer, 
        isArabic ? styles.buttonsContainerRTL : styles.buttonsContainerEN
      ]}>
        <TouchableOpacity 
          style={[styles.saveButton, isSaved && styles.savedButton]} 
          onPress={handleSave}
          disabled={isSaving}
        >
          <MaterialIcons 
            name={isSaved ? "bookmark" : "bookmark-outline"} 
            size={24} 
            color={isSaved ? "#fff" : "#623AA2"} 
          />
          <Text style={[styles.saveButtonText, isSaved && styles.savedButtonText]}>
            {isSaving 
              ? (isArabic ? "جاري الحفظ..." : "Saving...") 
              : (isSaved 
                ? (isArabic ? 'محفوظ' : 'saved') 
                : (isArabic ? 'حفظ' : 'save'))
            }
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.content, isArabic && styles.contentRTL]}>
        <Text style={[styles.title, isArabic && styles.titleRTL]}>
          {isArabic ? disease.name_ar : disease.name}
        </Text>
        <Text style={[styles.date, isArabic && styles.dateRTL]}>
          {isArabic ? disease.date_ar : disease.date}
        </Text>
        <Text style={[styles.details, isArabic && styles.detailsRTL]}>
          {isArabic ? disease.details_ar : disease.details}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgColors.light.background,
    marginTop: Math.min(SCREEN_HEIGHT * 0.02, SCREEN_WIDTH * 0.04),
    marginBottom: Math.min(SCREEN_HEIGHT * 0.02, SCREEN_WIDTH * 0.04),
  },
  containerRTL: {
    // إزالة direction: 'rtl' لأنها تسبب مشاكل في التنسيق
  },
  content: {
    padding: Math.min(SCREEN_WIDTH * 0.9, SCREEN_HEIGHT * 0.05),
  },
  contentRTL: {
    // إزالة وضع alignItems: 'flex-end' لأنه غير مناسب
  },
  title: {
    paddingTop: Math.min(SCREEN_WIDTH * 0.05, SCREEN_HEIGHT * 0.025),
    fontSize: Math.min(SCREEN_WIDTH * 0.06, SCREEN_HEIGHT * 0.03),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Math.min(SCREEN_HEIGHT * 0.01, SCREEN_WIDTH * 0.02),
  },
  titleRTL: {
    textAlign: 'center', // إبقاء العنوان في المنتصف للغتين
    fontFamily: 'Arial',
  },
  date: {
    paddingTop: Math.min(SCREEN_WIDTH * 0.2, SCREEN_HEIGHT * 0.06),
    fontSize: Math.min(SCREEN_WIDTH * 0.035, SCREEN_HEIGHT * 0.018),
    color: '#007AFF',
    marginBottom: Math.min(SCREEN_HEIGHT * 0.015, SCREEN_WIDTH * 0.03),
  },
  dateRTL: {
    textAlign: 'right',
    fontFamily: 'Arial',
  },
  details: {
    fontSize: Math.min(SCREEN_WIDTH * 0.04, SCREEN_HEIGHT * 0.02),
    color: '#444',
    lineHeight: Math.min(SCREEN_WIDTH * 0.06, SCREEN_HEIGHT * 0.03),
  },
  detailsRTL: {
    textAlign: 'right',
    fontFamily: 'Arial',
    lineHeight: Math.min(SCREEN_WIDTH * 0.07, SCREEN_HEIGHT * 0.035), // زيادة المسافة بين السطور للعربية
  },
  buttonsContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.12, 
    right: 16,
    zIndex: 3,
    alignItems: 'flex-end',
  },
  buttonsContainerEN: {
    top: SCREEN_HEIGHT * 0.16, // زيادة المسافة للأسفل في حالة اللغة الإنجليزية
  },
  buttonsContainerRTL: {
    right: 'auto',
    left: 16,
    alignItems: 'flex-start',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(98, 58, 162, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#623AA2',
    marginBottom: 10,
  },
  savedButton: {
    backgroundColor: '#623AA2',
    borderColor: '#623AA2',
  },
  saveButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#623AA2',
  },
  savedButtonText: {
    color: '#fff',
  },
}); 
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, Alert } from 'react-native';
import { SavedItemsSection } from './SavedItemsSection';
import { SavedDisease, ExpandedSections } from '../../types/profile.types';
import { BabyName } from '@/data/babyNames';
import { deleteDisease, getSavedDiseases } from './api/savedDisaeas';
import { getSavedWeeks, deleteWeek } from './api/savedWeeks';
import { getSavedBabyNames, deleteLetter, deleteBabyName } from './api/savedBabeNames';
import * as SecureStore from 'expo-secure-store';

// نوع البيانات للأقسام المفتوحة
type SectionName = 'weeks' | 'diseases' | 'babyNames';

const SavedItems = () => {
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    weeks: true, // افتح قسم الأسابيع افتراضيًا
    diseases: true, // افتح قسم الأمراض افتراضيًا
    babyNames: true  // افتح قسم أسماء الأطفال افتراضيًا
  });
  const [savedWeeks, setSavedWeeks] = useState<Array<{ week: string; date: string }>>([]);
  const [savedDiseases, setSavedDiseases] = useState<SavedDisease[]>([]);
  const [savedBabyNames, setSavedBabyNames] = useState<Array<{ letter: string; names: BabyName[] }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // دالة لتبديل حالة القسم (مفتوح/مغلق)
  const toggleSection = (section: keyof ExpandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // استدعاء البيانات المحفوظة عند تحميل المكون
  useEffect(() => {
    fetchSavedItems();
  }, []);
  
  const fetchSavedItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        setError('يجب تسجيل الدخول لعرض العناصر المحفوظة');
        return;
      }
      
      // جلب الأمراض المحفوظة
      const diseases = await getSavedDiseases(token);
      console.log('Fetched saved diseases:', diseases);
      
      // تحويل البيانات إلى الشكل المطلوب
      const formattedDiseases = diseases.map((disease: any) => ({
        _id: disease.diseaseId || disease._id,
        name: disease.name,
        date: disease.savedAt || new Date().toISOString()
      }));
      
      setSavedDiseases(formattedDiseases);
      
      // جلب الأسابيع المحفوظة
      const weeks = await getSavedWeeks(token);
      console.log('Fetched saved weeks:', weeks);
      
      // تحويل البيانات إلى الشكل المطلوب
      const formattedWeeks = weeks.map((week: any) => ({
        week: week.week,
        date: week.savedAt || new Date().toISOString()
      }));
      
      setSavedWeeks(formattedWeeks);
      
      // جلب أسماء الأطفال المحفوظة
      const babyNames = await getSavedBabyNames(token);
      console.log('Fetched saved baby names:', babyNames);
      
      // تحويل البيانات إلى الشكل المطلوب
      const formattedBabyNames = babyNames.map((item: any) => ({
        letter: item.letter,
        names: item.names
      }));
      
      setSavedBabyNames(formattedBabyNames);
      
    } catch (error) {
      console.error('Error fetching saved items:', error);
      setError('فشل في تحميل العناصر المحفوظة');
    } finally {
      setLoading(false);
    }
  };
  
  const onDeleteDisease = async (id: string) => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        Alert.alert('خطأ', 'يجب تسجيل الدخول لحذف العناصر');
        return;
      }
      
      // حذف المرض
      await deleteDisease(token, id);
      
      // تحديث القائمة بعد الحذف
      setSavedDiseases(prev => prev.filter(disease => disease._id !== id));
      
      Alert.alert('نجاح', 'تم حذف المرض بنجاح');
    } catch (error) {
      console.error('Error deleting disease:', error);
      Alert.alert('خطأ', 'فشل في حذف المرض');
    }
  };
  
  const onDeleteWeek = async (week: string) => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        Alert.alert('خطأ', 'يجب تسجيل الدخول لحذف العناصر');
        return;
      }
      
      // حذف الأسبوع
      await deleteWeek(token, week);
      
      // تحديث القائمة بعد الحذف
      setSavedWeeks(prev => prev.filter(w => w.week !== week));
      
      Alert.alert('نجاح', 'تم حذف الأسبوع بنجاح');
    } catch (error) {
      console.error('Error deleting week:', error);
      Alert.alert('خطأ', 'فشل في حذف الأسبوع');
    }
  };
  
  const onDeleteBabyNameLetter = async (letter: string) => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        Alert.alert('خطأ', 'يجب تسجيل الدخول لحذف العناصر');
        return;
      }
      
      // حذف الحرف بالكامل
      await deleteLetter(token, letter);
      
      // تحديث القائمة بعد الحذف
      setSavedBabyNames(prev => prev.filter(item => item.letter !== letter));
      
      Alert.alert('نجاح', 'تم حذف جميع الأسماء بنجاح');
    } catch (error) {
      console.error('Error deleting baby name letter:', error);
      Alert.alert('خطأ', 'فشل في حذف الأسماء');
    }
  };
  
  const onDeleteBabyName = async (letter: string, name: string) => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        Alert.alert('خطأ', 'يجب تسجيل الدخول لحذف العناصر');
        return;
      }
      
      // حذف الاسم
      await deleteBabyName(token, letter, name);
      
      // تحديث القائمة بعد الحذف
      setSavedBabyNames(prev => {
        const updated = [...prev];
        const letterIndex = updated.findIndex(item => item.letter === letter);
        
        if (letterIndex !== -1) {
          // حذف الاسم من الحرف
          updated[letterIndex].names = updated[letterIndex].names.filter(n => n.name !== name);
          
          // إذا لم تبق أسماء في هذا الحرف، احذف الحرف
          if (updated[letterIndex].names.length === 0) {
            return updated.filter(item => item.letter !== letter);
          }
        }
        
        return updated;
      });
      
      Alert.alert('نجاح', 'تم حذف الاسم بنجاح');
    } catch (error) {
      console.error('Error deleting baby name:', error);
      Alert.alert('خطأ', 'فشل في حذف الاسم');
    }
  };
  
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#623AA2" />
        <Text style={{ marginTop: 10, color: '#623AA2' }}>جاري تحميل العناصر المحفوظة...</Text>
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
          إعادة المحاولة
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
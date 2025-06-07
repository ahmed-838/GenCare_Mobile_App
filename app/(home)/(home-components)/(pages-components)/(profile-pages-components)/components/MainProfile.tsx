import React, { useState, useCallback, useEffect } from 'react';
import { ScrollView, StyleSheet, Animated, Dimensions, View, NativeSyntheticEvent, NativeScrollEvent, RefreshControl } from 'react-native';
import { bgColors } from '@/constants/Colors';
import ProfileInfo from './profile-info/ProfileInfo';
import PregnancySection from './tracker/PregnancyTracker';
import HealthSection from './health-info/HealthSection';
import { HealthData, ExpandedSections, ExpandedCards, ProfileFormData } from '../types/profile.types';
import Navbar from '../../../(navbar)/navbar';
import SavedItems from './saved-items/SavedItems';
import { getHealthInfo } from './health-info/api/HealthInfo';
import { getPersonalInfo } from './profile-info/api/PersonalInfo';

export default function MainProfile() {
  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: '',
    age: '',
    phone: '',
    bloodType: '',
    pregnancyWeek: '',
    avatar: 'default.png',
  });

  // بيانات الصحة
  const [currentHealth, setCurrentHealth] = useState<HealthData>({
    bloodPressure: '',
    bloodSugar: '',
    weight: '',
    symptoms: '',
  });

  // قيمة التمرير للتحكم في شريط التنقل
  const scrollY = new Animated.Value(0);

  // حالة الأقسام المفتوحة
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    diseases: false,
    weeks: false,
    babyNames: false,
  });

  // حالة البطاقات المفتوحة
  const [expandedCards, setExpandedCards] = useState<ExpandedCards>({
    healthPredictor: true,
    savedDiseases: true,
    savedItems: true,
  });

  // إضافة حالة التحديث
  const [refreshing, setRefreshing] = useState(false);
  const [pregnancyWeek, setPregnancyWeek] = useState('');
  
  // جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    fetchAllData();
  }, []);

  // دالة لجلب جميع البيانات
  const fetchAllData = async () => {
    try {
      // جلب البيانات الشخصية
      const personalData = await getPersonalInfo();
      if (personalData) {
        setFormData(personalData);
        if (personalData.pregnancyWeek) {
          setPregnancyWeek(personalData.pregnancyWeek.toString());
        }
      }
      
      // جلب البيانات الصحية
      const healthData = await getHealthInfo();
      if (healthData) {
        setCurrentHealth(healthData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // دالة التحديث عند السحب
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    
    // إعادة تحميل جميع البيانات
    fetchAllData().finally(() => {
      setRefreshing(false);
    });
  }, []);

  // معالجة حدث التمرير
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    scrollY.setValue(offsetY);
  };
  
  // استخدام useCallback لتجنب إعادة إنشاء الدالة في كل تصيير
  const handleWeekChange = useCallback((week: string) => {
    setPregnancyWeek(week);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Navbar scrollY={scrollY} showProfile={false} />
      <ScrollView 
        style={styles.container}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['purple']}
            title="refreshing..."
            titleColor={bgColors.light.tint}
          />
        }
      >
        <ProfileInfo 
          formData={formData}
          setFormData={setFormData}
        />
        
        <PregnancySection 
          pregnancyWeek={pregnancyWeek} 
          onWeekChange={handleWeekChange} 
        />
        
        <HealthSection 
          currentHealth={currentHealth} 
          setCurrentHealth={setCurrentHealth}
          expandedCards={expandedCards}
          setExpandedCards={setExpandedCards}
          expandedSections={expandedSections}
          setExpandedSections={setExpandedSections}
          savedWeeks={[]}
          savedBabyNames={[]}
          onUpdateBabyNames={() => {}}
        />
        <SavedItems />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: bgColors.light.background,
  },
  container: {
    marginTop: Dimensions.get('window').height * 0.15,
    flex: 1,
    backgroundColor: bgColors.light.background,
  },
});
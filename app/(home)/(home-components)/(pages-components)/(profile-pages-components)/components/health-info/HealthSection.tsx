import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { HealthData } from '../../types/profile.types';
import styles from './HealthSectionStyles';
import { ValidationErrors, HealthSectionProps } from './infoTypes';
import { validateHealthForm } from './utils/validation';
import { HealthInfoCard } from './components/HealthInfoCard';
import { EditHealthModal } from './components/EditHealthModal';
import { getHealthInfo, updateHealthInfo } from './api/HealthInfo';
import { ThemedText } from '@/components/ThemedText';
import { useNotifications } from '@/contexts/NotificationContext';

function HealthSection({
  currentHealth,
  setCurrentHealth,
  expandedCards,
  setExpandedCards,
}: HealthSectionProps) {
  const [isEditingHealth, setIsEditingHealth] = useState(false);
  const [tempHealthData, setTempHealthData] = useState<HealthData>(currentHealth);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchNotifications } = useNotifications();

  // جلب البيانات الصحية عند تحميل المكون
  useEffect(() => {
    const fetchHealthData = async () => {
      setInitialLoading(true);
      setError(null);
      try {
        const data = await getHealthInfo();
        setCurrentHealth(data);
        setTempHealthData(data);
      } catch (err) {
        console.error('Error fetching health data:', err);
        setError('فشل في تحميل البيانات الصحية');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchHealthData();
  }, [setCurrentHealth]);

  const toggleCard = (card: keyof typeof expandedCards) => {
    setExpandedCards(prev => ({
      ...prev,
      [card]: !prev[card as keyof typeof expandedCards]
    }));
  };

  const handleEditHealthInfo = () => {
    setTempHealthData(currentHealth);
    setIsEditingHealth(true);
  };

  const handleSaveHealthInfo = async () => {
    const { isValid, errors: validationErrors } = validateHealthForm(tempHealthData);
    setErrors(validationErrors);
    
    if (isValid) {
      setIsLoading(true);
      try {
        // تحديث البيانات في قاعدة البيانات
        await updateHealthInfo(tempHealthData);
        // تحديث البيانات محليًا
        setCurrentHealth(tempHealthData);
        setIsEditingHealth(false);
        
        // Refresh notifications to show the new health update notification
        await fetchNotifications();
      } catch (error) {
        console.error('Error updating health info:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const closeModal = () => {
    setIsEditingHealth(false);
    setErrors({});
  };

  // عرض مؤشر التحميل أثناء جلب البيانات الأولية
  if (initialLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', minHeight: 200 }]}>
        <ActivityIndicator size="large" color="#623AA2" />
        <ThemedText style={{ marginTop: 10, color: '#623AA2' }}>جاري تحميل البيانات الصحية...</ThemedText>
      </View>
    );
  }

  // عرض رسالة خطأ في حالة فشل جلب البيانات
  if (error) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', minHeight: 200 }]}>
        <ThemedText style={{ color: '#EF4444', marginBottom: 10 }}>{error}</ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HealthInfoCard
        expandedCards={expandedCards}
        toggleCard={toggleCard}
        tempHealthData={currentHealth}
        handleEditHealthInfo={handleEditHealthInfo}
      />

      <EditHealthModal
        isEditingHealth={isEditingHealth}
        isLoading={isLoading}
        tempHealthData={tempHealthData}
        errors={errors}
        setTempHealthData={setTempHealthData}
        handleSaveHealthInfo={handleSaveHealthInfo}
        closeModal={closeModal}
      />
    </View>
  );
}

export default HealthSection;

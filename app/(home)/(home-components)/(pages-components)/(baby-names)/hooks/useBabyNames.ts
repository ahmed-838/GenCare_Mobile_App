import { useState, useEffect } from 'react';
import { BabyName } from '@/data/babyNames';
import { SavedNamesState } from '../types';
import { getSavedBabyNames, saveBabyNames, deleteBabyName } from '@/app/(home)/(home-components)/(pages-components)/(profile-pages-components)/components/saved-items/api/savedBabeNames';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { Alert } from 'react-native';

export const useBabyNames = () => {
  const [selectedLetter, setSelectedLetter] = useState('A');
  const [selectedNames, setSelectedNames] = useState<BabyName[]>([]);
  const [savedNamesByLetter, setSavedNamesByLetter] = useState<SavedNamesState>({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  // قائمة مؤقتة للأسماء المحددة
  const [tempSelectedNames, setTempSelectedNames] = useState<BabyName[]>([]);

  useEffect(() => {
    fetchSavedNames();
  }, []);

  // تحميل الأسماء المحفوظة من الخادم
  const fetchSavedNames = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) return;

      const savedNames = await getSavedBabyNames(token);
      console.log('Fetched saved names:', savedNames);
      
      // تحويل البيانات إلى الشكل المطلوب
      const formattedNames: SavedNamesState = {};
      savedNames.forEach((item: any) => {
        formattedNames[item.letter] = item.names;
      });
      
      setSavedNamesByLetter(formattedNames);
      
      // تحديث الأسماء المحددة للحرف الحالي
      if (formattedNames[selectedLetter]) {
        setSelectedNames(formattedNames[selectedLetter]);
        // تعيين القائمة المؤقتة لتكون مطابقة للأسماء المحفوظة
        setTempSelectedNames(formattedNames[selectedLetter]);
      } else {
        setSelectedNames([]);
        setTempSelectedNames([]);
      }
      
      setHasChanges(false);
    } catch (error) {
      console.error('Error fetching saved names:', error);
    }
  };

  // التعامل مع تحديد/إلغاء تحديد اسم
  const handleNameSelection = async (name: BabyName) => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      // التحقق مما إذا كان الاسم محددًا حاليًا في القائمة المؤقتة
      const isNameSelected = tempSelectedNames.some(n => n.name === name.name);
      
      // تحديث القائمة المؤقتة
      if (isNameSelected) {
        // إلغاء تحديد الاسم
        setTempSelectedNames(prev => prev.filter(n => n.name !== name.name));
      } else {
        // تحديد الاسم
        setTempSelectedNames(prev => [...prev, name]);
      }
      
      // التحقق مما إذا كانت هناك تغييرات بين القائمة المؤقتة والمحفوظة
      const savedNames = savedNamesByLetter[selectedLetter] || [];
      const updatedTempNames = isNameSelected 
        ? tempSelectedNames.filter(n => n.name !== name.name)
        : [...tempSelectedNames, name];
      
      // التحقق مما إذا كانت هناك تغييرات
      const hasChangesNow = !areArraysEqual(
        updatedTempNames.map(n => n.name).sort(),
        savedNames.map(n => n.name).sort()
      );
      
      setHasChanges(hasChangesNow);
      console.log(`Has changes: ${hasChangesNow}`);
      
    } catch (error) {
      console.error('Error handling name selection:', error);
    }
  };

  // مقارنة مصفوفتين للتحقق من التساوي
  const areArraysEqual = (arr1: string[], arr2: string[]) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  // التعامل مع تغيير الحرف المحدد
  const handleLetterChange = (letter: string) => {
    // حفظ التغييرات الحالية قبل الانتقال إذا كانت هناك تغييرات
    if (hasChanges) {
      Alert.alert(
        'تغييرات غير محفوظة',
        'لديك تغييرات غير محفوظة. هل تريد حفظها قبل الانتقال؟',
        [
          {
            text: 'تجاهل',
            style: 'cancel',
            onPress: () => {
              // الانتقال بدون حفظ
              changeLetterWithoutSaving(letter);
            }
          },
          {
            text: 'حفظ',
            onPress: async () => {
              // حفظ التغييرات ثم الانتقال
              await saveChanges();
              changeLetterWithoutSaving(letter);
            }
          }
        ]
      );
    } else {
      // لا توجد تغييرات، يمكن الانتقال مباشرة
      changeLetterWithoutSaving(letter);
    }
  };

  // تغيير الحرف بدون حفظ التغييرات
  const changeLetterWithoutSaving = (letter: string) => {
    setSelectedLetter(letter);
    // تعيين الأسماء المحددة إلى الأسماء المحفوظة للحرف الجديد
    const savedNames = savedNamesByLetter[letter] || [];
    setSelectedNames(savedNames);
    setTempSelectedNames(savedNames);
    setHasChanges(false);
  };

  // حفظ التغييرات
  const saveChanges = async () => {
    try {
      setIsUpdating(true);
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        Alert.alert('خطأ', 'يجب تسجيل الدخول أولاً');
        return;
      }

      console.log(`Saving names for letter ${selectedLetter}:`, tempSelectedNames);
      
      // استخدام طلب واحد لتحديث جميع الأسماء
      await saveBabyNames(token, selectedLetter, tempSelectedNames);
      
      // تحديث الحالة المحلية
      setSavedNamesByLetter(prev => {
        const updated = { ...prev };
        if (tempSelectedNames.length === 0) {
          // إذا لم تكن هناك أسماء، احذف الحرف
          delete updated[selectedLetter];
        } else {
          // وإلا، قم بتحديث الأسماء
          updated[selectedLetter] = tempSelectedNames;
        }
        return updated;
      });
      
      // تحديث الأسماء المحددة لتتطابق مع القائمة المؤقتة
      setSelectedNames(tempSelectedNames);
      setHasChanges(false);
      Alert.alert('نجاح', 'تم حفظ الأسماء بنجاح');
    } catch (error) {
      console.error('Error saving changes:', error);
      Alert.alert('خطأ', 'حدث خطأ أثناء حفظ الأسماء، يرجى المحاولة مرة أخرى');
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    selectedLetter,
    selectedNames: tempSelectedNames, // استخدام القائمة المؤقتة بدلاً من المحفوظة
    savedNamesByLetter,
    isUpdating,
    hasChanges,
    isDeleting,
    handleNameSelection,
    handleLetterChange,
    saveChanges,
    fetchSavedNames
  };
};
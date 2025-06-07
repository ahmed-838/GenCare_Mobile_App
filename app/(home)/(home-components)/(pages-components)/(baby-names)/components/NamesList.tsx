import React, { useState, useCallback, useMemo } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { FlatList } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { BabyName } from '@/data/babyNames';
import Font from '@/constants/Fonts';

interface NamesListProps {
  names: BabyName[];
  selectedNames: BabyName[];
  savedNamesByLetter: Record<string, BabyName[]>;
  selectedLetter: string;
  hasChanges: boolean;
  onNameSelection: (name: BabyName) => void;
}

// مكون لعنصر الاسم - معزول ومخزن مؤقتًا لتحسين الأداء
const NameItem = React.memo(({
  item,
  isSaved,
  isSelected,
  isUpdating,
  onPress,
}: {
  item: BabyName;
  isSaved: boolean;
  isSelected: boolean;
  isUpdating: boolean;
  onPress: () => void;
}) => {
  const genderColor = item.gender === 'M' ? '#95cae4' : '#ffb9cc';
  const genderIcon = item.gender === 'M' ? 'male' : 'female';
  
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[
        styles.nameItem,
        isSaved && styles.savedNameItem,
        isSelected && !isSaved && styles.selectedNameItem,
        isUpdating && isSelected && styles.updatingNameItem
      ]}
    >
      <View style={styles.nameContent}>
        <Ionicons 
          name={genderIcon} 
          size={16} 
          color={genderColor} 
        />
        <Text style={[styles.nameText, { color: genderColor }]}>
          {item.name}
        </Text>
      </View>
      {(isSaved || isSelected) && (
        <Ionicons 
          name="checkmark-circle" 
          size={20} 
          color={isSaved ? '#623AA2' : '#4CAF50'} 
          style={styles.checkmark}
        />
      )}
    </TouchableOpacity>
  );
});

const NamesList: React.FC<NamesListProps> = ({
  names,
  selectedNames,
  savedNamesByLetter,
  selectedLetter,
  hasChanges,
  onNameSelection
}) => {
  // استخدام useMemo لتخزين حسابات الأسماء المحفوظة
  const savedNamesMap = useMemo(() => {
    const map = new Map<string, boolean>();
    const savedNames = savedNamesByLetter[selectedLetter] || [];
    savedNames.forEach(name => {
      map.set(name.name, true);
    });
    return map;
  }, [savedNamesByLetter, selectedLetter]);
  
  // استخدام useMemo لتخزين حسابات الأسماء المحددة
  const selectedNamesMap = useMemo(() => {
    const map = new Map<string, boolean>();
    selectedNames.forEach(name => {
      map.set(name.name, true);
    });
    return map;
  }, [selectedNames]);

  // استخدام useCallback لتجنب إعادة إنشاء داله غير ضرورية
  const handleNamePress = useCallback((name: BabyName) => {
    onNameSelection(name);
  }, [onNameSelection]);

  // تحسين عرض عنصر الاسم
  const renderNameItem = useCallback(({ item }: { item: BabyName }) => {
    const isSaved = savedNamesMap.has(item.name);
    const isSelected = selectedNamesMap.has(item.name);
    
    return (
      <NameItem 
        item={item}
        isSaved={isSaved}
        isSelected={isSelected}
        isUpdating={hasChanges}
        onPress={() => handleNamePress(item)}
      />
    );
  }, [savedNamesMap, selectedNamesMap, hasChanges, handleNamePress]);

  // باستخدام getItemLayout للتسريع
  const getItemLayout = useCallback((data: any, index: number) => ({
    length: 80,
    offset: 80 * Math.floor(index / 2),
    index,
  }), []);

  return (
    <View style={styles.namesContainer}>
      <FlatList
        data={names}
        renderItem={renderNameItem}
        keyExtractor={item => item.name}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.namesGrid}
        nestedScrollEnabled={true}
        removeClippedSubviews={true} // تحسين الذاكرة
        maxToRenderPerBatch={10} // تحميل عدد محدود في المرة الواحدة
        windowSize={5} 
        initialNumToRender={12}
        getItemLayout={getItemLayout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  namesContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  namesGrid: {
    paddingBottom: 20,
  },
  nameItem: {
    flex: 1,
    margin: 5,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 65, // تحديد ارتفاع ثابت للتحسين
  },
  nameContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  savedNameItem: {
    backgroundColor: 'rgba(98, 58, 162, 0.1)',
    borderColor: '#623AA2',
    borderWidth: 1,
  },
  selectedNameItem: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderColor: '#4CAF50',
    borderWidth: 1,
  },
  updatingNameItem: {
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  checkmark: {
    position: 'absolute',
    right: 10,
  },
});

export default React.memo(NamesList); 
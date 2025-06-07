import React, { useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ImageBackground, ViewStyle, TextStyle } from 'react-native';
import { FlatList } from 'react-native';
import { getLetterGif } from 'data/BabyGifs';
import { theme } from '@/constants/Colors1';
import Font from '@/constants/Fonts';
import { AlphabetSection } from '../types';

interface AlphabetListProps {
  data: AlphabetSection[];
  selectedLetter: string;
  onLetterChange: (letter: string) => void;
}

// استخدام React.memo لتجنب إعادة العرض غير الضروري للمكونات الفرعية
const LetterItem = React.memo(({ 
  letter, 
  isSelected, 
  onPress 
}: { 
  letter: string; 
  isSelected: boolean; 
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.letterItem, isSelected && styles.selectedLetter]}
    >
      <View style={[
        styles.letterBackground, 
        isSelected ? styles.selectedBackground : styles.defaultBackground
      ]}>
        <Text style={[
          styles.letterText, 
          isSelected ? styles.selectedLetterText : null
        ]}>
          {letter}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const AlphabetList: React.FC<AlphabetListProps> = ({
  data,
  selectedLetter,
  onLetterChange
}) => {
  // استخدام useRef للاحتفاظ بمرجع قائمة الأبجدية
  const flatListRef = useRef<FlatList>(null);
  
  // تحديد موضع الحرف المحدد في القائمة
  const selectedIndex = data.findIndex(item => item.letter === selectedLetter);

  // ترتيب عناصر القائمة الأبجدية
  const renderAlphabetItem = ({ item }: { item: AlphabetSection }) => {
    const isSelected = selectedLetter === item.letter;
    
    return (
      <LetterItem
        letter={item.letter}
        isSelected={isSelected}
        onPress={() => onLetterChange(item.letter)}
      />
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={renderAlphabetItem}
      keyExtractor={item => item.letter}
      style={styles.alphabetList}
      initialNumToRender={8}  // عرض عدد محدود من العناصر في البداية
      maxToRenderPerBatch={5} // تحميل مجموعات صغيرة أثناء التمرير
      windowSize={7} // حجم نافذة العرض للتحسين
      getItemLayout={(data, index) => (
        {length: 70, offset: 70 * index, index} // تحديد أبعاد العناصر مسبقًا لتسريع العرض
      )}
      // منع إعادة ضبط موضع القائمة عند تحديث البيانات
      maintainVisibleContentPosition={{
        minIndexForVisible: 0,
      }}
    />
  );
};

const styles = StyleSheet.create({
  alphabetList: {
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  letterItem: {
    width: 60,
    height: 60,
    margin: 5,
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  selectedLetter: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  letterBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterBackgroundImage: {
    borderRadius: 30,
  },
  defaultBackground: {
    backgroundColor: '#f0f0f0',
  },
  selectedBackground: {
    backgroundColor: theme.colors.primary,
  },
  letterTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: Font.raleway,
  },
  selectedLetterText: {
    color: '#fff',
  },
});

export default React.memo(AlphabetList); 
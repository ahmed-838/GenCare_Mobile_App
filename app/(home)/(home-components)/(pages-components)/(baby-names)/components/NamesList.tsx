import React, { useState, useCallback, useMemo } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { BabyName } from '@/data/babyNames';
import Font from '@/constants/Fonts';
import { LinearGradient } from 'expo-linear-gradient';

interface NamesListProps {
  names: BabyName[];
  selectedNames: BabyName[];
  savedNamesByLetter: Record<string, BabyName[]>;
  selectedLetter: string;
  hasChanges: boolean;
  onNameSelection: (name: BabyName) => void;
}

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
  const genderColors = item.gender === 'M' ? 
    ['#E3F2FD', '#BBDEFB'] : 
    ['#FCE4EC', '#F8BBD0'];
  
  const genderIcon = item.gender === 'M' ? 'male' : 'female';
  const iconColor = item.gender === 'M' ? '#1976D2' : '#D81B60';
  
  // اختيار نمط العنصر بناءً على الحالة
  const getBorderStyle = () => {
    if (isSaved) {
      return {
        borderColor: '#623AA2',
        borderWidth: 2,
      };
    }
    if (isSelected) {
      return {
        borderColor: '#4CAF50',
        borderWidth: isUpdating ? 2 : 1,
      };
    }
    return {};
  };
  
  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.nameItem,
        getBorderStyle(),
      ]}
    >
      <LinearGradient
        colors={genderColors as any}
        style={styles.nameItemGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.nameContent}>
          <Ionicons 
            name={genderIcon} 
            size={16} 
            color={iconColor} 
          />
          <Text style={[styles.nameText, { color: iconColor }]}>
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
      </LinearGradient>
    </TouchableOpacity>
  );
});

// مكون لقائمة فارغة
const EmptyListPlaceholder = React.memo(() => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>No names available for this letter</Text>
  </View>
));

// مكون لحالة التحميل
const ListFooter = React.memo(({ loading }: { loading: boolean }) => {
  if (!loading) return null;
  
  return (
    <View style={styles.footerContainer}>
      <ActivityIndicator size="small" color="#623AA2" />
      <Text style={styles.loadingText}>Loading more names...</Text>
    </View>
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
  const [isLoading, setIsLoading] = useState(false);

  const savedNamesMap = useMemo(() => {
    const map = new Map<string, boolean>();
    const savedNames = savedNamesByLetter[selectedLetter] || [];
    savedNames.forEach(name => {
      map.set(name.name, true);
    });
    return map;
  }, [savedNamesByLetter, selectedLetter]);
  
  const selectedNamesMap = useMemo(() => {
    const map = new Map<string, boolean>();
    selectedNames.forEach(name => {
      map.set(name.name, true);
    });
    return map;
  }, [selectedNames]);

  const ListHeader = useMemo(() => (
    <View style={styles.listHeader}>
      <Text style={styles.listHeaderText}>
        {names.length} {names.length === 1 ? 'name' : 'names'} available
      </Text>
    </View>
  ), [names.length]);

  const handleNamePress = useCallback((name: BabyName) => {
    onNameSelection(name);
  }, [onNameSelection]);

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

  const getItemLayout = useCallback((data: any, index: number) => ({
    length: 65,
    offset: 65 * Math.floor(index / 2) + (index % 2 === 0 ? 0 : 5),
    index,
  }), []);

  const handleEndReached = useCallback(() => {
    if (names.length > 20 && !isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [names.length, isLoading]);

  return (
    <View style={styles.namesContainer}>
      <FlatList
        data={names}
        renderItem={renderNameItem}
        keyExtractor={item => item.name}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.namesGrid}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={<EmptyListPlaceholder />}
        ListFooterComponent={<ListFooter loading={isLoading} />}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        nestedScrollEnabled={true}
        removeClippedSubviews={true} 
        maxToRenderPerBatch={10} 
        windowSize={5}
        initialNumToRender={12}
        getItemLayout={getItemLayout}
        updateCellsBatchingPeriod={50}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  namesContainer: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 15,
    margin: 10,
  },
  namesGrid: {
    paddingBottom: 20,
  },
  nameItem: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    height: 65,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  nameItemGradient: {
    flex: 1,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: Font.raleway,
  },
  checkmark: {
    position: 'absolute',
    right: 10,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    fontFamily: Font.raleway,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
    fontFamily: Font.raleway,
  },
  listHeader: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 5,
  },
  listHeaderText: {
    fontSize: 14,
    color: '#666',
    fontFamily: Font.raleway,
  },
});

export default React.memo(NamesList); 
import React from 'react';
import { View, TouchableOpacity, Text, RefreshControl, ScrollView, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ExpandedSections, SavedDisease } from '../../types/profile.types';
import { BabyName } from '@/data/babyNames';
import { NewsList } from '@/data/pregnancyweeks';
import { diseases } from '@/data/diseases';
import { styles } from './SavedItemsStyles';

interface SavedItemsSectionProps {
  expandedSections: ExpandedSections;
  toggleSection: (section: keyof ExpandedSections) => void;
  savedWeeks: Array<{ week: string; date: string }>;
  savedDiseases: SavedDisease[];
  savedBabyNames: Array<{ letter: string; names: BabyName[] }>;
  onDeleteWeek?: (week: string) => void;
  onDeleteDisease?: (id: string) => void;
  onDeleteBabyNameLetter?: (letter: string) => void;
  onDeleteBabyName?: (letter: string, name: string) => void;
  onRefresh?: () => void;
}

export const SavedItemsSection: React.FC<SavedItemsSectionProps> = ({
  expandedSections,
  toggleSection,
  savedWeeks,
  savedDiseases,
  savedBabyNames,
  onDeleteWeek,
  onDeleteDisease,
  onDeleteBabyNameLetter,
  onDeleteBabyName,
  onRefresh
}) => {
  const router = useRouter();
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    if (onRefresh) {
      setRefreshing(true);
      await onRefresh();
      setRefreshing(false);
    }
  };

  return (
    <ScrollView 
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={['#623AA2']}
          tintColor="#623AA2"
        />
      }
    >
      <View style={styles.card}>
        <ThemedText style={styles.cardTitle}>Saved Items</ThemedText>
        
        {/* Diseases Section */}
        <TouchableOpacity 
          style={styles.sectionHeader} 
          onPress={() => toggleSection('diseases')}
        >
          <ThemedText style={styles.sectionTitle}>Diseases</ThemedText>
          <FontAwesome 
            name={expandedSections.diseases ? 'chevron-up' : 'chevron-down'} 
            size={16} 
            color="#495057" 
          />
        </TouchableOpacity>
        {expandedSections.diseases && (
          <View style={styles.sectionContent}>
            {savedDiseases && savedDiseases.length > 0 ? (
              savedDiseases.map((disease) => (
                <View 
                  key={`disease-${disease._id}`} 
                  style={styles.savedItem}
                >
                  <View>
                    <ThemedText style={styles.diseaseName}>
                      {disease.name}
                    </ThemedText>
                    <ThemedText style={styles.dateText}>
                      {disease.date ? new Date(disease.date).toLocaleDateString() : 'No date'}
                    </ThemedText>
                  </View>
                  <View style={styles.itemActions}>
                    <TouchableOpacity
                      onPress={() => {
                        const diseaseInfo = diseases.find(d => d.id.toString() === disease._id || d.name === disease.name);
                        if (diseaseInfo) {
                          router.push({
                            pathname: '/(home)/(home-components)/(pages-components)/(diseases-pages-components)/diseases-page-components',
                            params: { diseaseId: diseaseInfo.id }
                          });
                        } else {
                          console.log('Disease not found in local data:', disease);
                        }
                      }}
                      style={styles.actionButton}
                    >
                      <FontAwesome 
                        name="eye" 
                        size={20} 
                        color="#623AA2"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => onDeleteDisease && onDeleteDisease(disease._id)}
                      style={styles.actionButton}
                    >
                      <FontAwesome 
                        name="trash-o" 
                        size={20} 
                        color="#FF4444"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <ThemedText style={styles.emptyText}>No saved diseases</ThemedText>
            )}
          </View>
        )}

        {/* Weeks Section */}
        <TouchableOpacity 
          style={styles.sectionHeader} 
          onPress={() => toggleSection('weeks')}
        >
          <ThemedText style={styles.sectionTitle}>Saved Weeks</ThemedText>
          <FontAwesome 
            name={expandedSections.weeks ? 'chevron-up' : 'chevron-down'} 
            size={16} 
            color="#495057" 
          />
        </TouchableOpacity>
        {expandedSections.weeks && (
          <View style={styles.sectionContent}>
            {savedWeeks && savedWeeks.length > 0 ? (
              savedWeeks.map((item, index) => {
                const weekInfo = NewsList.find(w => w.id.toString() === item.week);
                return (
                  <View key={index} style={styles.savedItem}>
                    <ThemedText>Week {item.week}</ThemedText>
                    <View style={styles.itemActions}>
                      <TouchableOpacity
                        onPress={() => router.push({
                          pathname: '/(home)/(home-components)/(pages-components)/pregnancyPage',
                          params: { news: JSON.stringify(weekInfo) }
                        })}
                        style={styles.actionButton}
                      >
                        <FontAwesome name="eye" size={20} color="#623AA2" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => onDeleteWeek && onDeleteWeek(item.week)}
                        style={styles.actionButton}
                      >
                        <FontAwesome name="trash-o" size={20} color="#FF4444" />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })
            ) : (
              <ThemedText style={styles.emptyText}>No saved weeks</ThemedText>
            )}
          </View>
        )}

        {/* Baby Names Section */}
        <TouchableOpacity 
          style={styles.sectionHeader} 
          onPress={() => toggleSection('babyNames')}
        >
          <ThemedText style={styles.sectionTitle}>Baby Names</ThemedText>
          <FontAwesome 
            name={expandedSections.babyNames ? 'chevron-up' : 'chevron-down'} 
            size={16} 
            color="#495057" 
          />
        </TouchableOpacity>
        {expandedSections.babyNames && (
          <View style={styles.sectionContent}>
            {savedBabyNames && savedBabyNames.length > 0 ? (
              savedBabyNames.map((group) => (
                <View key={group.letter} style={styles.letterGroup}>
                  <View style={styles.letterHeaderContainer}>
                    <View style={styles.letterBadge}>
                      <Text style={styles.letterBadgeText}>{group.letter}</Text>
                    </View>
                    <Text style={styles.letterCount}>
                      {group.names.length} {group.names.length === 1 ? 'name' : 'names'}
                    </Text>
                    <View style={styles.letterActions}>
                      <TouchableOpacity
                        onPress={() => router.push({
                          pathname: '/(home)/(home-components)/(pages-components)/(baby-names)/BabyNames',
                          params: { selectedLetter: group.letter }
                        })}
                        style={styles.actionButton}
                      >
                        <FontAwesome name="eye" size={20} color="#623AA2" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => onDeleteBabyNameLetter && onDeleteBabyNameLetter(group.letter)}
                        style={styles.actionButton}
                      >
                        <FontAwesome name="trash-o" size={20} color="#FF4444" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.namesContainer}>
                    {group.names.map((name) => (
                      <TouchableOpacity 
                        key={name.name} 
                        style={[
                          styles.nameItem,
                          { backgroundColor: name.gender === 'M' ? 'rgba(149, 202, 228, 0.2)' : 'rgba(255, 185, 204, 0.2)' }
                        ]}
                        onPress={() => onDeleteBabyName && onDeleteBabyName(group.letter, name.name)}
                        activeOpacity={0.7}
                      >
                        <View style={styles.nameContent}>
                          <Ionicons 
                            name={name.gender === 'M' ? 'male' : 'female'} 
                            size={16} 
                            color={name.gender === 'M' ? '#95cae4' : '#ffb9cc'} 
                          />
                          <Text style={[
                            styles.nameText,
                            { color: name.gender === 'M' ? '#3a7ea1' : '#d16c88' }
                          ]}>
                            {name.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))
            ) : (
              <ThemedText style={styles.emptyText}>No saved baby names</ThemedText>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}; 

export default SavedItemsSection;
import { View, StyleSheet, TouchableOpacity, Image, Text, ActivityIndicator, ScrollView, Dimensions, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useState } from 'react';
import React from 'react';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { uploadImageForDiagnosis } from '@/api/aiDiagnosis';

const { width, height } = Dimensions.get('window');

// Map condition names to user-friendly names, descriptions and icons
const CONDITIONS_MAP: {[key: string]: {name: string, description: string, color: string, icon: string}} = {
  'moderate-ventriculomegaly': {
    name: 'Moderate Ventriculomegaly',
    description: 'Enlarged ventricles in the brain with 10-15mm dilation.',
    color: '#FF9800',
    icon: 'brain'
  },
  'severe-ventriculomegaly': {
    name: 'Severe Ventriculomegaly',
    description: 'Significantly enlarged ventricles greater than 15mm in width.',
    color: '#F44336',
    icon: 'brain'
  },
  'mild-ventriculomegaly': {
    name: 'Mild Ventriculomegaly',
    description: 'Slightly enlarged ventricles between 10-12mm.',
    color: '#FFC107',
    icon: 'brain'
  },
  'normal': {
    name: 'Normal Brain',
    description: 'No abnormalities detected in the brain structure.',
    color: '#4CAF50',
    icon: 'brain'
  },
  'arachnoid-cyst': {
    name: 'Arachnoid Cyst',
    description: 'Fluid-filled sac that develops between the brain or spinal cord and the arachnoid membrane.',
    color: '#9C27B0',
    icon: 'brain'
  },
  'cerebellah-hypoplasia': {
    name: 'Cerebellar Hypoplasia',
    description: 'Underdevelopment of the cerebellum, which affects motor control and coordination.',
    color: '#3F51B5',
    icon: 'brain'
  },
  'colphocephaly': {
    name: 'Colpocephaly',
    description: 'Enlargement of the occipital horns of the lateral ventricles.',
    color: '#2196F3',
    icon: 'brain'
  },
  'encephalocele': {
    name: 'Encephalocele',
    description: 'Protrusion of brain tissue and membranes through a defect in the skull.',
    color: '#E91E63',
    icon: 'brain'
  },
  'polencephaly': {
    name: 'Porencephaly',
    description: 'Cysts or cavities within the cerebral hemisphere.',
    color: '#673AB7',
    icon: 'brain'
  }
};

export default function AIChatPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (imageUri: string) => {
    setLoading(true);
    setApiResponse(null);
    setSelectedCondition(null);
    
    try {
      console.log('uploading image...');
      const response = await uploadImageForDiagnosis(imageUri);
      console.log('received response:', response);
      setApiResponse(response);
      
      // Automatically select the top condition
      const topCondition = getTopCondition();
      if (topCondition) {
        setSelectedCondition(topCondition);
      }
    } catch (error) {
      console.error('error in uploading image:', error);
      setApiResponse({ error: 'failed to upload image' });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSelectedImage(null);
    setApiResponse(null);
    setSelectedCondition(null);
  };

  // Format condition name to be more readable
  const formatConditionName = (conditionKey: string): string => {
    if (CONDITIONS_MAP[conditionKey]) {
      return CONDITIONS_MAP[conditionKey].name;
    }
    
    return conditionKey
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Get top predicted condition from response
  const getTopCondition = () => {
    try {
      if (!apiResponse) return null;
      
      // Check for predicted_classes directly, then in results
      const predictedClasses = apiResponse.predicted_classes || 
                              apiResponse.results?.predicted_classes;
      
      if (predictedClasses && predictedClasses.length > 0) {
        return predictedClasses[0];
      }
      
      // If no predicted_classes, try to extract from diagnosis_message
      const diagnosisMessage = apiResponse.diagnosis_message || 
                               apiResponse.results?.diagnosis_message;
      
      if (diagnosisMessage && diagnosisMessage.includes('detected:')) {
        const condition = diagnosisMessage.split('detected:')[1].trim();
        return condition;
      }
      
      return null;
    } catch (e) {
      console.error('Error getting top condition:', e);
      return null;
    }
  };
  
  // Get predictions with confidence levels
  const getPredictions = () => {
    try {
      if (!apiResponse) return [];
      
      // Check for predictions in results
      const predictions = apiResponse.predictions || apiResponse.results?.predictions;
      
      if (!predictions) return [];
      
      return Object.entries(predictions).map(([key, value]: [string, any]) => ({
        condition: key,
        confidence: value.confidence || 0,
        classId: value.class_id
      })).sort((a, b) => b.confidence - a.confidence);
    } catch (e) {
      console.error('Error getting predictions:', e);
      return [];
    }
  };
  
  // Get all predictions for display (all 9 conditions)
  const getAllPredictions = () => {
    const predictions = getPredictions();
    return predictions;
  };

  // Get appropriate color based on confidence
  const getConfidenceColor = (confidence: number, condition: string) => {
    // If the condition is in our map, use its color
    if (CONDITIONS_MAP[condition]) {
      return CONDITIONS_MAP[condition].color;
    }
    
    // Otherwise use a color based on confidence
    if (confidence > 0.7) return '#F44336'; // High - Red
    if (confidence > 0.4) return '#FF9800'; // Medium - Orange
    if (confidence > 0.2) return '#FFC107'; // Low-Medium - Amber
    return '#4CAF50'; // Low - Green
  };

  // Get diagnosis message
  const getDiagnosisMessage = () => {
    try {
      if (!apiResponse) return null;
      
      return apiResponse.diagnosis_message || 
             apiResponse.results?.diagnosis_message;
    } catch (e) {
      console.error('Error getting diagnosis message:', e);
      return null;
    }
  };

  // Get condition description
  const getConditionDescription = (condition: string) => {
    if (CONDITIONS_MAP[condition]) {
      return CONDITIONS_MAP[condition].description;
    }
    return null;
  };

  // Calculate diagnostic metrics
  const getDiagnosticMetrics = () => {
    try {
      if (!apiResponse) return null;
      
      return {
        time: apiResponse.results?.time || apiResponse.time,
        inferenceId: apiResponse.results?.inference_id || apiResponse.inference_id,
      };
    } catch (e) {
      console.error('Error getting diagnostic metrics:', e);
      return null;
    }
  };

  // Calculate highest confidence level
  const getHighestConfidence = () => {
    const predictions = getPredictions();
    if (predictions.length === 0) return 0;
    return predictions[0].confidence;
  };

  return (
    <ScrollView style={styles.container} bounces={false}>
      <View style={styles.headerBackground} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="brain" size={40} color="#fff" />
          <ThemedText style={styles.title}>Ultrasound Image Analysis</ThemedText>
          <ThemedText style={styles.subtitle}>Using AI to analyze fetal health</ThemedText>
        </View>

        {!selectedImage ? (
          <View style={styles.uploadSection}>
            <TouchableOpacity 
              style={styles.uploadButton} 
              onPress={handleImagePick}
              activeOpacity={0.8}
            >
              <View style={styles.uploadIconContainer}>
                <Ionicons name="cloud-upload-outline" size={50} color="#9C92CE" />
              </View>
              <ThemedText style={styles.uploadText}>Choose image for analysis</ThemedText>
              <ThemedText style={styles.helperText}>Tap to select an ultrasound image</ThemedText>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.resultContainer}>
            {/* Image with diagnosis overlay */}
            <View style={styles.imageCard}>
              <Image 
                source={{ uri: selectedImage }}
                style={styles.imagePreview}
                resizeMode="contain"
              />
              
              {/* Overlay with top diagnosis if available */}
              {!loading && apiResponse && !apiResponse.error && getTopCondition() && (
                <View style={styles.diagnosisOverlay}>
                  <View style={styles.diagnosisGradient}>
                    <ThemedText style={styles.diagnosisOverlayText}>
                      {formatConditionName(getTopCondition())}
                    </ThemedText>
                  </View>
                </View>
              )}
            </View>

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#9C92CE" />
                <ThemedText style={styles.loadingText}>Analyzing image...</ThemedText>
                <ThemedText style={styles.loadingSubtext}>Please wait while our AI processes your ultrasound</ThemedText>
              </View>
            ) : (
              <View style={styles.responseContainer}>
                {apiResponse && apiResponse.error ? (
                  <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle" size={40} color="#FF6B6B" />
                    <ThemedText style={styles.errorText}>{apiResponse.error}</ThemedText>
                  </View>
                ) : apiResponse ? (
                  <View style={styles.resultsSection}>
                    {/* Main diagnosis section */}
                    <View style={styles.diagnosisCard}>
                      <View style={styles.diagnosisHeader}>
                        <ThemedText style={styles.responseTitle}>Analysis Results</ThemedText>
                        {getDiagnosticMetrics()?.time && (
                          <ThemedText style={styles.diagnosisTime}>
                            Processing time: {(getDiagnosticMetrics()?.time * 1000).toFixed(2)}ms
                          </ThemedText>
                        )}
                      </View>
                      
                      {getTopCondition() && (
                        <View style={styles.mainDiagnosisContainer}>
                          <View style={[
                            styles.conditionIconContainer,
                            {backgroundColor: getConfidenceColor(getHighestConfidence(), getTopCondition())}
                          ]}>
                            <FontAwesome5 
                              name={CONDITIONS_MAP[getTopCondition()]?.icon || 'brain'} 
                              size={26} 
                              color="#fff" 
                            />
                          </View>
                          <ThemedText style={styles.diagnosisMain}>
                            {formatConditionName(getTopCondition())}
                          </ThemedText>
                          
                          {getConditionDescription(getTopCondition()) && (
                            <ThemedText style={styles.diagnosisDescription}>
                              {getConditionDescription(getTopCondition())}
                            </ThemedText>
                          )}
                        </View>
                      )}
                    </View>
                    
                    {/* All conditions chart section */}
                    <View style={styles.chartContainer}>
                      <ThemedText style={styles.chartTitle}>All Conditions Analysis</ThemedText>
                      
                      <View style={styles.chartContent}>
                        {getAllPredictions().map((prediction, index) => (
                          <View key={index} style={styles.chartItem}>
                            <View style={styles.chartLabelContainer}>
                              <Text 
                                style={[
                                  styles.chartLabel, 
                                  getTopCondition() === prediction.condition ? styles.selectedChartLabel : null
                                ]}
                              >
                                {formatConditionName(prediction.condition)}
                              </Text>
                              <Text 
                                style={[
                                  styles.chartValue,
                                  getTopCondition() === prediction.condition ? styles.selectedChartValue : null
                                ]}
                              >
                                {Math.round(prediction.confidence * 100)}%
                              </Text>
                            </View>
                            
                            <View style={styles.chartBarContainer}>
                              <View 
                                style={[
                                  styles.chartBar, 
                                  { 
                                    width: `${Math.max(3, Math.round(prediction.confidence * 100))}%`,
                                    backgroundColor: getConfidenceColor(prediction.confidence, prediction.condition),
                                    opacity: getTopCondition() === prediction.condition ? 1 : 0.7
                                  }
                                ]} 
                              />
                            </View>
                            
                            {prediction.condition === selectedCondition && (
                              <View style={styles.conditionInfo}>
                                <ThemedText style={styles.conditionInfoText}>
                                  {getConditionDescription(prediction.condition) || ''}
                                </ThemedText>
                              </View>
                            )}
                          </View>
                        ))}
                      </View>
                    </View>
                    
                    {/* Information Note */}
                    <View style={styles.infoNote}>
                      <Ionicons name="information-circle-outline" size={18} color="#666" style={styles.infoIcon} />
                      <ThemedText style={styles.infoText}>
                        Values represent confidence levels for each condition
                      </ThemedText>
                    </View>
                  </View>
                ) : null}
                
                {/* Button to scan new image */}
                <TouchableOpacity 
                  style={styles.resetButton} 
                  onPress={reset}
                  activeOpacity={0.8}
                >
                  <Ionicons name="refresh" size={20} color="#fff" style={styles.buttonIcon} />
                  <ThemedText style={styles.resetButtonText}>Analyze new image</ThemedText>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height * 0.3,
    backgroundColor: '#9C92CE',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  uploadSection: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  uploadButton: {
    width: width * 0.85,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  uploadIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(156, 146, 206, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  uploadText: {
    fontSize: 20,
    color: '#4A4A4A',
    marginTop: 10,
    fontWeight: '600',
  },
  helperText: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
  },
  resultContainer: {
    width: '100%',
    alignItems: 'center',
  },
  imageCard: {
    width: width * 0.85,
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    marginBottom: 20,
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  diagnosisOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
  },
  diagnosisGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  diagnosisOverlayText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  loadingContainer: {
    width: width * 0.85,
    padding: 30,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  loadingText: {
    fontSize: 18,
    color: '#4A4A4A',
    marginTop: 20,
    fontWeight: '600',
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
    textAlign: 'center',
  },
  responseContainer: {
    width: width * 0.85,
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
  },
  resultsSection: {
    width: '100%',
  },
  diagnosisCard: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  diagnosisHeader: {
    marginBottom: 15,
  },
  responseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4A4A',
    textAlign: 'center',
  },
  diagnosisTime: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 5,
  },
  mainDiagnosisContainer: {
    alignItems: 'center',
    padding: 15,
  },
  conditionIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  diagnosisMain: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: 10,
  },
  diagnosisDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  chartContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 15,
  },
  chartContent: {
    width: '100%',
  },
  chartItem: {
    marginBottom: 16,
    width: '100%',
  },
  chartLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  chartLabel: {
    fontSize: 13,
    color: '#555',
    flex: 1,
  },
  selectedChartLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  chartValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#555',
  },
  selectedChartValue: {
    color: '#333',
  },
  chartBarContainer: {
    width: '100%',
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  chartBar: {
    height: '100%',
    borderRadius: 6,
  },
  conditionInfo: {
    marginTop: 6,
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    borderLeftWidth: 2,
    borderLeftColor: '#9C92CE',
  },
  conditionInfoText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  infoNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginBottom: 15,
  },
  infoIcon: {
    marginRight: 5,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
  },
  errorContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderRadius: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
    marginTop: 10,
  },
  resetButton: {
    backgroundColor: '#9C92CE',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

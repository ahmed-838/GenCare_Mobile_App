import { View, StyleSheet, TouchableOpacity, Animated, Dimensions, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Navbar from '../(navbar)/navbar';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const NAVBAR_HEIGHT = SCREEN_HEIGHT * 0.12;

export default function AIChatPage() {
  const [isEnvelopeClosed, setIsEnvelopeClosed] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const envelopeAnimation = useRef(new Animated.Value(0)).current;
  const bottomFlapAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scrollY = new Animated.Value(0);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      // Animate envelope closing
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 300,
        useNativeDriver: true,
      }).start(() => closeEnvelope());
    }
  };

  const closeEnvelope = () => {
    Animated.sequence([
      Animated.timing(bottomFlapAnimation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(envelopeAnimation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start(() => {
      setIsEnvelopeClosed(true);
      startLoading();
    });
  };

  const startLoading = () => {
    // Fade out envelope
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setShowLoader(true);
      // Fade in loader
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      // Show success after delay
      setTimeout(() => {
        // Fade out loader
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setShowLoader(false);
          setShowSuccess(true);
          // Fade in success
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();
        });
      }, 3000);
    });
  };

  const resetForm = () => {
    // Fade out success
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setIsEnvelopeClosed(false);
      setSelectedImage(null);
      setShowLoader(false);
      setShowSuccess(false);
      envelopeAnimation.setValue(0);
      bottomFlapAnimation.setValue(0);
      // Fade in envelope
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    scrollY.setValue(offsetY);
  };

  const navbarOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/ai_components/background.png')}
        style={styles.backgroundVideo}
      />

      <Animated.View style={[styles.navbarContainer, { opacity: navbarOpacity }]} />
      <Navbar 
        scrollY={scrollY}
        variant="simple"
        style={styles.navbar}
      />

      <Animated.View 
        style={[styles.contentContainer, { opacity: fadeAnim }]}
      >
        {showLoader && (
          <View style={styles.centerContent}>
            <View style={styles.loaderContainer}>
              <Image 
                source={require('@/assets/ai_components/baby.gif')}
                style={styles.loaderGif}
                resizeMode="contain"
              />
              <ThemedText style={styles.loaderText}>Analyzing Image...</ThemedText>
            </View>
          </View>
        )}

        {showSuccess && (
          <View style={styles.centerContent}>
            <View style={styles.successContainer}>
              <Ionicons name="checkmark-circle" size={50} color="#9C92CE" />
              <ThemedText style={styles.successTitle}>Analysis Complete</ThemedText>
              <ThemedText style={styles.successText}>
                Thank you for trusting us with your baby's health. Based on the scan results, 
                it seems your baby may have [Disease Name]. Don't worry - we're here to help 
                guide you through the next steps.
              </ThemedText>
              <TouchableOpacity 
                style={styles.resetButton}
                onPress={resetForm}
              >
                <ThemedText style={styles.resetButtonText}>Scan New Image</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {!showLoader && !showSuccess && (
          <View style={styles.envelopeContainer}>
            <View style={styles.envelope}>
              <TouchableOpacity 
                style={[styles.envelopeFront, { zIndex: 3 }]}
                onPress={handleImagePick}
                disabled={isEnvelopeClosed}
                activeOpacity={0.7}
              >
                {selectedImage ? (
                  <View style={styles.imageContainer}>
                    <Image 
                      source={{ uri: selectedImage }}
                      style={styles.uploadedImage}
                    />
                  </View>
                ) : (
                  <View style={[styles.uploadButton, { zIndex: 3 }]}>
                    <Ionicons 
                      name="cloud-upload-outline" 
                      size={40} 
                      color="#fff" 
                    />
                    <ThemedText style={styles.uploadText}>Upload Image</ThemedText>
                  </View>
                )}
              </TouchableOpacity>
              
              <Animated.View
                style={[
                  styles.envelopeLid,
                  {
                    transform: [{
                      rotateX: envelopeAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['180deg', '0deg']
                      })
                    }]
                  }
                ]}
              />
              
              <Animated.View
                style={[
                  styles.bottomFlap,
                  {
                    transform: [{
                      rotateX: bottomFlapAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['180deg', '0deg']
                      })
                    }]
                  }
                ]}
                />
              
              <View style={[styles.envelopeSide, styles.leftSide]} />
              <View style={[styles.envelopeSide, styles.rightSide]} />
            </View>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 0,
  },
  backgroundVideo: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  navbarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: NAVBAR_HEIGHT,
    backgroundColor: 'white',
    zIndex: 1,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    height: NAVBAR_HEIGHT,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: NAVBAR_HEIGHT,
  },
  centerContent: {
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  envelopeContainer: {
    width: '90%',
    maxWidth: 400,
    aspectRatio: 16/9,
  },
  envelope: {
    width: '100%',
    height: '100%',
    backgroundColor: '#9C92CE',
    borderRadius: 24,
    overflow: 'hidden',
  },
  loaderContainer: {
    width: '90%',
    maxWidth: 400,
    aspectRatio: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successContainer: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  envelopeFront: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9C92CE',
    position: 'relative',
  },
  envelopeLid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: '#9f97cd',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    transform: [{ scaleY: 0.7 }],
    zIndex: 2,
    backfaceVisibility: 'hidden',
  },
  bottomFlap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: '#9f97cd',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    transform: [{ scaleY: 0.7 }],
    zIndex: 2,
    backfaceVisibility: 'hidden',
  },
  envelopeSide: {
    position: 'absolute',
    bottom: 0,
    width: '50%',
    height: '10%',
    backgroundColor: '#9f97cd',
    zIndex: 1,
  },
  leftSide: {
    left: 0,
    transform: [{ skewY: '45deg' }],
    transformOrigin: 'bottom left',
  },
  rightSide: {
    right: 0,
    transform: [{ skewY: '-45deg' }],
    transformOrigin: 'bottom right',
  },
  uploadButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  uploadText: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    resizeMode: 'contain',
  },
  loaderGif: {
    width: '80%',
    height: '80%',
    marginBottom: 15,
  },
  loaderText: {
    fontSize: 18,
    color: '#666',
    marginTop: 15,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#9C92CE',
  },
  successText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  resetButton: {
    backgroundColor: '#9C92CE',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

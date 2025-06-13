import { Image, StyleSheet,TextInput, Text, View, ImageBackground, TouchableOpacity, ScrollView, Dimensions, Alert } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import  AntDesign  from "@expo/vector-icons/AntDesign";
import React from "react";
import { useRouter } from "expo-router";
import {Animated} from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import MainButton from "@/constants/MainButton";
import { signup } from "@/api/signup";
import validateSignup from "@/validation/signup";
import alert from "@/errors/alert";

const SignupScreen = () => {
    const router = useRouter(); 
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [phone, setPhone] = React.useState('');
    
    // Animation values
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const slideAnim = React.useRef(new Animated.Value(-100)).current;
    const scaleAnim = React.useRef(new Animated.Value(0.3)).current;
    const slideBottomAnim = React.useRef(new Animated.Value(100)).current;
    const floatAnim = React.useRef(new Animated.Value(0)).current;

    // Reset and start animations
    const startAnimations = () => {
        // Reset all animation values
        fadeAnim.setValue(100);
        slideAnim.setValue(-100);
        scaleAnim.setValue(0.);
        slideBottomAnim.setValue(100);
        floatAnim.setValue(0);

        // Start entrance animations
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 10,
                friction: 2,
                useNativeDriver: true,
            }),
        ]).start();
    };

    // Use useFocusEffect instead of useEffect
    useFocusEffect(
        React.useCallback(() => {
            // This will run every time the screen comes into focus
            startAnimations();

            // Start floating animation
            const startFloatingAnimation = () => {
                Animated.sequence([
                    Animated.timing(floatAnim, {
                        toValue: 1,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(floatAnim, {
                        toValue: 0,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(slideBottomAnim, {
                      toValue: 0,
                      duration: 800,
                      useNativeDriver: true,
                  }),
                ]).start(() => startFloatingAnimation());
            };

            startFloatingAnimation();

            // Cleanup when screen loses focus
            return () => {
                fadeAnim.stopAnimation();
                slideAnim.stopAnimation();
                slideBottomAnim.stopAnimation();
                scaleAnim.stopAnimation();
                floatAnim.stopAnimation();
            };
        }, [])
    );

    const handleSignUp = async () => {
        if(!validateSignup(username, phone, email, password)) {
            return;
        }

        try {
            await signup(username, phone, email, password);
        } catch (error) {
            console.log("error from signup",error);
        }
    };  

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Animated.View 
            style={[
                styles.topImageContainer,
                {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }]
                }
            ]}
        >
            <Image
                source={require("@/assets/auth_imgs/svg.png")}
                style={styles.topImage}
            />
        </Animated.View>

        <Animated.View style={[
            styles.contentContainer,
            {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
            }
        ]}>
            <View style={styles.helloContainer}>
                <Text style={styles.Welcome}>Join GenCare</Text>
                <Text style={styles.subText}>Create your account to get started</Text>
            </View>

            <View style={styles.logoContainer}>
                <Image
                    source={require("@/assets/Logo/Mob-Logo-removebg-preview.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <FontAwesome name="user" size={20} color="#F78DA7" style={styles.inputIcon} />
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Full Name" 
                        placeholderTextColor="#A0A0A0"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="words"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <AntDesign name="mail" size={20} color="#F78DA7" style={styles.inputIcon} />
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Email Address" 
                        placeholderTextColor="#A0A0A0"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <AntDesign name="phone" size={20} color="#F78DA7" style={styles.inputIcon} />
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Phone Number" 
                        placeholderTextColor="#A0A0A0"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <FontAwesome name="lock" size={20} color="#F78DA7" style={styles.inputIcon} />
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Password" 
                        placeholderTextColor="#A0A0A0"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                <View style={styles.createButtonContainer}>
                    <MainButton 
                        title="Sign Up"
                        onPress={handleSignUp}
                        backgroundColor="#F78DA7"
                    />       
                </View>

                <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>OR</Text>
                    <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity onPress={() => router.push('/(auth)/login')} style={styles.loginContainer} activeOpacity={0.8}>
                    <Text style={styles.footerText}>
                        Already have an account? <Text style={styles.loginText}>Sign In</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    </ScrollView>
  );
};

export default SignupScreen;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F9FA",
    flex: 1,
  },
  topImageContainer: {
    alignItems: 'center',
  },
  topImage: {
    width: width,
    height: height * 0.12,
    minHeight: 80,
    maxHeight: 120,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.02,
  },
  helloContainer: {
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  Welcome: {
    fontSize: Math.min(28, width * 0.07),
    fontWeight: "700",
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: height * 0.01,
  },
  subText: {
    fontSize: Math.min(16, width * 0.04),
    color: "#7F8C8D",
    textAlign: "center",
    fontWeight: "400",
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  logo: {
    width: width * 0.3,
    height: height * 0.12,
    resizeMode: 'contain',
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: width * 0.06,
    marginTop: height * 0.01,
    marginBottom: height * 0.03,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: height * 0.012,
    borderRadius: 15,
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E9ECEF",
    height: Math.max(50, height * 0.06),
    paddingHorizontal: width * 0.04,
  },
  inputIcon: {
    marginRight: width * 0.03,
  },
  textInput: {
    flex: 1,
    fontSize: Math.min(16, width * 0.04),
    color: '#2C3E50',
    fontWeight: "400",
  },
  createButtonContainer: {
    width: '100%',
    marginTop: height * 0.02,
    marginBottom: height * 0.03,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.02,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E9ECEF',
  },
  dividerText: {
    marginHorizontal: width * 0.04,
    color: '#95A5A6',
    fontSize: Math.min(12, width * 0.03),
    fontWeight: "500",
  },
  loginContainer: {
    alignItems: 'center',
    paddingVertical: height * 0.02,
    borderRadius: 15,
    backgroundColor: "#F8F9FA",
  },
  footerText: {
    color: "#7F8C8D",
    fontSize: Math.min(16, width * 0.04),
    fontWeight: "400",
  },
  loginText: {
    color: "#8ED1FC",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});

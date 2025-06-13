import { Image, StyleSheet, TextInput, Text, View, TouchableOpacity, Animated, Dimensions, Alert, ScrollView } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { useRouter } from "expo-router";
import { useFocusEffect } from '@react-navigation/native';
import MainButton from "@/constants/MainButton";
import { login } from '@/api/login';
import { isAuthenticated } from "@/utils/auth";
import { useNotifications } from "@/contexts/NotificationContext";

const LoginScreen = () => {
    const router = useRouter();
    const [identifier, setIdentifier] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const { login: updateNotificationLogin } = useNotifications();

    // Animation values
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const slideTopAnim = React.useRef(new Animated.Value(-100)).current;
    const slideBottomAnim = React.useRef(new Animated.Value(100)).current;
    const scaleAnim = React.useRef(new Animated.Value(0.3)).current;

    // check if the user is logged in and redirect to the home page
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    React.useEffect(() => {
        const checkAuth = async () => {
            const isLoggedIn = await isAuthenticated();
            setIsLoggedIn(isLoggedIn);
            if (isLoggedIn) {
                router.push('/(home)/home');
            }
        };
        checkAuth();
    }, []);

    const startAnimations = () => {
        // Reset animations
        fadeAnim.setValue(100);
        slideTopAnim.setValue(-100);
        slideBottomAnim.setValue(100);
        scaleAnim.setValue(0.3);

        // Start animations
        Animated.parallel([
            // Fade in everything
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            // Slide in top image
            Animated.timing(slideTopAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
            // Slide in bottom vector
            Animated.timing(slideBottomAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
            // Scale up the content
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 10,
                friction: 2,
                useNativeDriver: true,
            }),
        ]).start();
    };

    useFocusEffect(
        React.useCallback(() => {
            startAnimations();
            return () => {
                fadeAnim.stopAnimation();
                slideTopAnim.stopAnimation();
                slideBottomAnim.stopAnimation();
                scaleAnim.stopAnimation();
            };
        }, [])
    );

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            await login(identifier, password, updateNotificationLogin);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };



    const handleRegister = () => {
        router.push('/(auth)/signup');
    };

    const handleForgotPassword = () => {
        router.push('/(auth)/forgotPassword');
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Animated.View 
                style={[
                    styles.topImageContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideTopAnim }]
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
                    <Text style={styles.helloText}>Welcome Back!</Text>
                    <Text style={styles.subText}>Sign in to continue to GenCare</Text>
                </View>
                
                <View style={styles.logoContainer}>
                    <TouchableOpacity onPress={() => router.push('/(home)/home')} activeOpacity={0.8}>
                        <Image
                            source={require("@/assets/Logo/Mob-Logo-removebg-preview.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <FontAwesome name="user" size={20} color="#8ED1FC" style={styles.inputIcon} />
                        <TextInput 
                            style={styles.textInput} 
                            placeholder="Email or Phone Number"
                            placeholderTextColor="#A0A0A0"
                            value={identifier}
                            onChangeText={setIdentifier}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <FontAwesome name="lock" size={20} color="#8ED1FC" style={styles.inputIcon} />
                        <TextInput 
                            style={styles.textInput} 
                            placeholder="Password" 
                            placeholderTextColor="#A0A0A0"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <TouchableOpacity onPress={handleForgotPassword} activeOpacity={0.7}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <View style={styles.signinButton}>
                        <MainButton 
                            title={isLoading ? "Signing In..." : "Sign In"}
                            onPress={handleLogin}
                            backgroundColor="#8ED1FC"
                        />      
                    </View>

                    <View style={styles.dividerContainer}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>OR</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <TouchableOpacity onPress={handleRegister} style={styles.registerContainer} activeOpacity={0.8}>
                        <Text style={styles.footerText}>
                            Join Us? <Text style={styles.registerText}>Create Account</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </ScrollView>
    );
};

export default LoginScreen;

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
    height: height * 0.15,
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
    marginBottom: height * 0.03,
  },
  helloText: {
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
    width: width * 0.35,
    height: height * 0.15,
    resizeMode: 'contain',
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: width * 0.06,
    marginTop: height * 0.02,
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
    marginVertical: height * 0.015,
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
  forgotPasswordText: {
    textAlign: "right",
    color: "#8ED1FC",
    fontSize: Math.min(14, width * 0.035),
    marginTop: height * 0.01,
    marginBottom: height * 0.03,
    fontWeight: "500",
  },
  signinButton: {
    alignSelf: 'center',
    width: '100%',
    marginBottom: height * 0.03,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.025,
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
  registerContainer: {
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
  registerText: {
    color: "#F78DA7",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});

import { Image, StyleSheet, TextInput, Text, View, TouchableOpacity, Animated, Dimensions, Alert } from "react-native";
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
        <View style={styles.container}>
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
            
            <Animated.View style={{
                opacity: fadeAnim,
            }}>
                <View style={styles.helloContainer}>
                    <Text style={styles.helloText}>Welcome Back to GenCare!</Text>
                </View>
                
                <View style={styles.logoContainer}>
                    <TouchableOpacity onPress={() => router.push('/(home)/home')}>
                    <Image
                        source={require("@/assets/Logo/Mob-Logo-removebg-preview.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.signInText}>Sign in to your account</Text>
                </View>

                <View style={styles.inputContainer}>
                    <FontAwesome name="user" size={24} color="#9A9A9A" style={styles.inputIcon} />
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Email or Phone Number"
                        value={identifier}
                        onChangeText={setIdentifier}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <FontAwesome name="lock" size={24} color="#9A9A9A" style={styles.inputIcon} />
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Password" 
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                <View style={styles.signinButton}>
                    <MainButton 
                        title={isLoading ? "Loading..." : "Sign In"}
                        onPress={handleLogin}
                        backgroundColor="#8ED1FC"
                        
                    />      
                </View>

                <View style={styles.socialMediaContainer}>
                    <AntDesign name="google" size={30} color="#9A9A9A" style={styles.socialMediaIcon} />
                </View>

                <TouchableOpacity onPress={handleRegister}>
                    <Text style={styles.footerText}>
                        Don't have an account? <Text style={{textDecorationLine: "underline"}}>Create</Text>
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
    position: "relative",
    marginBottom: "25%",
  },
  topImageContainer: {},
  topImage: {
    width: "100%",
    height: "18%",
    minHeight: 100,
    maxHeight: 150,
  },
  helloContainer: {},
  helloText: {
    textAlign: "center",
    fontSize: Math.min(32, Dimensions.get('window').width * 0.08),
    marginBottom: Dimensions.get('window').height * 0.01,
    fontWeight: "500",
    color: "#262626",
    paddingHorizontal: "5%",
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').height * 0.2,
    resizeMode: 'contain',
  },
  signInText: {
    textAlign: "center",
    fontSize: Math.min(18, Dimensions.get('window').width * 0.045),
    color: "#262626",
    marginBottom: "1%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "8%",
    marginVertical: "3%",
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    elevation: 10,
    height: Math.max(45, Dimensions.get('window').height * 0.06),
  },
  inputIcon: {
    marginLeft: "5%",
    marginRight: "2%",
  },
  textInput: {
    flex: 1,
    fontSize: Math.min(16, Dimensions.get('window').width * 0.04),
    color: '#000000',
    paddingHorizontal: 10,
  },
    forgotPasswordText: {
        textAlign: "right",
        color: "#BEBEBE",
        fontSize: Math.min(16, Dimensions.get('window').width * 0.04),
        marginRight: "10%",
        width: "90%",
    },
    signinButton: {
        marginTop: "5%",
        alignSelf: 'center',
        width: '40%',
        minWidth: 120,
        maxWidth: 200,
    },
    signinButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    socialMediaContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginVertical: "3%",
    },
    socialMediaIcon: {
      backgroundColor: "#FFFFFF",
      elevation: 10,
      margin: "1%",
      padding: "3%",
      borderRadius: 50,
  },
    footerText: {
        textAlign: "center",
        color: "#262626",
        fontSize: Math.min(18, Dimensions.get('window').width * 0.045),
        marginTop: "5%",
    },
    

});

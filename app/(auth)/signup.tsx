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
    <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="handled">
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
            <View>
                <Text style={styles.Welcome}>Welcome to GenCare</Text>
            </View>
            <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/Logo/Mob-Logo-removebg-preview.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

            <View style = {styles.inputContainer}>
                <FontAwesome name="user" size={24} color="#9A9A9A" style={styles.inputIcon} />
                <TextInput 
                    style={styles.textInput} 
                    placeholder="Name" 
                    value={username}
                    onChangeText={setUsername}
                />
            </View>
            <View style = {styles.inputContainer}>
                <FontAwesome name="lock" size={24} color="#9A9A9A" style={styles.inputIcon} />
                <TextInput 
                    style={styles.textInput} 
                    placeholder="Password" 
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>
            <View style = {styles.inputContainer}>
                <AntDesign name="mail" size={24} color="#9A9A9A" style={styles.inputIcon} />
                <TextInput 
                    style={styles.textInput} 
                    placeholder="E-mail" 
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <View style = {styles.inputContainer}>
                <AntDesign name="phone" size={24} color="#9A9A9A" style={styles.inputIcon} />
                <TextInput 
                    style={styles.textInput} 
                    placeholder="Mobile" 
                    value={phone}
                    onChangeText={setPhone}
                />
            </View>

            <View style={styles.createButtonContainer}>
                <MainButton 
          title="Sign Up"
          onPress={handleSignUp}
          backgroundColor="#F78DA7"
                />       
            </View>
            <View style={styles.footerContainer}>
                <Text style={styles.footerText}>Or create using..</Text>
                <View style={styles.socialMediaContainer}>
                    <AntDesign name="google" size={30} color="#9A9A9A" style={styles.socialMediaIcon} />
                </View>
            </View>
        </ScrollView>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
    position: "relative",
  },
  topImageContainer: {},
  topImage: {
    width: "100%",
    height: "15%",
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
  Welcome: {
    textAlign: "center",
    fontSize: Math.min(30, Dimensions.get('window').width * 0.07),
    color: "#262626",
    marginBottom: "3%",
    fontWeight: "400",
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').height * 0.2,
    resizeMode: 'contain',
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
    marginLeft: 15,
    marginRight: 5,
  },
  textInput: {
    flex: 1, 
  },

    createButtonContainer: {
        marginTop: "5%",
        alignSelf: 'center',
        width: '40%',
        minWidth: 120,
        maxWidth: 200,
    },
    signIn:{
        color: "#262626",
        fontSize: 25,
        fontWeight: "bold",
    },
    linearGradient: {
        width: 56,
        height: 34,
        borderRadius: 17,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
    },
    footerText: {
        textAlign: "center",
        color: "#262626",
        fontSize: Math.min(18, Dimensions.get('window').width * 0.045),
        marginTop: "5%",
    },

    footerContainer: {
        marginTop: 20,
    },
socialMediaContainer: {
    display:"flex",
    flexDirection: "row",
    justifyContent: "center",
},
socialMediaIcon: {
    backgroundColor: "#FFFFFF",
    elevation: 10,
    margin: 10,
    padding: 10,
    borderRadius: 50,
},
createButton: {
    width: '60%',
},
createButtonGradient: {
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
},
createButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
},

});

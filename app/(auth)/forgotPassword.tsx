import { Image, StyleSheet, TextInput, Text, View, ImageBackground, TouchableOpacity, Animated, Dimensions } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { useNavigation } from "expo-router";
import { useFocusEffect } from '@react-navigation/native';
import MainButton from "@/constants/MainButton";
import { config } from "@/config/config";


const { width, height } = Dimensions.get('window');

const ForgotPasswordScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = React.useState("");

    // Animation values
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const slideTopAnim = React.useRef(new Animated.Value(-100)).current;
    const slideBottomAnim = React.useRef(new Animated.Value(100)).current;
    const scaleAnim = React.useRef(new Animated.Value(0.3)).current;

    const startAnimations = () => {
        // Reset animations
        fadeAnim.setValue(100);
        slideTopAnim.setValue(-100);
        slideBottomAnim.setValue(100);
        scaleAnim.setValue(0.3);

        // Start animations
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideTopAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideBottomAnim, {
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

            <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
            <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/Logo/Mob-Logo-removebg-preview.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Forgot Password</Text>
                </View>
                <Text style={styles.subtitle}>Enter your email to reset password</Text>

                <View style={styles.inputContainer}>
                    <AntDesign name="mail" size={24} color="#9A9A9A" style={styles.inputIcon} />
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.resetButton}>
                <MainButton 
          title="Reset Password"
          onPress={() => {}}
          backgroundColor="#8ED1FC"
                />       
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5",
        flex: 1,
        position: "relative",
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: "5%",
        marginBottom: "30%",
    },
    topImageContainer: {
        alignItems: 'center',
    },
    topImage: {
        width: "100%",
        height: "15%",
        minHeight: 100,
        maxHeight: 150,
    },
    logoContainer: {
        alignItems: 'center',
      },
      logo: {
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').height * 0.2,
        resizeMode: 'contain',
      },
    titleContainer: {
        marginBottom: height * 0.02,
    },
    title: {
        textAlign: "center",
        fontSize: Math.min(32, Dimensions.get('window').width * 0.08),
        marginBottom: Dimensions.get('window').height * 0.01,
        fontWeight: "500",
        color: "#262626",
        paddingHorizontal: "5%",
    },
    subtitle: {
        textAlign: "center",
        fontSize: Math.min(18, Dimensions.get('window').width * 0.045),
        color: "#262626",
        marginBottom: "1%",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: width * 0.05,
        marginVertical: height * 0.01,
        borderRadius: 15,
        backgroundColor: "#FFFFFF",
        elevation: 10,
        height: Math.max(50, height * 0.06), // Minimum height of 50
        paddingHorizontal: width * 0.03,
    },
    inputIcon: {
        marginRight: width * 0.02,
        fontSize: Math.min(24, width * 0.06),
        color: "#9A9A9A",
    },
    textInput: {
        flex: 1,
        fontSize: Math.min(16, width * 0.04),
    },
    resetButton: {
        marginTop: "5%",
        alignSelf: 'center',
        width: '40%',
        minWidth: 120,
        maxWidth: 200,
    },
});

export default ForgotPasswordScreen;
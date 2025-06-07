import { Alert } from "react-native";

export const validateSignup = (name: string, phone: string, email: string, password: string) => {
    if(!name || !phone || !email || !password) {
        Alert.alert('error', 'please fill all the fields');
        return false;
    }

    if(name.length < 3) {
        Alert.alert('error', 'name must be at least 3 characters');
        return false;
    }

    if(phone.length !== 11) {
        Alert.alert('error', 'phone must be 11 digits');
        return false;
    }

    if(!email.includes('@')) {
        Alert.alert('error', 'email must be a valid email');
        return false;
    }

    if(password.length < 6) {
        Alert.alert('error', 'password must be at least 6 characters');
        return false;
    }

    return true;
}

export default validateSignup;
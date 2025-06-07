import { Alert } from "react-native";

export const validateLogin = (identifier: string, password: string) => {
    if(!identifier || !password) {
        Alert.alert('error', 'please fill all the fields');
        return false;
    }

    if(identifier.length < 6) {
        Alert.alert('error', 'identifier must be at least 6 characters');
        return false;
    }

    if(password.length < 6) {
        Alert.alert('error', 'password must be at least 6 characters');
        return false;
    }

    return true;
}

export default validateLogin; 
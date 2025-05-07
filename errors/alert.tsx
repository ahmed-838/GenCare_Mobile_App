import { Alert } from "react-native";

export const alert = (title: string, message: string) => {
    Alert.alert(title, message);
}

export default alert;
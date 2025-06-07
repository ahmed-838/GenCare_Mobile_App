import { TextInput, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputFieldProps {
  icon: any;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: any;
  autoCapitalize?: any;
  darkMode?: boolean;
}

export function InputField({ 
  icon, 
  darkMode = false,
  ...props 
}: InputFieldProps) {
  return (
    <View style={[
      styles.inputContainer,
      { 
        backgroundColor: darkMode ? '#333' : '#fff',
        borderColor: darkMode ? '#666' : '#ddd'
      }
    ]}>
      <Ionicons 
        name={icon} 
        size={24} 
        color={darkMode ? '#fff' : '#666'} 
        style={styles.icon} 
      />
      <TextInput 
        {...props}
        style={[
          styles.input,
          { color: darkMode ? '#fff' : '#000' }
        ]}
        placeholderTextColor={darkMode ? '#999' : '#666'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    padding: 15,
    textAlign: 'right',
    fontFamily: 'Cairo',
  },
  icon: {
    padding: 10,
  },
}); 
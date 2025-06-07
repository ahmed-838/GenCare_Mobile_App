// secureStoreTest.js
import * as SecureStore from 'expo-secure-store';

// Function to test saving a value
export const saveValue = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log(`Value saved for key: ${key}`);
    return true;
  } catch (error) {
    console.error(`Error saving value for key ${key}:`, error);
    return false;
  }
};

// Function to test retrieving a value
export const getValue = async (key) => {
  try {
    const result = await SecureStore.getItemAsync(key);
    console.log(`Retrieved value for key ${key}:`, result);
    return result;
  } catch (error) {
    console.error(`Error retrieving value for key ${key}:`, error);
    return null;
  }
}; 
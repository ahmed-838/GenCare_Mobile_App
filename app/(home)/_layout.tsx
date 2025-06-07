import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack 
      screenOptions={{ 
        headerShown: false,
        contentStyle: {
          backgroundColor: '#fff', // تعيين لون خلفية موحد
        },
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen name="(home-components)" />
    </Stack>
  );
} 
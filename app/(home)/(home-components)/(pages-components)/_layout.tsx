import { Stack } from 'expo-router';

export default function PagesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(profile-pages-components)" />
      <Stack.Screen name="BabyNames" />
      <Stack.Screen name="ai-page-components" />
      <Stack.Screen name="ai-splash-page" />
      <Stack.Screen name="diseases-splash-page" />
      <Stack.Screen name="pregnancyPage" />
    </Stack>
  );
} 
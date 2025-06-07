import React from 'react';
import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileSplash"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="components/MainProfile"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="components/GuestWelcome"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
} 
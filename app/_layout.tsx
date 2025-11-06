import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { FavoritesProvider } from '../contexts/FavoritesContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <FavoritesProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="animated-welcome" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="location/[id]" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </FavoritesProvider>
  );
}

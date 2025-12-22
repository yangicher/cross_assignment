import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';

import AuthStackNavigator from './AuthStackNavigator';
import AppRootStackNavigator from './AppRootStackNavigator';

import { useAuth } from '../state/AuthContext';
import { useTheme } from '../state/ThemeContext';

export default function RootNavigator() {
    const { isLoggedIn, role } = useAuth();
    const { colors, isDark } = useTheme();

    // Визначаємо базу: стандартна тема або темна
    const BaseTheme = isDark ? DarkTheme : DefaultTheme;

    const navigationTheme: Theme = {
        ...BaseTheme, // Цей рядок автоматично підтягує стандартні шрифти системи
        dark: isDark,
        colors: {
            ...BaseTheme.colors,
            primary: colors.primary,
            background: colors.background,
            card: colors.card,
            text: colors.text,
            border: colors.border,
            notification: colors.danger,
        },
    };

    return (
        <NavigationContainer theme={navigationTheme}>
            {!isLoggedIn && <AuthStackNavigator />}
            {isLoggedIn && role && <AppRootStackNavigator />}
        </NavigationContainer>
    );
}
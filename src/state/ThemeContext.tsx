import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const lightTheme = {
    background: '#ffffff',
    text: '#333333',
    subText: '#666666',
    card: '#f9f9f9',
    border: '#e0e0e0',
    primary: '#0077b5', // LinkedIn Blue
    danger: '#ff3b30',
};

export const darkTheme = {
    background: '#121212',
    text: '#ffffff',
    subText: '#aaaaaa',
    card: '#1e1e1e',
    border: '#333333',
    primary: '#4db5f6', // Lighter blue for dark mode
    danger: '#ff453a',
};

export type ThemeColors = typeof lightTheme;

interface ThemeContextType {
    isDark: boolean;
    colors: ThemeColors;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const systemScheme = useColorScheme();
    const [isDark, setIsDark] = useState<boolean>(systemScheme === 'dark');

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem('user_theme');
                if (savedTheme) {
                    setIsDark(savedTheme === 'dark');
                }
            } catch (error) {
                console.log('Error loading theme:', error);
            }
        };
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newStatus = !isDark;
        setIsDark(newStatus);
        try {
            await AsyncStorage.setItem('user_theme', newStatus ? 'dark' : 'light');
        } catch (error) {
            console.log('Error saving theme:', error);
        }
    };

    const colors = isDark ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ isDark, colors, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
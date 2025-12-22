import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppTopBar from '../components/AppTopBar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MentorHomeScreen from '../screens/mentor/MentorHomeScreen';
import MentorScheduleScreen from '../screens/mentor/MentorScheduleScreen';
import MessagesScreen from '../screens/common/MessagesScreen';
import SettingsScreen from '../screens/common/SettingsScreen';
import { useTheme } from '../state/ThemeContext';

const Tab = createBottomTabNavigator();

export default function MentorTabNavigator() {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={{
                header: (props) => <AppTopBar {...props} />,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.subText,
                tabBarStyle: {
                    backgroundColor: colors.background,
                    borderTopColor: colors.border,
                    height: 64 + insets.bottom,
                    paddingBottom: 8 + insets.bottom,
                    paddingTop: 8,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={MentorHomeScreen}
                options={{
                    tabBarLabel: 'Головна',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'home' : 'home-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Schedule"
                component={MentorScheduleScreen}
                options={{
                    tabBarLabel: 'Розклад',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'calendar' : 'calendar-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Messages"
                component={MessagesScreen}
                options={{
                    tabBarLabel: 'Повідомлення',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'chatbubble' : 'chatbubble-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'Налаштування',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'settings' : 'settings-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
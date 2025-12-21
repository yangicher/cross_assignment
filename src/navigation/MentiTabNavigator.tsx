import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppTopBar from '../components/AppTopBar';

import MentiHomeScreen from '../screens/menti/MentiHomeScreen';
import MentiCalendarScreen from '../screens/menti/MentiCalendarScreen';
import MessagesScreen from '../screens/common/MessagesScreen';
import ProfileScreen from '../screens/common/ProfileScreen';
import SettingsScreen from '../screens/menti/SettingsScreen';
import { Ionicons } from '@expo/vector-icons';
import MentorsListTabScreen from "../screens/menti/MentorsListTabScreen.tsx";

const Tab = createBottomTabNavigator();

export default function MentiTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                header: (props) => <AppTopBar {...props} />,
                tabBarActiveTintColor: '#7B61FF',
                tabBarInactiveTintColor: '#9CA3AF',
                tabBarStyle: {
                    height: 64,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={MentiHomeScreen}
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
                name="Calendar"
                component={MentiCalendarScreen}
                options={{
                    tabBarLabel: 'Календар',
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
                    tabBarLabel: 'Чати',
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
                name="Mentors"
                component={MentorsListTabScreen}
                options={{
                    tabBarLabel: 'Ментори',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'person' : 'person-outline'}
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

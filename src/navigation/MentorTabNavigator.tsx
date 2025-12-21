import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppTopBar from '../components/AppTopBar';
import { Ionicons } from '@expo/vector-icons';

import MentorHomeScreen from '../screens/mentor/MentorHomeScreen';
import MentorScheduleScreen from '../screens/mentor/MentorScheduleScreen';
import MessagesScreen from '../screens/common/MessagesScreen';
import ProfileScreen from '../screens/common/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MentorTabNavigator() {
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
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Профіль',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'person' : 'person-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
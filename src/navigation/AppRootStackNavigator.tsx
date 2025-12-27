import React from 'react';
import MeetingScreen from '../screens/common/MeetingScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppDrawerNavigator from './AppDrawerNavigator';
import NotificationSettingsScreen from '../screens/common/NotificationSettingsScreen';

import BookingScreen from '../screens/menti/BookingScreen';

export type AppRootStackParamList = {
    AppDrawer: undefined;
    Meeting: undefined;
    Booking: undefined;
    NotificationSettingsModal: undefined;
};

const Stack = createNativeStackNavigator<AppRootStackParamList>();

export default function AppRootStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AppDrawer" component={AppDrawerNavigator} />
            <Stack.Screen
                name="Booking"
                component={BookingScreen}
                options={{
                    presentation: 'modal',
                    contentStyle: { backgroundColor: 'transparent' },
                    headerShown: false
                }}
            />
            <Stack.Screen name="Meeting" component={MeetingScreen} options={{headerShown: false}} />
            <Stack.Screen
                name="NotificationSettingsModal"
                component={NotificationSettingsScreen}
                options={{
                    presentation: 'transparentModal',
                    animation: 'fade',
                    headerShown: false,
                    contentStyle: { backgroundColor: 'transparent' },
                }}
            />
        </Stack.Navigator>
    );
}
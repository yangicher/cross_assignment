import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/auth/LoginScreen';
import StartScreen from '../screens/StartScreen';
import SelectRoleScreen from '../screens/SelectRoleScreen';
import MentorFormScreen from '../screens/MentorFormScreen';
import MentiFormScreen from '../screens/MentiFormScreen';

export type AuthStackParamList = {
    Start: undefined;
    Login: undefined;
    SelectRole: undefined;
    MentorForm: undefined;
    MentiForm: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SelectRole" component={SelectRoleScreen} />
            <Stack.Screen name="MentorForm" component={MentorFormScreen} />
            <Stack.Screen name="MentiForm" component={MentiFormScreen} />
        </Stack.Navigator>
    );
}

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthStackNavigator from './AuthStackNavigator';
import AppRootStackNavigator from './AppRootStackNavigator';

import { useAuth } from '../state/AuthContext';

export default function RootNavigator() {
    const { isLoggedIn, role } = useAuth();
    console.log(isLoggedIn, role);
    return (
        <NavigationContainer>
            {!isLoggedIn && <AuthStackNavigator />}
            {isLoggedIn && role && <AppRootStackNavigator />}
        </NavigationContainer>
    );
}
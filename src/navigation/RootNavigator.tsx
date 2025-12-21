import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthStackNavigator from './AuthStackNavigator';
import AppDrawerNavigator from './AppDrawerNavigator';

import { useAuth } from '../state/AuthContext';

export default function RootNavigator() {
    const { isLoggedIn, role } = useAuth();

    return (
        <NavigationContainer>
            {!isLoggedIn && <AuthStackNavigator />}
            {isLoggedIn && role && <AppDrawerNavigator role={role} />}
        </NavigationContainer>
    );
}

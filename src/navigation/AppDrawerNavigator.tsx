import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MentorTabNavigator from './MentorTabNavigator';
import MentiTabNavigator from './MentiTabNavigator';
import {useAuth} from "@/src/state/AuthContext";

export type AppDrawerParamList = {
    MainTabs: undefined;
};

const Drawer = createDrawerNavigator<AppDrawerParamList>();

export default function AppDrawerNavigator() {
    const { role } = useAuth(); 
    console.log('AppRootStackNavigator role:', role);
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                //gestureEnabled: true,
                swipeEdgeWidth: 32,
            }}
        >
            <Drawer.Screen
                name="MainTabs"
                component={role === 'MENTOR' ? MentorTabNavigator : MentiTabNavigator}
            />
        </Drawer.Navigator>
    );
}
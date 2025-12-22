import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Mentor } from '../models/Mentor';

import MentorDetailsScreen from '../screens/MentorDetailsScreen';
import MentorsListTabScreen from "../screens/menti/MentorsListTabScreen.tsx";
import { useTheme } from '../state/ThemeContext';

export type MentorsStackParamList = {
    MentorsList: undefined;
    MentorDetails: { mentor: Mentor };
};

const Stack = createNativeStackNavigator<MentorsStackParamList>();

export default function MentorsNavigator() {
    const { colors } = useTheme();
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: colors.background },
                headerTintColor: colors.text,
                headerTitleStyle: { color: colors.text },
                contentStyle: { backgroundColor: colors.background },
            }}
        >
            <Stack.Screen
                name="MentorsList"
                component={MentorsListTabScreen}
                options={{ title: 'Список менторів', headerBackTitle: 'Назад' }}
            />
            <Stack.Screen
                name="MentorDetails"
                component={MentorDetailsScreen}
                options={{ title: 'Профіль' }}
            />
        </Stack.Navigator>
    );
}
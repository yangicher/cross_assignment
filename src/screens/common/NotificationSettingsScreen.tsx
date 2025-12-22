import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../state/ThemeContext';

export default function NotificationSettingsScreen() {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>Notification settings</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, justifyContent: 'center' },
    title: { fontSize: 18, fontWeight: '600' },
});
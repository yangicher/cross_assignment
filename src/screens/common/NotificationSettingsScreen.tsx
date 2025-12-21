import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationSettingsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notification settings</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, justifyContent: 'center' },
    title: { fontSize: 18, fontWeight: '600' },
});
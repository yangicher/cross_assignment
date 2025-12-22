import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../state/ThemeContext';

export default function MentiCalendarScreen() {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.content}>
                <Text style={{ color: colors.text }}>Calendar</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: {
        flex: 1,
        padding: 16,
    },
});
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../state/ThemeContext';

export default function MentiHomeScreen() {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={{ color: colors.text }}>Menti Home</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
});
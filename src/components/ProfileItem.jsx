import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../state/ThemeContext';

export default function ProfileItem({ label, value }) {
    const { colors } = useTheme();

    return (
        <View style={[styles.row, { borderBottomColor: colors.border }]}>
            <Text style={[styles.label, { color: colors.subText }]}>{label}</Text>
            <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
    },
    label: {
        fontSize: 12,
        color: '#8E8E93',
        marginBottom: 4,
    },
    value: {
        fontSize: 15,
        color: '#111',
    },
});
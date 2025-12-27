import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function InputField({
                                       label,
                                       placeholder,
                                       value,
                                       onChangeText,
                                   }) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                autoCapitalize="none"
                placeholderTextColor="#9A9AA0"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 18,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 6,
        color: '#111',
    },
    input: {
        backgroundColor: '#F2F2F7',
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: '#111',
    },
});

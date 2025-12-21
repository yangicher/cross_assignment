import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MentiCalendarScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text>Calendar</Text>
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

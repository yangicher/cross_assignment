import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MentorHomeScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text>Mentor Home</Text>
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

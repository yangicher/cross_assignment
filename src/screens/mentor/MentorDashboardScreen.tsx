import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../state/AuthContext';

const MentorDashboardScreen = ({ navigation }: any) => {
    const { logout, userInfo } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Привіт, {userInfo?.name}!</Text>
            <Text style={styles.subtitle}>Це кабінет ментора.</Text>

            <View style={styles.card}>
                <Button
                    title="✏️ Заповнити/Редагувати анкету"
                    onPress={() => navigation.navigate('Settings')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold' },
    subtitle: { fontSize: 16, color: 'gray', marginBottom: 20 },
    card: { width: '100%', marginBottom: 10 }
});

export default MentorDashboardScreen;
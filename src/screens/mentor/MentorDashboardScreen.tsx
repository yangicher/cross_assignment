import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert, TouchableOpacity, Linking } from 'react-native';
import { useAuth } from '../../state/AuthContext';
import client from '../../api/client';
import { useFocusEffect } from '@react-navigation/native';

const MentorDashboardScreen = ({ navigation }: any) => {
    const { logout, userInfo } = useAuth();
    const [sessions, setSessions] = useState([]);

    const fetchSessions = async () => {
        try {
            const res = await client.get('/sessions');
            setSessions(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchSessions();
        }, [])
    );

    const confirmSession = async (sessionId: number) => {
        try {
            await client.patch(`/sessions/${sessionId}/status`, { status: 'CONFIRMED' });
            Alert.alert('Готово', 'Урок підтверджено, посилання згенеровано!');
            fetchSessions(); // Оновити список
        } catch (e) {
            Alert.alert('Помилка', 'Не вдалося підтвердити');
        }
    };

    const openVideo = (link: string) => {
        navigation.navigate('Meeting', { link });
    };

    const renderSession = ({ item }: any) => (
        <View style={styles.card}>
            <Text style={styles.sessionTitle}>
                Студент: {item.mentee.name || item.mentee.email}
            </Text>
            <Text>📅 {new Date(item.startTime).toLocaleString()}</Text>
            <Text style={{ fontWeight: 'bold', color: item.status === 'CONFIRMED' ? 'green' : 'orange' }}>
                Статус: {item.status}
            </Text>

            {item.status === 'REQUESTED' && (
                <Button title="✅ Підтвердити" onPress={() => confirmSession(item.id)} />
            )}

            {item.status === 'CONFIRMED' && item.videoLink && (
                <TouchableOpacity style={styles.videoBtn} onPress={() => openVideo(item.videoLink)}>
                    <Text style={{color: 'white'}}>📹 Увійти в дзвінок</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Привіт, {userInfo?.name}!</Text>

            <View style={{ marginBottom: 20 }}>
                <Button title="✏️ Редагувати профіль" onPress={() => navigation.navigate('Settings')} />
            </View>

            <Text style={styles.subHeader}>Мої уроки:</Text>
            <FlatList
                data={sessions}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={renderSession}
                ListEmptyComponent={<Text>Уроків поки немає</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    subHeader: { fontSize: 18, fontWeight: '600', marginVertical: 10 },
    card: { backgroundColor: 'white', padding: 15, marginBottom: 10, borderRadius: 8, elevation: 2 },
    sessionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
    videoBtn: { backgroundColor: '#4CAF50', padding: 10, marginTop: 10, borderRadius: 5, alignItems: 'center' }
});

export default MentorDashboardScreen;
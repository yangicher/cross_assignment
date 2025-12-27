import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import client from '../../api/client';
import { useAuth } from '../../state/AuthContext';

interface UserInfo {
    name: string;
    email: string;
}

interface Session {
    id: number;
    startTime: string; // ISO date
    status: 'REQUESTED' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
    meetingLink?: string;
    mentor?: UserInfo; // Приходить, якщо я MENTEE
    mentee?: UserInfo; // Приходить, якщо я MENTOR
}

const ScheduleScreen = ({ navigation }: any) => {
    const { role } = useAuth(); // Отримуємо роль: 'MENTOR' | 'MENTEE'
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSessions = async () => {
        try {
            setLoading(true);
            const response = await client.get('/sessions');
            setSessions(response.data);
        } catch (e) {
            console.error(e);
            Alert.alert('Помилка', 'Не вдалося завантажити розклад');
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchSessions();
        }, [])
    );

    // --- Рендер картки для МЕНТІ (Студента) ---
    const renderMenteeItem = (item: Session) => {
        const dateObj = new Date(item.startTime);
        const isConfirmed = item.status === 'CONFIRMED';

        // Генеруємо або беремо лінк
        const link = item.meetingLink || `https://meet.jit.si/session-${item.id}`;

        return (
            <View style={styles.card}>
                <View style={styles.headerRow}>
                    <View style={styles.userInfo}>
                        <Ionicons name="school" size={24} color="#007AFF" style={{ marginRight: 10 }} />
                        <View>
                            <Text style={styles.roleLabel}>МЕНТОР</Text>
                            <Text style={styles.nameText}>{item.mentor?.name || 'Невідомий'}</Text>
                        </View>
                    </View>
                    <StatusBadge status={item.status} />
                </View>

                <View style={styles.divider} />

                <View style={styles.dateRow}>
                    <Ionicons name="calendar-outline" size={18} color="gray" />
                    <Text style={styles.dateText}>
                        {dateObj.toLocaleDateString()} о {dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </Text>
                </View>

                {isConfirmed && (
                    <TouchableOpacity
                        style={styles.joinButton}
                        onPress={() => navigation.navigate('Meeting', { link, sessionId: item.id })}
                    >
                        <Ionicons name="videocam" size={20} color="white" style={{ marginRight: 8 }} />
                        <Text style={styles.joinButtonText}>Приєднатись до уроку</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    // --- Рендер картки для МЕНТОРА ---
    const renderMentorItem = (item: Session) => {
        const dateObj = new Date(item.startTime);
        const link = item.meetingLink || `https://meet.jit.si/session-${item.id}`;

        return (
            <View style={[styles.card, { borderLeftColor: '#4CAF50', borderLeftWidth: 4 }]}>
                <View style={styles.headerRow}>
                    <View style={styles.userInfo}>
                        <Ionicons name="person" size={24} color="#4CAF50" style={{ marginRight: 10 }} />
                        <View>
                            <Text style={styles.roleLabel}>СТУДЕНТ</Text>
                            <Text style={styles.nameText}>{item.mentee?.name || 'Анонім'}</Text>
                        </View>
                    </View>
                    <StatusBadge status={item.status} />
                </View>

                <View style={styles.divider} />

                <View style={styles.dateRow}>
                    <Ionicons name="time-outline" size={18} color="gray" />
                    <Text style={styles.dateText}>
                        {dateObj.toLocaleDateString()} — {dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </Text>
                </View>

                {/* Дії ментора */}
                <View style={styles.actionsRow}>
                    {item.status === 'CONFIRMED' ? (
                        <TouchableOpacity
                            style={[styles.joinButton, { flex: 1 }]}
                            onPress={() => navigation.navigate('Meeting', { link, sessionId: item.id })}
                        >
                            <Text style={styles.joinButtonText}>Почати урок</Text>
                        </TouchableOpacity>
                    ) : (
                        <Text style={{ color: 'gray', fontStyle: 'italic' }}>Очікує підтвердження...</Text>
                        // Тут можна додати кнопки "Підтвердити" / "Відхилити"
                    )}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Мої заняття</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={sessions}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => role === 'MENTOR' ? renderMentorItem(item) : renderMenteeItem(item)}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Ionicons name="calendar-clear-outline" size={64} color="#ccc" />
                            <Text style={styles.emptyText}>У вас поки немає запланованих уроків</Text>
                        </View>
                    }
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
        </View>
    );
};

// Допоміжний компонент статусу
const StatusBadge = ({ status }: { status: string }) => {
    let color = '#757575';
    let text = 'Очікування';

    switch (status) {
        case 'CONFIRMED': color = '#4CAF50'; text = 'Підтверджено'; break;
        case 'CANCELLED': color = '#F44336'; text = 'Скасовано'; break;
        case 'COMPLETED': color = '#2196F3'; text = 'Завершено'; break;
    }

    return (
        <View style={[styles.badge, { backgroundColor: color }]}>
            <Text style={styles.badgeText}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
    pageTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#333' },

    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    userInfo: { flexDirection: 'row', alignItems: 'center' },
    roleLabel: { fontSize: 10, color: 'gray', textTransform: 'uppercase', fontWeight: 'bold' },
    nameText: { fontSize: 16, fontWeight: 'bold', color: '#333' },

    divider: { height: 1, backgroundColor: '#eee', marginVertical: 12 },

    dateRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    dateText: { marginLeft: 8, fontSize: 16, color: '#555' },

    actionsRow: { flexDirection: 'row', marginTop: 5 },
    joinButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    joinButtonText: { color: 'white', fontWeight: 'bold', marginLeft: 5 },

    badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
    badgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },

    emptyContainer: { alignItems: 'center', marginTop: 60 },
    emptyText: { color: 'gray', marginTop: 10, fontSize: 16 },
});

export default ScheduleScreen;
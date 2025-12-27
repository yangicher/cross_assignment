import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import client from '../../api/client';
import { useAuth } from '../../state/AuthContext';
import { useTheme } from '../../state/ThemeContext';

interface UserInfo {
    name: string;
    email: string;
}

interface Session {
    id: number;
    startTime: string;
    status: 'REQUESTED' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'PENDING';
    meetingLink?: string;
    mentor?: UserInfo;
    mentee?: UserInfo;
}

const ScheduleScreen = ({ navigation }: any) => {
    const { role } = useAuth();
    const { colors } = useTheme();
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

    const confirmSession = async (sessionId: number) => {
        try {
            await client.patch(`/sessions/${sessionId}/status`, { status: 'CONFIRMED' });
            Alert.alert('Успіх', 'Урок підтверджено!');
            fetchSessions();
        } catch (error) {
            console.log(error);
            Alert.alert('Помилка', 'Не вдалося підтвердити урок');
        }
    };

    const rejectSession = (sessionId: number) => {
        Alert.alert(
            "Відхилити запит",
            "Ви впевнені, що хочете відхилити цей урок? Студент отримає сповіщення.",
            [
                {text: "Скасувати", style: "cancel"},
                {
                    text: "Відхилити",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await client.patch(`/sessions/${sessionId}/status`, {status: 'CANCELLED'});
                            fetchSessions();
                        } catch (error) {
                            console.log(error);
                            Alert.alert('Помилка', 'Не вдалося відхилити урок');
                        }
                    }
                }
            ]
        );
    }

    const renderMenteeItem = (item: Session) => {
        const dateObj = new Date(item.startTime);
        const isConfirmed = item.status === 'CONFIRMED';
        const link = item.meetingLink || `https://meet.jit.si/session-${item.id}`;

        return (
            <View style={[styles.card, { backgroundColor: colors.card }]}>
                <View style={styles.headerRow}>
                    <View style={styles.userInfo}>
                        <Ionicons name="school" size={24} color={colors.primary} style={{ marginRight: 10 }} />
                        <View>
                            <Text style={styles.roleLabel}>МЕНТОР</Text>
                            <Text style={[styles.nameText, { color: colors.text }]}>
                                {item.mentor?.name || 'Невідомий'}
                            </Text>
                        </View>
                    </View>
                    <StatusBadge status={item.status} />
                </View>

                <View style={[styles.divider, { backgroundColor: colors.border }]} />

                <View style={styles.dateRow}>
                    <Ionicons name="calendar-outline" size={18} color={colors.subText} />
                    <Text style={[styles.dateText, { color: colors.text }]}>
                        {dateObj.toLocaleDateString()} о {dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                </View>

                {isConfirmed ? (
                    <TouchableOpacity
                        style={[styles.joinButton, { backgroundColor: colors.primary }]}
                        onPress={() => navigation.navigate('Meeting', { link, sessionId: item.id })}
                    >
                        <Ionicons name="videocam" size={20} color="white" style={{ marginRight: 8 }} />
                        <Text style={styles.joinButtonText}>Приєднатись до уроку</Text>
                    </TouchableOpacity>
                ) : (
                    <Text style={{ color: colors.subText, fontStyle: 'italic', marginTop: 5 }}>
                        Очікуйте підтвердження ментором
                    </Text>
                )}
            </View>
        );
    };

    const renderMentorItem = (item: Session) => {
        const dateObj = new Date(item.startTime);
        const link = item.meetingLink || `https://meet.jit.si/session-${item.id}`;

        const needsConfirmation = item.status === 'REQUESTED' || item.status === 'PENDING';

        return (
            <View style={[
                styles.card,
                { backgroundColor: colors.card, borderLeftColor: '#4CAF50', borderLeftWidth: 4 }
            ]}>
                <View style={styles.headerRow}>
                    <View style={styles.userInfo}>
                        <Ionicons name="person" size={24} color="#4CAF50" style={{ marginRight: 10 }} />
                        <View>
                            <Text style={styles.roleLabel}>СТУДЕНТ</Text>
                            <Text style={[styles.nameText, { color: colors.text }]}>
                                {item.mentee?.name || 'Анонім'}
                            </Text>
                        </View>
                    </View>
                    <StatusBadge status={item.status} />
                </View>

                <View style={[styles.divider, { backgroundColor: colors.border }]} />

                <View style={styles.dateRow}>
                    <Ionicons name="time-outline" size={18} color={colors.subText} />
                    <Text style={[styles.dateText, { color: colors.text }]}>
                        {dateObj.toLocaleDateString()} — {dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                </View>

                <View style={styles.actionsRow}>
                    {item.status === 'CONFIRMED' ? (
                        <TouchableOpacity
                            style={[styles.joinButton, { flex: 1, backgroundColor: '#4CAF50' }]}
                            onPress={() => navigation.navigate('Meeting', { link, sessionId: item.id })}
                        >
                            <Ionicons name="videocam" size={20} color="white" style={{ marginRight: 8 }} />
                            <Text style={styles.joinButtonText}>Почати урок</Text>
                        </TouchableOpacity>
                    ) : needsConfirmation ? (
                        <View style={{ flexDirection: 'row', gap: 10, flex: 1 }}>
                            <TouchableOpacity
                                style={[styles.joinButton, { flex: 1, backgroundColor: '#FF5252' }]} 
                                onPress={() => rejectSession(item.id)}
                            >
                                <Ionicons name="close-circle" size={20} color="white" style={{ marginRight: 5 }} />
                                <Text style={styles.joinButtonText}>Відхилити</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.joinButton, { flex: 1, backgroundColor: '#FF9800' }]} 
                                onPress={() => confirmSession(item.id)}
                            >
                                <Ionicons name="checkmark-circle" size={20} color="white" style={{ marginRight: 5 }} />
                                <Text style={styles.joinButtonText}>Підтвердити</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Text style={{ color: colors.subText }}>Статус: {item.status}</Text>
                    )}
                </View>
            </View>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.pageTitle, { color: colors.text }]}>Мої заняття</Text>

            {loading ? (
                <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={sessions}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => role === 'MENTOR' ? renderMentorItem(item) : renderMenteeItem(item)}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Ionicons name="calendar-clear-outline" size={64} color={colors.subText} />
                            <Text style={[styles.emptyText, { color: colors.subText }]}>
                                У вас поки немає запланованих уроків
                            </Text>
                        </View>
                    }
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
        </View>
    );
};

const StatusBadge = ({ status }: { status: string }) => {
    let color = '#757575';
    let text = 'Очікування';

    switch (status) {
        case 'CONFIRMED': color = '#4CAF50'; text = 'Підтверджено'; break;
        case 'CANCELLED': color = '#F44336'; text = 'Скасовано'; break;
        case 'COMPLETED': color = '#2196F3'; text = 'Завершено'; break;
        case 'REQUESTED': color = '#FF9800'; text = 'Новий запит'; break;
        case 'PENDING': color = '#FF9800'; text = 'Очікування'; break;
    }

    return (
        <View style={[styles.badge, { backgroundColor: color }]}>
            <Text style={styles.badgeText}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    pageTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },

    card: {
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
    nameText: { fontSize: 16, fontWeight: 'bold' },

    divider: { height: 1, marginVertical: 12 },

    dateRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    dateText: { marginLeft: 8, fontSize: 16 },

    actionsRow: { flexDirection: 'row', marginTop: 5 },
    joinButton: {
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
    emptyText: { marginTop: 10, fontSize: 16 },
});

export default ScheduleScreen;
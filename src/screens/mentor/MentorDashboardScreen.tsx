import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    Alert,
    RefreshControl
} from 'react-native';
import { useAuth } from '../../state/AuthContext';
import client from '../../api/client';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const MentorDashboardScreen = ({ navigation }: any) => {
    const { userInfo } = useAuth();
    const [mentorStatus, setMentorStatus] = useState<'PENDING' | 'APPROVED' | 'REJECTED' | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchStatus = async () => {
        try {
            // setMentorStatus('APPROVED'); 

            const res = await client.get('/mentors/my-status');
            setMentorStatus(res.data.status);
        } catch (e) {
            console.log('Error fetching status:', e);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            fetchStatus();
        }, [])
    );

    const onRefresh = () => {
        setRefreshing(true);
        fetchStatus();
    };

    if (loading && !refreshing) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    if (mentorStatus === 'REJECTED') {
        return (
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={[styles.scrollContent, styles.center]}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    <View style={styles.statusIconContainer}>
                        <Ionicons name="close-circle" size={100} color="#F44336" />
                    </View>

                    <Text style={styles.titleRed}>Заявку відхилено</Text>

                    <Text style={styles.description}>
                        На жаль, ми не змогли затвердити ваш профіль ментора.
                        Це може бути пов'язано з недостатньою інформацією в описі або невідповідністю вимогам платформи.
                    </Text>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Що робити далі?</Text>
                        <Text style={styles.cardText}>
                            1. Перевірте правильність заповнених даних.{'\n'}
                            2. Додайте більше деталей про ваш досвід.{'\n'}
                            3. Завантажте реальне фото профілю.
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, styles.buttonOutline]}
                        onPress={() => navigation.navigate('Settings')}
                    >
                        <Text style={styles.buttonOutlineText}>Редагувати профіль</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.linkButton} onPress={onRefresh}>
                        <Text style={styles.linkText}>Я виправив дані, перевірити знову</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }

    if (mentorStatus === 'PENDING') {
        return (
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={[styles.scrollContent, styles.center]}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    <Ionicons name="hourglass-outline" size={100} color="#FF9800" />

                    <Text style={styles.titleOrange}>Заявка на розгляді</Text>

                    <Text style={styles.description}>
                        Дякуємо за реєстрацію! Ми вже перевіряємо вашу анкету.
                        Зазвичай це займає до 24 годин. Ви отримаєте сповіщення, як тільки статус зміниться.
                    </Text>

                    <TouchableOpacity style={styles.button} onPress={onRefresh}>
                        <Text style={styles.buttonText}>Оновити статус</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Привіт, {userInfo?.name} 👋</Text>
                        <Text style={styles.subGreeting}>Гарного продуктивного дня!</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                        <Ionicons name="person-circle-outline" size={40} color="#333" />
                    </TouchableOpacity>
                </View>

                <View style={styles.statusCard}>
                    <View style={styles.statusRow}>
                        <Ionicons name="checkmark-circle" size={24} color="white" />
                        <Text style={styles.statusCardTitle}>Акаунт активний</Text>
                    </View>
                    <Text style={styles.statusCardText}>Ви можете приймати нові заявки від студентів.</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>0</Text>
                        <Text style={styles.statLabel}>Проведено уроків</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>5.0</Text>
                        <Text style={styles.statLabel}>Рейтинг</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Швидкі дії</Text>

                <View style={styles.grid}>
                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigation.navigate('Schedule')}
                    >
                        <View style={[styles.iconBg, { backgroundColor: '#e3f2fd' }]}>
                            <Ionicons name="calendar" size={30} color="#2196F3" />
                        </View>
                        <Text style={styles.gridLabel}>Мій розклад</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigation.navigate('Messages')}
                    >
                        <View style={[styles.iconBg, { backgroundColor: '#e8f5e9' }]}>
                            <Ionicons name="chatbubbles" size={30} color="#4CAF50" />
                        </View>
                        <Text style={styles.gridLabel}>Повідомлення</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigation.navigate('Settings')}
                    >
                        <View style={[styles.iconBg, { backgroundColor: '#fff3e0' }]}>
                            <Ionicons name="options" size={30} color="#FF9800" />
                        </View>
                        <Text style={styles.gridLabel}>Налаштування</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => Alert.alert('Інфо', 'Функціонал гаманця в розробці')}
                    >
                        <View style={[styles.iconBg, { backgroundColor: '#f3e5f5' }]}>
                            <Ionicons name="wallet" size={30} color="#9C27B0" />
                        </View>
                        <Text style={styles.gridLabel}>Фінанси</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa' },
    scrollContent: { padding: 20 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

    greeting: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    subGreeting: { fontSize: 16, color: '#666', marginTop: 4 },
    titleRed: { fontSize: 24, fontWeight: 'bold', color: '#F44336', marginVertical: 10 },
    titleOrange: { fontSize: 24, fontWeight: 'bold', color: '#FF9800', marginVertical: 10 },
    description: { fontSize: 16, color: '#555', textAlign: 'center', lineHeight: 24, marginBottom: 30 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 25, marginBottom: 15, color: '#333' },

    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },

    statusCard: {
        backgroundColor: '#4CAF50',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        elevation: 4,
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    statusRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    statusCardTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
    statusCardText: { color: 'rgba(255,255,255,0.9)', fontSize: 14 },

    statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    statBox: {
        flex: 1,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 12,
        marginHorizontal: 5,
        alignItems: 'center',
        elevation: 2
    },
    statNumber: { fontSize: 22, fontWeight: 'bold', color: '#333' },
    statLabel: { fontSize: 12, color: 'gray', marginTop: 5 },

    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    gridItem: {
        width: '48%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 16,
        marginBottom: 15,
        alignItems: 'center',
        elevation: 2
    },
    iconBg: { padding: 15, borderRadius: 50, marginBottom: 10 },
    gridLabel: { fontWeight: '600', color: '#333' },

    statusIconContainer: { marginBottom: 20 },
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        width: '100%',
        marginBottom: 20,
        elevation: 1
    },
    cardTitle: { fontWeight: 'bold', marginBottom: 10, fontSize: 16 },
    cardText: { lineHeight: 22, color: '#444' },

    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center'
    },
    buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    buttonOutline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#007AFF', marginTop: 10 },
    buttonOutlineText: { color: '#007AFF', fontWeight: 'bold', fontSize: 16 },

    linkButton: { marginTop: 20 },
    linkText: { color: '#007AFF', textDecorationLine: 'underline' }
});

export default MentorDashboardScreen;
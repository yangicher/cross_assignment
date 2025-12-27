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
import { useTheme } from '../../state/ThemeContext'; // 1. Імпорт теми

const MentorDashboardScreen = ({ navigation }: any) => {
    const { userInfo } = useAuth();
    const { colors, isDark } = useTheme(); // 2. Отримуємо кольори
    const [mentorStatus, setMentorStatus] = useState<'PENDING' | 'APPROVED' | 'REJECTED' | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchStatus = async () => {
        try {
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
            <View style={[styles.center, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    // --- СТАТУС: ВІДХИЛЕНО ---
    if (mentorStatus === 'REJECTED') {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <ScrollView
                    contentContainerStyle={[styles.scrollContent, styles.center]}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
                >
                    <View style={styles.statusIconContainer}>
                        <Ionicons name="close-circle" size={100} color={colors.danger} />
                    </View>

                    <Text style={[styles.titleRed, { color: colors.danger }]}>Заявку відхилено</Text>

                    <Text style={[styles.description, { color: colors.subText }]}>
                        На жаль, ми не змогли затвердити ваш профіль ментора.
                        Це може бути пов'язано з недостатньою інформацією в описі або невідповідністю вимогам платформи.
                    </Text>

                    <View style={[styles.card, { backgroundColor: colors.card }]}>
                        <Text style={[styles.cardTitle, { color: colors.text }]}>Що робити далі?</Text>
                        <Text style={[styles.cardText, { color: colors.subText }]}>
                            1. Перевірте правильність заповнених даних.{'\n'}
                            2. Додайте більше деталей про ваш досвід.{'\n'}
                            3. Завантажте реальне фото профілю.
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, styles.buttonOutline, { borderColor: colors.primary }]}
                        onPress={() => navigation.navigate('Settings')}
                    >
                        <Text style={[styles.buttonOutlineText, { color: colors.primary }]}>Редагувати профіль</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.linkButton} onPress={onRefresh}>
                        <Text style={[styles.linkText, { color: colors.primary }]}>Я виправив дані, перевірити знову</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }

    // --- СТАТУС: ОЧІКУВАННЯ ---
    if (mentorStatus === 'PENDING') {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <ScrollView
                    contentContainerStyle={[styles.scrollContent, styles.center]}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
                >
                    <Ionicons name="hourglass-outline" size={100} color="#FF9800" />

                    <Text style={styles.titleOrange}>Заявка на розгляді</Text>

                    <Text style={[styles.description, { color: colors.subText }]}>
                        Дякуємо за реєстрацію! Ми вже перевіряємо вашу анкету.
                        Зазвичай це займає до 24 годин. Ви отримаєте сповіщення, як тільки статус зміниться.
                    </Text>

                    <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={onRefresh}>
                        <Text style={styles.buttonText}>Оновити статус</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }

    // --- СТАТУС: АКТИВНИЙ ---
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
            >
                <View style={styles.header}>
                    <View>
                        <Text style={[styles.greeting, { color: colors.text }]}>Привіт, {userInfo?.name} 👋</Text>
                        <Text style={[styles.subGreeting, { color: colors.subText }]}>Гарного продуктивного дня!</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                        <Ionicons name="person-circle-outline" size={40} color={colors.text} />
                    </TouchableOpacity>
                </View>

                {/* Status Card - залишаємо зеленим, бо це статус успіху */}
                <View style={styles.statusCard}>
                    <View style={styles.statusRow}>
                        <Ionicons name="checkmark-circle" size={24} color="white" />
                        <Text style={styles.statusCardTitle}>Акаунт активний</Text>
                    </View>
                    <Text style={styles.statusCardText}>Ви можете приймати нові заявки від студентів.</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={[styles.statBox, { backgroundColor: colors.card }]}>
                        <Text style={[styles.statNumber, { color: colors.text }]}>0</Text>
                        <Text style={[styles.statLabel, { color: colors.subText }]}>Проведено уроків</Text>
                    </View>
                    <View style={[styles.statBox, { backgroundColor: colors.card }]}>
                        <Text style={[styles.statNumber, { color: colors.text }]}>5.0</Text>
                        <Text style={[styles.statLabel, { color: colors.subText }]}>Рейтинг</Text>
                    </View>
                </View>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>Швидкі дії</Text>

                <View style={styles.grid}>
                    <TouchableOpacity
                        style={[styles.gridItem, { backgroundColor: colors.card }]}
                        onPress={() => navigation.navigate('Schedule')}
                    >
                        <View style={[styles.iconBg, { backgroundColor: isDark ? '#1E2A38' : '#e3f2fd' }]}>
                            <Ionicons name="calendar" size={30} color="#2196F3" />
                        </View>
                        <Text style={[styles.gridLabel, { color: colors.text }]}>Мій розклад</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.gridItem, { backgroundColor: colors.card }]}
                        onPress={() => navigation.navigate('Messages')}
                    >
                        <View style={[styles.iconBg, { backgroundColor: isDark ? '#1E382A' : '#e8f5e9' }]}>
                            <Ionicons name="chatbubbles" size={30} color="#4CAF50" />
                        </View>
                        <Text style={[styles.gridLabel, { color: colors.text }]}>Повідомлення</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.gridItem, { backgroundColor: colors.card }]}
                        onPress={() => navigation.navigate('Settings')}
                    >
                        <View style={[styles.iconBg, { backgroundColor: isDark ? '#382E1E' : '#fff3e0' }]}>
                            <Ionicons name="options" size={30} color="#FF9800" />
                        </View>
                        <Text style={[styles.gridLabel, { color: colors.text }]}>Налаштування</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.gridItem, { backgroundColor: colors.card }]}
                        onPress={() => Alert.alert('Інфо', 'Функціонал гаманця в розробці')}
                    >
                        <View style={[styles.iconBg, { backgroundColor: isDark ? '#2D1E38' : '#f3e5f5' }]}>
                            <Ionicons name="wallet" size={30} color="#9C27B0" />
                        </View>
                        <Text style={[styles.gridLabel, { color: colors.text }]}>Фінанси</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { padding: 20 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

    greeting: { fontSize: 24, fontWeight: 'bold' },
    subGreeting: { fontSize: 16, marginTop: 4 },
    titleRed: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
    titleOrange: { fontSize: 24, fontWeight: 'bold', color: '#FF9800', marginVertical: 10 },
    description: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 25, marginBottom: 15 },

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
        padding: 15,
        borderRadius: 12,
        marginHorizontal: 5,
        alignItems: 'center',
        elevation: 2
    },
    statNumber: { fontSize: 22, fontWeight: 'bold' },
    statLabel: { fontSize: 12, marginTop: 5 },

    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    gridItem: {
        width: '48%',
        padding: 20,
        borderRadius: 16,
        marginBottom: 15,
        alignItems: 'center',
        elevation: 2
    },
    iconBg: { padding: 15, borderRadius: 50, marginBottom: 10 },
    gridLabel: { fontWeight: '600' },

    statusIconContainer: { marginBottom: 20 },
    card: {
        padding: 20,
        borderRadius: 12,
        width: '100%',
        marginBottom: 20,
        elevation: 1
    },
    cardTitle: { fontWeight: 'bold', marginBottom: 10, fontSize: 16 },
    cardText: { lineHeight: 22 },

    button: {
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center'
    },
    buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    buttonOutline: { backgroundColor: 'transparent', borderWidth: 1, marginTop: 10 },
    buttonOutlineText: { fontWeight: 'bold', fontSize: 16 },

    linkButton: { marginTop: 20 },
    linkText: { textDecorationLine: 'underline' }
});

export default MentorDashboardScreen;
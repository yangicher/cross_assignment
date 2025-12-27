import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
    Platform,
    TouchableWithoutFeedback
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import client from '../../api/client';
import { useTheme } from '../../state/ThemeContext'; // Імпорт теми

const BookingScreen = ({ route, navigation }: any) => {
    const { mentorId, mentorName } = route.params;
    const { colors, isDark } = useTheme(); // Отримуємо кольори
    const [loading, setLoading] = useState(false);

    // Логіка дати
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 1);
    defaultDate.setHours(10, 0, 0, 0);

    const [date, setDate] = useState(defaultDate);
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState<'date' | 'time'>('date');

    const onChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            setShow(false);
        }
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const showMode = (currentMode: 'date' | 'time') => {
        setShow(true);
        setMode(currentMode);
    };

    const bookSession = async () => {
        setLoading(true);
        try {
            const isoString = date.toISOString();
            await client.post('/sessions', {
                mentorId,
                startTime: isoString
            });

            Alert.alert(
                'Успіх!',
                'Заявку надіслано ментору.',
                [{ text: "OK", onPress: () => navigation.goBack() }]
            );

        } catch (error: any) {
            console.log('Booking Error:', error);
            const message = error.response?.data?.message || 'Цей час недоступний.';
            Alert.alert('Не вдалося забронювати', message);
        } finally {
            setLoading(false);
        }
    };

    const formattedDate = date.toLocaleDateString('uk-UA', {
        day: 'numeric', month: 'long', year: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('uk-UA', {
        hour: '2-digit', minute: '2-digit'
    });

    return (
        // Зовнішній контейнер з напівпрозорим фоном
        <View style={styles.overlay}>

            {/* Клік по фону закриває вікно */}
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <View style={styles.backdrop} />
            </TouchableWithoutFeedback>

            {/* Саме вікно (Bottom Sheet) */}
            <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>

                {/* --- HEADER --- */}
                <View style={[styles.header, { borderBottomColor: colors.border }]}>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Бронювання</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
                        <Ionicons name="close" size={24} color={colors.subText} />
                    </TouchableOpacity>
                </View>

                {/* --- CONTENT --- */}
                <View style={styles.content}>
                    <Text style={[styles.subTitle, { color: colors.text }]}>
                        Ментор: <Text style={{ color: colors.primary }}>{mentorName}</Text>
                    </Text>

                    <Text style={[styles.instructionText, { color: colors.subText }]}>
                        Оберіть дату та час:
                    </Text>

                    {/* Кнопки вибору */}
                    <View style={styles.pickerContainer}>
                        <TouchableOpacity
                            style={[styles.pickerButton, {
                                backgroundColor: isDark ? '#2C2C2C' : '#f0f8ff',
                                borderColor: colors.primary
                            }]}
                            onPress={() => showMode('date')}
                        >
                            <Ionicons name="calendar-outline" size={24} color={colors.primary} />
                            <Text style={[styles.pickerText, { color: colors.text }]}>{formattedDate}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.pickerButton, {
                                backgroundColor: isDark ? '#2C2C2C' : '#f0f8ff',
                                borderColor: colors.primary
                            }]}
                            onPress={() => showMode('time')}
                        >
                            <Ionicons name="time-outline" size={24} color={colors.primary} />
                            <Text style={[styles.pickerText, { color: colors.text }]}>{formattedTime}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* DateTimePicker */}
                    {show && (
                        <View style={{ marginBottom: 15 }}>
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={onChange}
                                minimumDate={new Date()}
                                themeVariant={isDark ? 'dark' : 'light'} // Важливо для iOS 13+
                                style={{ backgroundColor: colors.card }}
                                textColor={colors.text} // Для iOS
                            />
                            {Platform.OS === 'ios' && (
                                <TouchableOpacity
                                    style={[styles.iosConfirmBtn, { backgroundColor: colors.border }]}
                                    onPress={() => setShow(false)}
                                >
                                    <Text style={[styles.iosConfirmText, { color: colors.primary }]}>Готово</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}

                    {loading ? (
                        <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 20 }} />
                    ) : (
                        <TouchableOpacity
                            style={[styles.confirmButton, { backgroundColor: colors.primary }]}
                            onPress={bookSession}
                        >
                            <Text style={styles.confirmButtonText}>Підтвердити</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    // Робимо фон на весь екран прозорим
    overlay: {
        flex: 1,
        justifyContent: 'flex-end', // Притискаємо контент до низу
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    // Прозора підкладка для кліку
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    // Картка знизу
    modalContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 40, // Відступ для iPhone Home Indicator
        width: '100%',
        maxHeight: '80%', // Не більше 80% екрану
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 15,
        borderBottomWidth: 1,
        marginBottom: 20,
    },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    closeBtn: { padding: 5 },

    content: {
        // Прибрали flex: 1, щоб висота залежала від контенту
    },
    subTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10, textAlign: 'center' },
    instructionText: { fontSize: 14, marginBottom: 20, textAlign: 'center' },

    pickerContainer: {
        flexDirection: 'row', // В один рядок, щоб зекономити висоту
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 20,
    },
    pickerButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
    },
    pickerText: {
        fontSize: 16,
        marginLeft: 8,
        fontWeight: '500',
    },

    iosConfirmBtn: {
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        marginTop: 5,
    },
    iosConfirmText: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    confirmButton: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default BookingScreen;
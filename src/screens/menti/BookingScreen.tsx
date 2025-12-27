import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
    Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import client from '../../api/client';

const BookingScreen = ({ route, navigation }: any) => {
    const { mentorId, mentorName } = route.params;
    const [loading, setLoading] = useState(false);

    console.log('Booking: ', mentorId, mentorName, new Date().toISOString());
    
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
            console.log('Відправляємо:', { mentorId, startTime: isoString });

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
            const message = error.response?.data?.message || 'Цей час недоступний. Спробуйте інший.';
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
        <View style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Бронювання</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
                        <Ionicons name="close" size={28} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <Text style={styles.subTitle}>Ментор: {mentorName}</Text>

                    <Text style={styles.instructionText}>
                        Оберіть зручний час для сесії:
                    </Text>

                    <View style={styles.pickerContainer}>
                        <TouchableOpacity
                            style={styles.pickerButton}
                            onPress={() => showMode('date')}
                        >
                            <Ionicons name="calendar-outline" size={24} color="#007AFF" />
                            <Text style={styles.pickerText}>{formattedDate}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.pickerButton}
                            onPress={() => showMode('time')}
                        >
                            <Ionicons name="time-outline" size={24} color="#007AFF" />
                            <Text style={styles.pickerText}>{formattedTime}</Text>
                        </TouchableOpacity>
                    </View>

                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={onChange}
                            minimumDate={new Date()}
                            style={styles.iosPicker}
                        />
                    )}

                    {Platform.OS === 'ios' && show && (
                        <TouchableOpacity
                            style={styles.iosConfirmBtn}
                            onPress={() => setShow(false)}
                        >
                            <Text style={styles.iosConfirmText}>Готово</Text>
                        </TouchableOpacity>
                    )}

                    <View style={{flex: 1}} />

                    {loading ? (
                        <ActivityIndicator size="large" style={{ marginBottom: 20 }} />
                    ) : (
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={bookSession}
                        >
                            <Text style={styles.confirmButtonText}>Підтвердити бронювання</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    container: { flex: 1, paddingHorizontal: 20 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginBottom: 20,
    },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    closeBtn: { padding: 5 },
    content: { flex: 1 },
    subTitle: { fontSize: 20, fontWeight: '600', marginBottom: 10, textAlign: 'center' },
    instructionText: { fontSize: 16, color: 'gray', marginBottom: 20, textAlign: 'center' },

    pickerContainer: {
        gap: 15,
        marginBottom: 20,
    },
    pickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f8ff',
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#007AFF',
    },
    pickerText: {
        fontSize: 18,
        marginLeft: 10,
        color: '#333',
        fontWeight: '500',
    },

    iosPicker: {
        width: '100%',
        backgroundColor: 'white',
    },
    iosConfirmBtn: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 8,
        marginBottom: 10,
    },
    iosConfirmText: {
        color: '#007AFF',
        fontWeight: 'bold',
        fontSize: 16,
    },

    confirmButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 20,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default BookingScreen;
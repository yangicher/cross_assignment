import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Switch,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Platform
} from 'react-native';
import { useTheme } from '../../state/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function NotificationSettingsScreen() {
    const { colors } = useTheme();
    const navigation = useNavigation();

    // Стейт для перемикачів
    const [messagesEnabled, setMessagesEnabled] = useState(true);
    const [remindersEnabled, setRemindersEnabled] = useState(true);
    const [newsEnabled, setNewsEnabled] = useState(false);

    // Функція закриття (повернення назад)
    const handleClose = () => {
        navigation.goBack();
    };

    return (
        // Зовнішній контейнер (напівпрозорий фон)
        <View style={styles.overlay}>
            {/* Дозволяє закрити вікно кліком по фону (UX) */}
            <TouchableWithoutFeedback onPress={handleClose}>
                <View style={styles.backdrop} />
            </TouchableWithoutFeedback>

            {/* Саме "вікно" налаштувань */}
            <View style={[styles.modalContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>

                {/* Хедер вікна */}
                <View style={[styles.header, { borderBottomColor: colors.border }]}>
                    <Text style={[styles.title, { color: colors.text }]}>Сповіщення</Text>
                    <TouchableOpacity onPress={handleClose}>
                        <Ionicons name="close" size={24} color={colors.subText} />
                    </TouchableOpacity>
                </View>

                {/* Список налаштувань */}
                <View style={styles.content}>

                    {/* Рядок 1: Повідомлення */}
                    <View style={styles.row}>
                        <View style={styles.rowText}>
                            <Text style={[styles.label, { color: colors.text }]}>Нові повідомлення</Text>
                            <Text style={[styles.description, { color: colors.subText }]}>
                                Сповіщення про повідомлення в чаті
                            </Text>
                        </View>
                        <Switch
                            value={messagesEnabled}
                            onValueChange={setMessagesEnabled}
                            trackColor={{ false: '#767577', true: colors.primary }}
                            thumbColor={Platform.OS === 'android' ? '#f4f3f4' : ''}
                        />
                    </View>

                    {/* Рядок 2: Нагадування */}
                    <View style={styles.row}>
                        <View style={styles.rowText}>
                            <Text style={[styles.label, { color: colors.text }]}>Нагадування про урок</Text>
                            <Text style={[styles.description, { color: colors.subText }]}>
                                За 15 хвилин до початку заняття
                            </Text>
                        </View>
                        <Switch
                            value={remindersEnabled}
                            onValueChange={setRemindersEnabled}
                            trackColor={{ false: '#767577', true: colors.primary }}
                            thumbColor={Platform.OS === 'android' ? '#f4f3f4' : ''}
                        />
                    </View>

                    {/* Рядок 3: Новини */}
                    <View style={styles.row}>
                        <View style={styles.rowText}>
                            <Text style={[styles.label, { color: colors.text }]}>Новини платформи</Text>
                            <Text style={[styles.description, { color: colors.subText }]}>
                                Оновлення та акції
                            </Text>
                        </View>
                        <Switch
                            value={newsEnabled}
                            onValueChange={setNewsEnabled}
                            trackColor={{ false: '#767577', true: colors.primary }}
                            thumbColor={Platform.OS === 'android' ? '#f4f3f4' : ''}
                        />
                    </View>

                </View>

                {/* Кнопка "Зберегти" (або закрити) */}
                <TouchableOpacity
                    style={[styles.saveButton, { backgroundColor: colors.primary }]}
                    onPress={handleClose}
                >
                    <Text style={styles.saveButtonText}>Готово</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center', // Центруємо вікно по вертикалі
        alignItems: 'center',     // Центруємо вікно по горизонталі
        backgroundColor: 'rgba(0,0,0,0.5)', // Напівпрозорий фон
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    modalContainer: {
        width: '85%', // Ширина вікна (менша за екран)
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1, // Тонка рамка для краси (особливо в темній темі)
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 15,
        borderBottomWidth: 1,
        marginBottom: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    rowText: {
        flex: 1,
        paddingRight: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    description: {
        fontSize: 12,
    },
    saveButton: {
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
});
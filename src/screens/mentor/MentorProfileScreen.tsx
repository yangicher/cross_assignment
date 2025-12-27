import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import client from '../../api/client';
import { useAuth } from '@/src/state/AuthContext';
import { useTheme } from '@/src/state/ThemeContext'; 

const MentorProfileScreen = ({ navigation }: any) => {
    const { colors, isDark, toggleTheme } = useTheme();
    const { logout } = useAuth();

    const [bio, setBio] = useState('');
    const [hourlyRate, setHourlyRate] = useState('');
    const [skills, setSkills] = useState('');
    const [loading, setLoading] = useState(false);

    const saveProfile = async () => {
        if (!hourlyRate || !skills || !bio) {
            Alert.alert('Помилка', 'Будь ласка, заповніть усі поля');
            return;
        }

        setLoading(true);
        try {
            await client.post('/mentors/profile', {
                bio,
                hourlyRate: parseInt(hourlyRate),
                skills: skills.split(',').map(s => s.trim())
            });

            Alert.alert('Успіх!', 'Ваш профіль відправлено на перевірку.');
            navigation.goBack();
        } catch (error) {
            console.log(error);
            Alert.alert('Помилка', 'Не вдалося зберегти профіль');
        } finally {
            setLoading(false);
        }
    };

    const Divider = () => <View style={[styles.divider, { backgroundColor: colors.border }]} />;

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    
                    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <View style={styles.row}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Ionicons name={isDark ? "moon" : "sunny"} size={22} color={colors.text} style={{marginRight: 10}} />
                                <Text style={[styles.label, { color: colors.text, marginTop: 0 }]}>Темна тема</Text>
                            </View>
                            <Switch
                                value={isDark}
                                onValueChange={toggleTheme}
                                trackColor={{ false: "#767577", true: colors.primary }}
                                thumbColor={"#f4f3f4"}
                            />
                        </View>
                    </View>

                    <View style={styles.header}>
                        <Text style={[styles.subtitle, { color: colors.subText }]}>
                            Заповніть інформацію, щоб студенти могли вас знайти
                        </Text>
                    </View>
                    
                    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>

                        <Text style={[styles.label, { color: colors.text }]}>Ціна за годину ($)</Text>
                        <TextInput
                            style={[styles.input, { color: colors.text, borderBottomColor: colors.border }]}
                            keyboardType="numeric"
                            value={hourlyRate}
                            onChangeText={setHourlyRate}
                            placeholder="Наприклад: 50"
                            placeholderTextColor={colors.subText}
                        />

                        <Divider />

                        <Text style={[styles.label, { color: colors.text }]}>Навички (через кому)</Text>
                        <TextInput
                            style={[styles.input, { color: colors.text, borderBottomColor: colors.border }]}
                            value={skills}
                            onChangeText={setSkills}
                            placeholder="JavaScript, React Native, NestJS"
                            placeholderTextColor={colors.subText}
                        />

                        <Divider />

                        <Text style={[styles.label, { color: colors.text }]}>Про себе (Bio)</Text>
                        <TextInput
                            style={[styles.input, styles.multilineInput, { color: colors.text }]}
                            multiline
                            textAlignVertical="top"
                            value={bio}
                            onChangeText={setBio}
                            placeholder="Я Senior Developer з 5 роками досвіду..."
                            placeholderTextColor={colors.subText}
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.saveButton, { backgroundColor: colors.primary }]}
                        onPress={saveProfile}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.saveButtonText}>Зберегти зміни</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.logoutButton, { borderColor: colors.danger }]}
                        onPress={logout}
                    >
                        <Text style={[styles.logoutText, { color: colors.danger }]}>Вийти з акаунту</Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 25,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 4,
        textTransform: 'uppercase',
        opacity: 0.8,
    },
    card: {
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 25,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 5,
    },
    input: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 0,
    },
    multilineInput: {
        minHeight: 100,
        paddingTop: 10,
    },
    divider: {
        height: 1,
        width: '100%',
        marginVertical: 5,
        opacity: 0.5,
    },
    saveButton: {
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        paddingVertical: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: 'transparent',
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
    }
});

export default MentorProfileScreen;
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useAuth } from '../../state/AuthContext';

const RegisterScreen = ({ navigation }: any) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'MENTOR' | 'MENTEE'>('MENTEE');

    const { register, isLoading } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Створити акаунт</Text>

            <TextInput
                style={styles.input}
                placeholder="Ім'я та Прізвище"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {/* Вибір ролі */}
            <View style={styles.roleContainer}>
                <TouchableOpacity
                    style={[styles.roleButton, role === 'MENTEE' && styles.roleButtonActive]}
                    onPress={() => setRole('MENTEE')}
                >
                    <Text style={[styles.roleText, role === 'MENTEE' && styles.roleTextActive]}>Я Студент</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.roleButton, role === 'MENTOR' && styles.roleButtonActive]}
                    onPress={() => setRole('MENTOR')}
                >
                    <Text style={[styles.roleText, role === 'MENTOR' && styles.roleTextActive]}>Я Ментор</Text>
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" style={{marginTop: 20}} />
            ) : (
                <View style={{marginTop: 20}}>
                    <Button
                        title="Зареєструватися"
                        onPress={() => register(name, email, password, role)}
                    />
                    <View style={{marginTop: 15}}>
                        <Button
                            title="Вже є акаунт? Увійти"
                            color="gray"
                            onPress={() => navigation.navigate('Login')}
                        />
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: '#f9f9f9'
    },
    roleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    roleButton: {
        flex: 1,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    roleButtonActive: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    roleText: {
        color: '#333',
        fontWeight: '600'
    },
    roleTextActive: {
        color: '#fff'
    }
});

export default RegisterScreen;
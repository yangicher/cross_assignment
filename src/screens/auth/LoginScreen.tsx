import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useAuth } from '../../state/AuthContext';

const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Menti Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {isLoading ? (
                <ActivityIndicator size="large" />
            ) : (
                <Button
                    title="Увійти"
                    onPress={() => login(email, password)}
                />
            )}

            <View style={{marginTop: 15}}>
                <Button
                    title="Немає акаунту? Реєстрація"
                    color="gray"
                    onPress={() => navigation.navigate('Register')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
});

export default LoginScreen;
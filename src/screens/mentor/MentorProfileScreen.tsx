import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import client from '../../api/client';
import {useAuth} from "@/src/state/AuthContext";

const MentorProfileScreen = ({ navigation }: any) => {
    const [bio, setBio] = useState('');
    const [hourlyRate, setHourlyRate] = useState('');
    const [skills, setSkills] = useState('');

    const saveProfile = async () => {
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
        }
    };

    const { logout } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Роззкажіть про себе (Bio):</Text>
            <TextInput
                style={[styles.input, { height: 100 }]}
                multiline
                value={bio}
                onChangeText={setBio}
                placeholder="Я Senior Developer з 5 роками досвіду..."
            />

            <Text style={styles.label}>Ціна за годину ($):</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={hourlyRate}
                onChangeText={setHourlyRate}
                placeholder="50"
            />

            <Text style={styles.label}>Навички (через кому):</Text>
            <TextInput
                style={styles.input}
                value={skills}
                onChangeText={setSkills}
                placeholder="JavaScript, React Native, NestJS"
            />

            <Button title="Зберегти профіль" onPress={saveProfile} />


            <View style={{ marginTop: 20 }}>
                <Button title="Вийти" color="red" onPress={logout} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    label: { fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 5 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, fontSize: 16, backgroundColor: '#f9f9f9' }
});

export default MentorProfileScreen;
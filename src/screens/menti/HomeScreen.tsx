import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Button } from 'react-native';
import client from '../../api/client';
import { useAuth } from '../../state/AuthContext';

const HomeScreen = ({ navigation }: any) => {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const { logout } = useAuth();

    const fetchMentors = async () => {
        try {
            const response = await client.get('/mentors');
            setMentors(response.data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMentors();
    }, []);

    const renderMentor = ({ item }: any) => (
        <View style={styles.card}>
            <Text style={styles.name}>{item.user.name}</Text>
            <Text style={styles.skills}>{item.skills.join(', ')}</Text>
            <Text style={styles.price}>${item.hourlyRate} / година</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Booking', { mentorId: item.user.id, mentorName: item.user.name })}
            >
                <Text style={styles.buttonText}>Забронювати урок</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <FlatList
                    data={mentors}
                    keyExtractor={(item: any) => item.id.toString()}
                    renderItem={renderMentor}
                    ListEmptyComponent={<Text style={{textAlign:'center', marginTop: 20}}>Менторів поки немає 😔</Text>}
                />
            )}
            <Button title="Вийти" color="red" onPress={logout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    card: { backgroundColor: 'white', padding: 15, marginBottom: 10, borderRadius: 10, elevation: 2 },
    name: { fontSize: 18, fontWeight: 'bold' },
    skills: { color: 'gray', marginVertical: 5 },
    price: { fontSize: 16, color: 'green', fontWeight: 'bold', marginBottom: 10 },
    button: { backgroundColor: '#007AFF', padding: 10, borderRadius: 5, alignItems: 'center' },
    buttonText: { color: 'white', fontWeight: 'bold' }
});

export default HomeScreen;
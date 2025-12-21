import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    SafeAreaView,
    Button,
    Modal,
    Image,
    ListRenderItem
} from 'react-native';
import { fetchMentors } from '../../api/api';
import MentorListItem from '../../components/MentorListItem';
import { Mentor } from '../../models/Mentor'

const MentorsListTabScreen: React.FC = () => {
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchMentors();
            setMentors(data);
        } catch (err) {
            setError('Помилка завантаження даних');
        } finally {
            setLoading(false);
        }
    };

    const renderItem: ListRenderItem<Mentor> = ({ item }) => (
        <MentorListItem
            mentor={item}
            onPress={() => setSelectedMentor(item)}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            {loading && (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#0077b5" />
                </View>
            )}

            {error && !loading && (
                <View style={styles.center}>
                    <Text style={styles.errorText}>{error}</Text>
                    <Button title="Оновити" onPress={loadData} />
                </View>
            )}

            {!loading && !error && (
                <FlatList
                    data={mentors}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                />
            )}

            <Modal
                visible={!!selectedMentor}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setSelectedMentor(null)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {selectedMentor && (
                            <>
                                <Image
                                    source={{ uri: selectedMentor.largeAvatar }}
                                    style={styles.modalImage}
                                />
                                <Text style={styles.modalTitle}>{selectedMentor.fullName}</Text>

                                <View style={styles.modalRow}>
                                    <Text style={styles.modalLabel}>📧 Email:</Text>
                                    <Text style={styles.modalValue}>{selectedMentor.email}</Text>
                                </View>

                                <View style={styles.modalRow}>
                                    <Text style={styles.modalLabel}>📞 Телефон:</Text>
                                    <Text style={styles.modalValue}>{selectedMentor.phone}</Text>
                                </View>

                                <View style={styles.modalRow}>
                                    <Text style={styles.modalLabel}>📍 Локація:</Text>
                                    <Text style={styles.modalValue}>{selectedMentor.location}</Text>
                                </View>

                                <View style={styles.buttonContainer}>
                                    <Button
                                        title="Закрити"
                                        onPress={() => setSelectedMentor(null)}
                                        color="#d9534f"
                                    />
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f2f2f2' },
    header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', margin: 15 },
    list: { paddingHorizontal: 16 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    errorText: { color: 'red', marginBottom: 10, fontSize: 16 },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 16,
        alignItems: 'center',
        elevation: 5
    },
    modalImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    modalRow: {
        flexDirection: 'row',
        marginBottom: 8,
        width: '100%',
        flexWrap: 'wrap'
    },
    modalLabel: {
        fontWeight: '600',
        marginRight: 5,
        color: '#333'
    },
    modalValue: {
        color: '#555',
        flex: 1
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%'
    }
});

export default MentorsListTabScreen;
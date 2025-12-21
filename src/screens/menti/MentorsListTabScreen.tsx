import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { fetchMentors } from '../../api/api';
import MentorItem from '../../components/MentorListItem';
import { Mentor } from '../../models/Mentor';
import { MentorsStackParamList } from '../../navigation/MentorsNavigator';
import { useTheme } from '../../state/ThemeContext';

type Props = NativeStackScreenProps<MentorsStackParamList, 'MentorsList'>;

const MentorsListTabScreen: React.FC<Props> = ({ navigation }) => {
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { colors } = useTheme();

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
            setError('Помилка завантаження');
        } finally {
            setLoading(false);
        }
    };

    const handlePressMentor = (mentor: Mentor) => {
        navigation.navigate('MentorDetails', { mentor });
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.card }]}>
            {loading && (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#0077b5" />
                </View>
            )}

            {error && !loading && (
                <View style={styles.center}>
                    <Text style={{ marginBottom: 10, color: 'red' }}>{error}</Text>
                    <Button title="Спробувати знову" onPress={loadData} />
                </View>
            )}

            {!loading && !error && (
                <FlatList
                    data={mentors}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <MentorItem
                            mentor={item}
                            onPress={() => handlePressMentor(item)}
                        />
                    )}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f2f2f2' },
    list: { padding: 16 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default MentorsListTabScreen;
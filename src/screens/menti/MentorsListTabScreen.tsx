import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MentorItem from '../../components/MentorListItem';
import { MentorsStackParamList } from '../../navigation/MentorsNavigator';
import { useTheme } from '../../state/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getMentors } from '../../store/slices/mentorsSlice';

type Props = NativeStackScreenProps<MentorsStackParamList, 'MentorsList'>;

const MentorsListTabScreen: React.FC<Props> = ({ navigation }) => {
    const { colors } = useTheme();

    const dispatch = useAppDispatch();
    const { list, loading, error } = useAppSelector((state) => state.mentors);

    useEffect(() => {
        if (list.length === 0) {
            dispatch(getMentors());
        }
    }, []);

    const handleRefresh = () => {
        dispatch(getMentors());
    };

    const renderContent = () => {
        if (loading && list.length === 0) {
            return (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            );
        }

        if (error && list.length === 0) {
            return (
                <View style={styles.center}>
                    <Text style={{ color: colors.danger, marginBottom: 10 }}>{error}</Text>
                    <Button title="Спробувати знову" onPress={handleRefresh} />
                </View>
            );
        }

        return (
            <FlatList
                data={list}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <MentorItem
                        mentor={item}
                        onPress={() => navigation.navigate('MentorDetails', { mentor: item })}
                    />
                )}
                contentContainerStyle={styles.list}
                refreshing={loading}
                onRefresh={handleRefresh}
            />
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {renderContent()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    list: { padding: 16 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default MentorsListTabScreen;
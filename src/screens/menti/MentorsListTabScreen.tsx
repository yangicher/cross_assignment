import React, { useEffect, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button, ListRenderItem } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MentorItem from '../../components/MentorListItem';
import { MentorsStackParamList } from '../../navigation/MentorsNavigator';
import { useTheme } from '../../state/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getMentors } from '../../store/slices/mentorsSlice';
import { Mentor } from '../../models/Mentor';

type Props = NativeStackScreenProps<MentorsStackParamList, 'MentorsList'>;

const MentorsListTabScreen: React.FC<Props> = ({ navigation }) => {
    const { colors } = useTheme();
    const dispatch = useAppDispatch();
    const { list, loading, error } = useAppSelector((state) => state.mentors);

    useEffect(() => {
        if (list.length === 0) {
            dispatch(getMentors());
        }
    }, [dispatch, list.length]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    title="❤️ Обрані"
                    onPress={() => navigation.navigate('Favorites')}
                />
            ),
        });
    }, [navigation]);

    const handleRefresh = useCallback(() => { dispatch(getMentors()); }, [dispatch]);

    const handlePressMentor = useCallback((item: Mentor) => {
        navigation.navigate('MentorDetails', { mentor: item });
    }, [navigation]);
    
    const renderItem = useCallback<ListRenderItem<Mentor>>(({ item }) => (
        <MentorItem
            mentor={item}
            onPress={() => handlePressMentor(item)}
        />
    ), [handlePressMentor]);

    const keyExtractor = useCallback((item: Mentor) => item.id.toString(), []);
    if (loading && list.length === 0) {
        return (
            <View style={[styles.center, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if (error && list.length === 0) {
        return (
            <View style={[styles.center, { backgroundColor: colors.background }]}>
                <Text style={{ color: colors.danger, marginBottom: 10 }}>{error}</Text>
                <Button title="Спробувати знову" onPress={handleRefresh} />
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <FlatList
                data={list}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                refreshing={loading}
                onRefresh={handleRefresh}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    list: { padding: 16 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default MentorsListTabScreen;
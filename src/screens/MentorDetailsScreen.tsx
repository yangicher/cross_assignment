import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MentorsStackParamList } from '../navigation/MentorsNavigator';
import { useTheme } from '../state/ThemeContext';

type Props = NativeStackScreenProps<MentorsStackParamList, 'MentorDetails'>;

const MentorDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
    const { mentor } = route.params;
    const { colors } = useTheme();

    useEffect(() => {
        navigation.setOptions({ title: mentor.fullName });
    }, [mentor, navigation]);

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
            <Image source={{ uri: mentor.largeAvatar }} style={styles.avatar} />

            <Text style={[styles.name, { color: colors.text }]}>{mentor.fullName}</Text>
            <Text style={[styles.location, { color: colors.subText }]}>📍 {mentor.location}</Text>

            <View style={[styles.card, { backgroundColor: colors.card }]}>
                <View style={styles.row}>
                    <Text style={[styles.label, { color: colors.subText }]}>Email:</Text>
                    <Text style={[styles.value, { color: colors.text }]}>{mentor.email}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label, { color: colors.subText }]}>Телефон:</Text>
                    <Text style={[styles.value, { color: colors.text }]}>{mentor.phone}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label, { color: colors.subText }]}>ID:</Text>
                    <Text style={[styles.value, { color: colors.text }]}>{mentor.id}</Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Написати повідомлення" onPress={() => console.log("write msg")} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { alignItems: 'center', padding: 20, backgroundColor: '#fff', flexGrow: 1 },
    avatar: { width: 150, height: 150, borderRadius: 75, marginBottom: 20 },
    name: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 5 },
    location: { fontSize: 16, color: '#666', marginBottom: 20 },
    card: { width: '100%', backgroundColor: '#f9f9f9', padding: 20, borderRadius: 10, marginBottom: 20 },
    row: { flexDirection: 'row', marginBottom: 15, flexWrap: 'wrap' },
    label: { fontWeight: 'bold', width: 80, color: '#555' },
    value: { flex: 1, color: '#333' },
    buttonContainer: { width: '100%' }
});

export default MentorDetailsScreen;
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Mentor } from '../models/Mentor';
import { useTheme } from '../state/ThemeContext';

interface MentorItemProps {
    mentor: Mentor;
    onPress: () => void;
}

const MentorListItem: React.FC<MentorItemProps> = ({ mentor, onPress }) => {
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            style={[
                styles.card,
                { backgroundColor: colors.card, shadowColor: colors.text },
            ]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Image
                source={{ uri: mentor.avatar }}
                style={[styles.avatar, { backgroundColor: colors.border }]}
            />
            <View style={styles.info}>
                <Text style={[styles.name, { color: colors.text }]}>{mentor.fullName}</Text>
                <Text style={[styles.email, { color: colors.subText }]}>{mentor.email}</Text>
                <Text style={[styles.location, { color: colors.subText }]}>📍 {mentor.location}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 12,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
        backgroundColor: '#e1e4e8',
    },
    info: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    location: {
        fontSize: 12,
        color: '#888',
    },
});

export default MentorListItem;
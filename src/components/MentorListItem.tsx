import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Mentor } from '../models/Mentor';
import { useTheme } from '../state/ThemeContext';
import {Ionicons} from "@expo/vector-icons";

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
            {/*<Image*/}
            {/*    source={{ uri: mentor.avatar }}*/}
            {/*    style={[styles.avatar, { backgroundColor: colors.border }]}*/}
            {/*/>*/}
            <View style={[styles.avatar, { backgroundColor: colors.border }]}>
            </View>
            <View style={styles.info}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={[styles.name, { color: colors.text, flex: 1 }]}>{mentor.fullName}</Text>
                    {mentor.hourlyRate && (
                        <Text style={[styles.price, { color: 'green' }]}>${mentor.hourlyRate}/г</Text>
                    )}
                </View>

                <Text numberOfLines={1} style={[styles.skills, { color: colors.subText }]}>
                    {mentor.skills && mentor.skills.length > 0
                        ? mentor.skills.join(', ')
                        : 'Немає вказаних навичок'}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 15,
        marginBottom: 12,
        borderRadius: 12,
        alignItems: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    info: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    skills: {
        fontSize: 13,
        marginBottom: 2,
    },
    email: {
        fontSize: 12,
    },
});

export default React.memo(MentorListItem);
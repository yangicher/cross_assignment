import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../state/ThemeContext';
import { useAuth } from "@/src/state/AuthContext";

const MessagesScreen = () => {
    const { colors } = useTheme();
    const { role } = useAuth();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.content}>
                <View style={[styles.iconContainer, { backgroundColor: colors.card }]}>
                    <Ionicons
                        name="chatbubbles-outline"
                        size={64}
                        color={colors.primary}
                    />
                </View>

                <Text style={[styles.title, { color: colors.text }]}>
                    Повідомлення
                </Text>

                {role === 'MENTOR' ? (
                    <Text style={[styles.subtitle, { color: colors.subText }]}>
                        Тут з'являться ваші діалоги після того, як ви проведете перший урок або хтось напише вам.
                    </Text>
                ) : (
                    <Text style={[styles.subtitle, { color: colors.subText }]}>
                        Тут з'являться ваші діалоги після того, як ви забронюєте перший урок або хтось напише вам.
                    </Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        alignItems: 'center',
        maxWidth: '80%',
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60, 
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
    }
});

export default MessagesScreen;
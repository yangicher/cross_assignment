import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';

export default function AppTopBar({
                                      route,
                                      navigation,
                                  }: BottomTabHeaderProps) {
    const insets = useSafeAreaInsets();

    const titleMap: Record<string, string> = {
        Home: 'Головна',
        Schedule: 'Розклад',
        Calendar: 'Календар',
        Messages: 'Повідомлення',
        Profile: 'Профіль',
        Settings: 'Налаштування',
    };

    const title = titleMap[route.name] ?? route.name;

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.content}>
                {/* LEFT */}
                <View style={styles.side} />

                {/* TITLE */}
                <Text style={styles.title}>{title}</Text>

                {/* RIGHT */}
                <TouchableOpacity
                    style={styles.side}
                    onPress={() => {
                        navigation.getParent()?.navigate('NotificationsSettings');
                    }}
                >
                    <Ionicons name="notifications-outline" size={22} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    content: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    side: {
        width: 32,
        alignItems: 'center',
    },
    title: {
        flex: 1,
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '700',
    },
});

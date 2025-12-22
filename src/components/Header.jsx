import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../state/ThemeContext';

export default function Header({
                                   title,
                                   step,        // number | undefined
                                   totalSteps,  // number | undefined
                                   onBack,
                               }) {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* BACK */}
            <TouchableOpacity onPress={onBack} hitSlop={10} style={styles.left}>
                <Text style={styles.back}>←</Text>
            </TouchableOpacity>

            {/* TITLE */}
            <Text style={styles.title}>{title}</Text>

            {/* STEP */}
            <View style={styles.right}>
                {step && totalSteps ? (
                    <Text style={styles.step}>
                        {step}/{totalSteps}
                    </Text>
                ) : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight: 56,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    left: {
        width: 40,
    },
    back: {
        fontSize: 22,
        fontWeight: '600',
    },
    title: {
        flex: 1,
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '700',
    },
    right: {
        width: 40,
        alignItems: 'flex-end',
    },
    step: {
        fontSize: 13,
        fontWeight: '600',
        color: '#555',
    },
});

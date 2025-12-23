import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
} from 'react-native';
import Animated from 'react-native-reanimated';
import Header from '../components/Header';
import RoleCard from '../components/RoleCard';
import useFadeIn from '../hooks/useFadeIn';

export default function SelectRoleScreen({navigation}) {
    const fadeInContent = useFadeIn({delay: 200});
    return (
        <ImageBackground
            source={require('../assets/select-bg.png')}
            style={styles.bg}
            resizeMode="cover"
        >
            <View style={styles.overlay} />

            <View style={styles.screen}>
                {/* HEADER */}
                <Header title="Оберіть роль" onBack={() => navigation.goBack()} />

                {/* FADE-IN CONTENT */}
                <Animated.View style={[styles.content, fadeInContent]}>
                    <Text style={styles.subtitle}>
                        Ви завжди зможете змінити її пізніше
                    </Text>

                    <View style={styles.cards}>
                        <RoleCard
                            title="MENTOR"
                            description="Ділитись досвідом та допомагати іншим"
                            onPress={() => navigation.navigate('MentorForm', { step: 1, totalSteps: 2 })}
                        />

                        <RoleCard
                            title="MENTI"
                            description="Знайти ментора та розвиватись"
                            onPress={() => navigation.navigate('MentiForm', { step: 1, totalSteps: 3 })}
                        />
                    </View>
                </Animated.View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.15)',
    },
    screen: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 24,
        justifyContent: 'center',
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 14,
        color: 'rgba(255,255,255,0.85)',
        marginBottom: 32,
    },
    cards: {
        alignItems: 'center',
    },
});

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
} from 'react-native';
import Animated from 'react-native-reanimated';
import GradientCustomButton from '../components/GradientCustomButton';
import CustomButton from '../components/CustomButton';
import useFadeIn from '../hooks/useFadeIn';
import type { AuthStackParamList } from '../navigation/AuthStackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<AuthStackParamList, 'Start'>;

export default function StartScreen({ navigation }: Props) {
    const fadeInButtons = useFadeIn({delay: 500});
    return (
        <ImageBackground
            source={require('../assets/start-bg.png')}
            style={styles.bg}
            resizeMode="cover"
        >
            <View style={styles.overlay} />

            <View style={styles.screen}>
                {/* LOGO */}
                <View style={styles.top}>
                    <Image
                        source={require('../assets/logo.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.tagline}>
                        З ментором легше
                    </Text>
                </View>
                
                {/* FADE-IN BUTTONS */}
                <Animated.View style={[styles.buttons, fadeInButtons]}>
                    <GradientCustomButton
                        title="Розпочати"
                        size="lg"
                        gradient="primary"
                        onPress={() => navigation.navigate('SelectRole')}
                    />

                    <CustomButton
                        title="Вже маєте обліковий запис? Увійти"
                        size="lg"
                        variant="ghost"
                        onPress={() => {}}
                        style={{ marginTop: 12 }}
                    />
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
        backgroundColor: 'rgba(0,0,0,0.25)',
    },
    screen: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        paddingBottom: 40,
    },
    top: {
        marginTop: 120,
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 40,
        resizeMode: 'contain',
        marginBottom: 8,
    },
    tagline: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
    },
    buttons: {
        width: '100%',
    },
});
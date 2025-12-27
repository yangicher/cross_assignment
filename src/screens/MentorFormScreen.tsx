import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    ImageBackground,
} from 'react-native';
import Animated from 'react-native-reanimated';
import Header from '../components/Header';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import useFadeIn from '../hooks/useFadeIn';
import { useAuth } from '../state/AuthContext';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<
    RootStackParamList,
    'MentorForm'
>;

export default function MentorFormScreen({ navigation, route }: Props) {
    const { step, totalSteps } = route.params;

    const fadeIn = useFadeIn({delay: 200});

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'MENTOR' | 'MENTEE'>('MENTOR');

    const { register, isLoading } = useAuth();
    
    return (
        <ImageBackground
            source={require('../assets/select-bg.png')}
            style={styles.bg}
        >
            <View style={styles.overlay} />

            <View style={styles.screen}>
                <Header
                    title="Ментор"
                    step={step}
                    totalSteps={totalSteps}
                    onBack={() => navigation.goBack()}
                />

                <Animated.View style={[styles.content, fadeIn]}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <InputField label="Імʼя" placeholder={"name"} value={name} onChangeText={setName} />
                        <InputField label="Email" placeholder={"email"} value={email} onChangeText={setEmail} />
                        <InputField label="Пароль" placeholder={"password"} value={password} onChangeText={setPassword} />

                        <CustomButton
                            title="Продовжити"
                            onPress={() => register(name, email, password, role)}
                            style={{ marginTop: 24 }}
                        />
                    </ScrollView>
                </Animated.View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: { flex: 1 },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.12)',
    },
    screen: { flex: 1 },
    content: { flex: 1, padding: 20 },
});

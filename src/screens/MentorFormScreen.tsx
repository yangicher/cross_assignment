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

import type { MentorFormData } from '../types/forms';

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
    const [experience, setExperience] = useState('');
    const [stack, setStack] = useState('');

    const { completeAuth } = useAuth();

    const handleNext = () => {
        const data: MentorFormData = { name, experience, stack };
        console.log('Mentor data:', data);

        completeAuth('mentor');
    };

    return (
        <ImageBackground
            source={require('../assets/select-bg.png')}
            style={styles.bg}
        >
            <View style={styles.overlay} />

            <View style={styles.screen}>
                <Header
                    title="Анкета ментора"
                    step={step}
                    totalSteps={totalSteps}
                    onBack={() => navigation.goBack()}
                />

                <Animated.View style={[styles.content, fadeIn]}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <InputField label="Імʼя" placeholder={"name"} value={name} onChangeText={setName} />
                        <InputField label="Досвід" placeholder={"exp"} value={experience} onChangeText={setExperience} />
                        <InputField label="Стек" placeholder={"stack"} value={stack} onChangeText={setStack} />

                        <CustomButton
                            title="Продовжити"
                            onPress={handleNext}
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

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

import type {MentiFormData} from '../types/forms';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<
    RootStackParamList,
    'MentiForm'
>;
/* ========= COMPONENT ========= */

export default function MentiFormScreen({ navigation, route }: Props) {
    const { step, totalSteps } = route.params;
    const fadeIn = useFadeIn({delay: 200});

    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [level, setLevel] = useState('');

    const { completeAuth } = useAuth();
    
    const handleNext = () => {
        const data: MentiFormData = { name, goal, level };
        console.log('Mentor data:', data);

        completeAuth('menti');
    };

    return (
        <ImageBackground
            source={require('../assets/select-bg.png')}
            style={styles.bg}
        >
            <View style={styles.overlay} />

            <View style={styles.screen}>
                <Header
                    title="Анкета менти"
                    step={step}
                    totalSteps={totalSteps}
                    onBack={() => navigation.goBack()}
                />

                <Animated.View style={[styles.content, fadeIn]}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <InputField
                            label="Імʼя"
                            placeholder={"name"}
                            value={name}
                            onChangeText={setName}
                        />

                        <InputField
                            label="Ціль навчання"
                            placeholder={"goal"}
                            value={goal}
                            onChangeText={setGoal}
                        />

                        <InputField
                            label="Рівень"
                            placeholder={"level"}
                            value={level}
                            onChangeText={setLevel}
                        />

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

/* ========= STYLES ========= */

const styles = StyleSheet.create({
    bg: { flex: 1 },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.12)',
    },
    screen: { flex: 1 },
    content: { flex: 1, padding: 20 },
});

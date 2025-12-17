import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Animated,
} from 'react-native';

import Header from '../components/Header';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import useFadeIn from '../hooks/useFadeIn';
import type { MentiFormData } from '../types/forms';


/* ========= TYPES ========= */

type Props = {
    step: number;
    totalSteps: number;
    initialValues?: Partial<MentiFormData>;
    onBack: () => void;
    onNext?: (data: MentiFormData) => void;
};

/* ========= COMPONENT ========= */

export default function MentiFormScreen({
                                            step,
                                            totalSteps,
                                            initialValues = {},
                                            onBack,
                                            onNext,
                                        }: Props) {
    const fadeIn = useFadeIn();

    const [name, setName] = useState(initialValues.name ?? '');
    const [goal, setGoal] = useState(initialValues.goal ?? '');
    const [level, setLevel] = useState(initialValues.level ?? '');

    const handleNext = () => {
        onNext?.({ name, goal, level });
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
                    onBack={onBack}
                />

                <Animated.View style={[styles.content, fadeIn]}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <InputField
                            label="Імʼя"
                            value={name}
                            onChangeText={setName}
                        />

                        <InputField
                            label="Ціль навчання"
                            value={goal}
                            onChangeText={setGoal}
                        />

                        <InputField
                            label="Рівень"
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

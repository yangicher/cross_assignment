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
import type { MentorFormData } from '../types/forms';

type Props = {
    step: number;
    totalSteps: number;
    initialValues?: Partial<MentorFormData>;
    onBack: () => void;
    onNext?: (data: MentorFormData) => void;
};

export default function MentorFormScreen({
                                             step,
                                             totalSteps,
                                             initialValues = {},
                                             onBack,
                                             onNext,
                                         }: Props) {
    const fadeIn = useFadeIn();

    const [name, setName] = useState(initialValues.name ?? '');
    const [experience, setExperience] = useState(
        initialValues.experience ?? ''
    );
    const [stack, setStack] = useState(initialValues.stack ?? '');

    const handleNext = () => {
        onNext?.({ name, experience, stack });
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
                            label="Досвід"
                            value={experience}
                            onChangeText={setExperience}
                        />

                        <InputField
                            label="Стек"
                            value={stack}
                            onChangeText={setStack}
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

const styles = StyleSheet.create({
    bg: { flex: 1 },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.12)',
    },
    screen: { flex: 1 },
    content: { flex: 1, padding: 20 },
});

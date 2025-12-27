import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, ActivityIndicator, ImageBackground, } from 'react-native';
import InputField from '../../components/InputField';
import { useAuth } from '../../state/AuthContext';
import useFadeIn from "@/src/hooks/useFadeIn";
import Header from '../../components/Header';
import Animated from "react-native-reanimated";
import CustomButton from "@/src/components/CustomButton";

const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading } = useAuth();
    const fadeInContent = useFadeIn({delay: 200});

    return (
        <ImageBackground
            source={require('../../assets/select-bg.png')}
            style={styles.bg}
            resizeMode="cover"
        >
            <View style={styles.overlay} />

            <View style={styles.screen}>
                {/* HEADER */}
                <Header title="Вхід" onBack={() => navigation.goBack()} />

                {/* FADE-IN CONTENT */}
                <Animated.View style={[styles.content, fadeInContent]}>
                    {/*<Text style={styles.subtitle}>
                        Ви завжди зможете змінити її пізніше
                    </Text>*/}

                    <InputField
                        label="Email"
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <InputField
                        label="Password"
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                    />

                    {isLoading ? (
                        <ActivityIndicator size="large" />
                    ) : (
                        <CustomButton
                            title="Увійти"
                            onPress={() => login(email, password)}
                            style={{ marginTop: 24 }}
                        />
                    )}

                    <View style={{marginTop: 15}}>
                        <Button
                            title="Немає акаунту? Реєстрація"
                            color="gray"
                            onPress={() => navigation.navigate('SelectRole')}
                        />
                    </View>
                </Animated.View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
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

export default LoginScreen;
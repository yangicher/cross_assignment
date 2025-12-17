import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AnimatedScreen from './src/components/AnimatedScreen';

import StartScreen from './src/screens/StartScreen';
import SelectRoleScreen from './src/screens/SelectRoleScreen';
import MentorFormScreen from './src/screens/MentorFormScreen';
import MentiFormScreen from './src/screens/MentiFormScreen';

type Screen = 'start' | 'select' | 'mentor' | 'menti';

export default function App() {
    const [screen, setScreen] = useState<Screen>('start');
    const [nextScreen, setNextScreen] = useState<Screen | null>(null);

    const navigate = (to: Screen) => {
        setNextScreen(to);
    };

    const handleExitComplete = () => {
        if (nextScreen) {
            setScreen(nextScreen);
            setNextScreen(null);
        }
    };

    const renderScreen = () => {
        switch (screen) {
            case 'start':
                return (
                    <StartScreen
                        onStartPress={() => navigate('select')}
                        onLoginPress={() => {}}
                    />
                );

            case 'select':
                return (
                    <SelectRoleScreen
                        onBack={() => navigate('start')}
                        onSelect={(role: 'mentor' | 'menti') =>
                            navigate(role)
                        }
                    />
                );

            case 'mentor':
                return (
                    <MentorFormScreen
                        onBack={() => navigate('select')}
                    />
                );

            case 'menti':
                return (
                    <MentiFormScreen
                        onBack={() => navigate('select')}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <SafeAreaProvider>
            <View style={{ flex: 1 }}>
                {/* CURRENT SCREEN (завжди visible) */}
                <AnimatedScreen visible>
                    {renderScreen()}
                </AnimatedScreen>

                {/* NEXT SCREEN (overlay з enter animation) */}
                {nextScreen && (
                    <AnimatedScreen
                        visible
                        onExitComplete={handleExitComplete}
                    >
                        {(() => {
                            switch (nextScreen) {
                                case 'start':
                                    return (
                                        <StartScreen
                                            onStartPress={() => navigate('select')}
                                            onLoginPress={() => {}}
                                        />
                                    );
                                case 'select':
                                    return (
                                        <SelectRoleScreen
                                            onBack={() => navigate('start')}
                                            onSelect={(role: 'mentor' | 'menti') =>
                                                navigate(role)
                                            }
                                        />
                                    );
                                case 'mentor':
                                    return (
                                        <MentorFormScreen
                                            onBack={() => navigate('select')}
                                        />
                                    );
                                case 'menti':
                                    return (
                                        <MentiFormScreen
                                            onBack={() => navigate('select')}
                                        />
                                    );
                                default:
                                    return null;
                            }
                        })()}
                    </AnimatedScreen>
                )}
            </View>
        </SafeAreaProvider>
    );
}
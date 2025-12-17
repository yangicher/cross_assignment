import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

export default function AnimatedScreen({ children, visible }) {
    const opacity = useRef(new Animated.Value(visible ? 1 : 0)).current;
    const translateY = useRef(new Animated.Value(visible ? 0 : 12)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: visible ? 1 : 0,
                duration: 220,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: visible ? 0 : -8,
                duration: 220,
                useNativeDriver: true,
            }),
        ]).start();
    }, [visible, opacity, translateY]);

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    opacity,
                    transform: [{ translateY }],
                },
            ]}
        >
            {children}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
});

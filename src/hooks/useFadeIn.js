import { useEffect } from 'react';
import {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    interpolate
} from 'react-native-reanimated';

export default function useFadeIn({
                                      duration = 450,
                                      offset = 12,
                                      delay = 0,
                                  } = {}) {
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withDelay(delay, withTiming(1, { duration }));
    }, [delay, duration]);

    return useAnimatedStyle(() => {
        return {
            opacity: progress.value,
            transform: [
                {
                    translateY: interpolate(
                        progress.value,
                        [0, 1],
                        [offset, 0]
                    ),
                },
            ],
        };
    });
}
import './wdyr';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/state/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';
import { ThemeProvider } from './src/state/ThemeContext';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

export default function App() {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <SafeAreaProvider>
                        <AuthProvider>
                            <RootNavigator />
                        </AuthProvider>
                    </SafeAreaProvider>
                </GestureHandlerRootView>
            </ThemeProvider>
        </Provider>
    );
}
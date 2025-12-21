import React from 'react';
import {
    View,
    Text,
    Switch,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
import { useTheme } from '../../state/ThemeContext'; 
import { useAuth } from '../../state/AuthContext'; 

const SettingsScreen: React.FC = () => {
    const { colors, isDark, toggleTheme } = useTheme();
    const { logout } = useAuth();
    
    const handleLogout = () => {
        Alert.alert(
            "Вихід",
            "Ви впевнені, що хочете вийти?",
            [
                { text: "Ні", style: "cancel" },
                {
                    text: "Так",
                    style: "destructive",
                    onPress: () => logout()}
            ]
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.row}>
                    <View>
                        <Text style={[styles.label, { color: colors.text }]}>Темна тема</Text>
                        <Text style={[styles.subLabel, { color: colors.subText }]}>
                            {isDark ? 'Увімкнено' : 'Вимкнено'}
                        </Text>
                    </View>
                </View>
                <Switch
                    value={isDark}
                    onValueChange={toggleTheme}
                    trackColor={{ false: "#767577", true: colors.primary }}
                    thumbColor={"#f4f3f4"}
                />
            </View>

            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <Text style={[styles.logoutText, { color: colors.danger }]}>Вийти з акаунту</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
    section: {
        marginBottom: 20,
        borderRadius: 12,
        borderWidth: 1,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    label: { fontSize: 18, fontWeight: '500' },
    subLabel: { fontSize: 14, marginTop: 4 },
    logoutBtn: { alignItems: 'center', paddingVertical: 5 },
    logoutText: { fontSize: 16, fontWeight: 'bold' }
});

export default SettingsScreen;
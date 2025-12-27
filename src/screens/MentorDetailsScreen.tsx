import React, { useLayoutEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MentorsStackParamList } from '../navigation/MentorsNavigator';
import { useTheme } from '../state/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleFavorite } from '../store/slices/mentorsSlice';

// Додаємо типізацію для навігації в Booking, 
// якщо цей екран знаходиться в іншому навігаторі, можливо доведеться використати CompositeScreenProps,
// але для простоти залишимо any або розширення поточного типу, якщо навігатори з'єднані.
type Props = NativeStackScreenProps<MentorsStackParamList, 'MentorDetails'>;

const MentorDetailsScreen: React.FC<Props> = ({ route, navigation }: any) => {
    const { mentor } = route.params;
    const { colors } = useTheme();
    const dispatch = useAppDispatch();

    const isFavorite = useAppSelector((state) =>
        state.mentors.favorites.some((m) => m.id === mentor.id)
    );

    // Налаштування хедера (кнопка обраного)
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => dispatch(toggleFavorite(mentor))}>
                    <Ionicons
                        name={isFavorite ? 'heart' : 'heart-outline'}
                        size={28}
                        color={isFavorite ? '#E91E63' : colors.primary}
                    />
                </TouchableOpacity>
            ),
            headerTitle: '', // Ховаємо заголовок, щоб було чистіше
            headerTransparent: true, // Прозорий хедер
        });
    }, [navigation, isFavorite, mentor, dispatch, colors.primary]);

    const handleBooking = () => {
        // Переходимо на екран бронювання, передаючи ID та Ім'я
        navigation.navigate('Booking', {
            mentorId: Number(mentor.id), // Конвертуємо в number, якщо API цього вимагає
            mentorName: mentor.fullName
        });
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* --- HEADER INFO --- */}
                <View style={styles.headerSection}>
                    {/*<Image*/}
                    {/*    source={{ uri: mentor.avatar || 'https://via.placeholder.com/150' }}*/}
                    {/*    style={[styles.avatar, { borderColor: colors.card }]}*/}
                    {/*/>*/}

                    <Text style={[styles.name, { color: colors.text }]}>{mentor.fullName}</Text>

                    <View style={styles.row}>
                        <Ionicons name="location-outline" size={16} color={colors.subText} />
                        <Text style={[styles.location, { color: colors.subText }]}> {mentor.location}</Text>
                    </View>

                    {mentor.hourlyRate ? (
                        <View style={[styles.priceTag, { backgroundColor: '#E8F5E9' }]}>
                            <Text style={styles.priceText}>${mentor.hourlyRate} / година</Text>
                        </View>
                    ) : null}
                </View>

                {/* --- SKILLS --- */}
                <View style={[styles.section, { backgroundColor: colors.card }]}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Навички</Text>
                    <View style={styles.skillsContainer}>
                        {mentor.skills && mentor.skills.length > 0 ? (
                            mentor.skills.map((skill, index) => (
                                <View key={index} style={[styles.skillChip, { backgroundColor: colors.background, borderColor: colors.border }]}>
                                    <Text style={[styles.skillText, { color: colors.text }]}>{skill}</Text>
                                </View>
                            ))
                        ) : (
                            <Text style={{ color: colors.subText }}>Навички не вказані</Text>
                        )}
                    </View>
                </View>

                {/* --- BIO --- */}
                <View style={[styles.section, { backgroundColor: colors.card }]}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Про ментора</Text>
                    <Text style={[styles.bioText, { color: colors.text }]}>
                        {mentor.bio || 'Інформація про себе відсутня.'}
                    </Text>
                </View>

                {/* --- CONTACTS --- */}
                <View style={[styles.section, { backgroundColor: colors.card }]}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Контакти</Text>
                    <View style={styles.contactRow}>
                        <Ionicons name="mail-outline" size={20} color={colors.primary} />
                        <Text style={[styles.contactText, { color: colors.text }]}>{mentor.email}</Text>
                    </View>
                </View>

                {/* Відступ під кнопку */}
                <View style={{ height: 80 }} />
            </ScrollView>

            {/* --- BOTTOM ACTION BUTTON --- */}
            <View style={[styles.bottomBar, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
                <TouchableOpacity
                    style={[styles.bookButton, { backgroundColor: colors.primary }]}
                    onPress={handleBooking}
                >
                    <Text style={styles.bookButtonText}>Забронювати урок</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { paddingBottom: 20 },

    headerSection: {
        alignItems: 'center',
        paddingTop: 60, // Місце під прозорий хедер
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15,
        borderWidth: 4,
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    location: {
        fontSize: 16,
    },
    priceTag: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginTop: 5,
    },
    priceText: {
        color: '#2E7D32',
        fontWeight: 'bold',
        fontSize: 16,
    },

    section: {
        marginHorizontal: 20,
        marginTop: 20,
        padding: 20,
        borderRadius: 16,
        // Тіні
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },

    // Skills
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    skillChip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        marginRight: 8,
        marginBottom: 8,
    },
    skillText: {
        fontSize: 14,
    },

    // Bio
    bioText: {
        fontSize: 15,
        lineHeight: 22,
        opacity: 0.8,
    },

    // Contacts
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    contactText: {
        fontSize: 16,
    },

    // Bottom Bar
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 15,
        borderTopWidth: 1,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    bookButton: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bookButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default MentorDetailsScreen;
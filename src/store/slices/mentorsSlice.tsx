import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import client from '../../api/client';
import { Mentor } from '../../models/Mentor';

// Async thunk для отримання менторів з сервера
export const getMentors = createAsyncThunk<Mentor[]>(
    'mentors/getMentors',
    async (_, { rejectWithValue }) => {
        try {
            // Виконуємо запит на ваш бекенд
            const response = await client.get('/mentors');

            // Якщо сервер повертає масив менторів напряму:
            // return response.data;

            // АЛЕ: Раніше ви казали, що endpoint /mentors повертає список об'єктів, 
            // де дані юзера вкладені (наприклад, { userId, user: { name... }, skills... }).
            // Тому тут треба мапити дані під вашу модель Mentor, якщо вона відрізняється.

            // Приклад мапінгу (адаптуйте під реальну відповідь сервера):
            const mappedData = response.data.map((item: any) => ({
                id: item.userId.toString(),
                fullName: item.user.name || item.user.email,
                email: item.user.email,
                avatar: 'https://i.pravatar.cc/150?u=' + item.userId,
                location: 'Online',
                skills: item.skills,
                hourlyRate: item.hourlyRate,
                bio: item.bio
            }));

            return mappedData;
        } catch (error: any) {
            console.error('Error fetching mentors:', error);
            return rejectWithValue(error.response?.data?.message || 'Не вдалося завантажити список менторів');
        }
    }
);

interface MentorsState {
    list: Mentor[];
    favorites: Mentor[];
    loading: boolean;
    error: string | null;
    lastUpdated: number | null;
}

const initialState: MentorsState = {
    list: [],
    favorites: [],
    loading: false,
    error: null,
    lastUpdated: null,
};

const mentorsSlice = createSlice({
    name: 'mentors',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<Mentor>) => {
            const mentor = action.payload;
            const index = state.favorites.findIndex((m) => m.id === mentor.id);

            if (index >= 0) {
                state.favorites.splice(index, 1);
            } else {
                state.favorites.push(mentor);
            }
        },
        clearMentors: (state) => {
            state.list = [];
            state.lastUpdated = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMentors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMentors.fulfilled, (state, action: PayloadAction<Mentor[]>) => {
                state.loading = false;
                state.list = action.payload;
                state.lastUpdated = Date.now();
            })
            .addCase(getMentors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearMentors, toggleFavorite } = mentorsSlice.actions;
export default mentorsSlice.reducer;
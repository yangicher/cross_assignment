import axios from 'axios';
import { Mentor, normalizeMentor, ApiUser } from '../models/Mentor';

const BASE_URL = 'https://randomuser.me/api';

interface ApiResponse {
    results: ApiUser[];
}

export const fetchMentors = async (): Promise<Mentor[]> => {
    try {
        const response = await axios.get<ApiResponse>(
            `${BASE_URL}/?results=30&inc=login,name,picture,email,phone,location`
        );

        const rawData = response.data.results;
        const cleanData = rawData.map((item) => normalizeMentor(item));

        return cleanData;
    } catch (error) {
        throw error;
    }
};
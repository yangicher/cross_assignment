export interface Mentor {
    id: string;
    fullName: string;
    avatar: string;
    largeAvatar: string;
    email: string;
    phone: string;
    location: string;
}

export interface ApiUser {
    login: { uuid: string };
    name: { first: string; last: string };
    picture: { medium: string; large: string };
    email: string;
    phone: string;
    location: {
        city: string;
        country: string;
    };
}

export const normalizeMentor = (apiData: ApiUser): Mentor => {
    return {
        id: apiData.login?.uuid || Math.random().toString(),
        fullName: `${apiData.name?.first || 'Unknown'} ${apiData.name?.last || ''}`.trim(),
        avatar: apiData.picture?.medium || 'https://via.placeholder.com/150',
        largeAvatar: apiData.picture?.large || 'https://via.placeholder.com/300',
        email: apiData.email || 'Не вказано',
        phone: apiData.phone || 'Не вказано',
        location: `${apiData.location?.city || 'Unknown'}, ${apiData.location?.country || ''}`,
    };
};
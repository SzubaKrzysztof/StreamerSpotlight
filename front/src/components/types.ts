export interface Streamer {
    id: string;
    name: string;
    description: string;
    platform: string;
    votes: number;
    img?: string;
}

export type ServiceName = 'YouTube' | 'Twitter' | 'Instagram' | 'Facebook' | 'Twitch' | 'TikTok' | string;

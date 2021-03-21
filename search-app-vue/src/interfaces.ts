export interface User {
    id: number;
    nickname: string;
    assets?: Asset[];
}

export interface Asset {
    id: number;
    name: string;
    link: string;
    user_id: number;
    likes: User[];
    owner: User;
}

export interface Like {
    like_user_id: number;
    asset_user_id: number;
} 






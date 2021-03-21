const api =  {
    urls: {
        login: '/api/login',
        registration: '/api/registration',
        getAssets: '/api/asset',
        like: (userid: number, assetid:number) => `/api/like/${userid}/${assetid}`,
    },
    host: 'http://localhost:3000',
};

export default api;
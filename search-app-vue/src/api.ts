const api =  {
    urls: {
        login: '/api/login',
        registration: '/api/registration',
        updateUser: (id: number) => `/api/user/${id}`,
        getAssets: '/api/asset',
        createAsset: '/api/asset',
        updateAsset:(assetid: number) => `/api/asset/${assetid}`, 
        deleteAsset:(assetid: number) => `/api/asset/${assetid}`,
        like: (userid: number, assetid: number) => `/api/like/${userid}/${assetid}`,

        
    },
    host: 'http://localhost:3000',
};

export default api;
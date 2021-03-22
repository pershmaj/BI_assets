const api =  {
    urls: {
        login: '/api/login',
        registration: '/api/registration',
        getAssets: '/api/asset',
        updateAsset:(assetid: number) => `/api/asset/${assetid}`, 
        deleteAsset:(assetid: number) => `/api/asset/${assetid}`,
        like: (userid: number, assetid: number) => `/api/like/${userid}/${assetid}`,

        
    },
    host: 'http://localhost:3000',
};

export default api;
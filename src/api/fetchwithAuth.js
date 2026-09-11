
let isrefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
    failedQueue.forEach(({resolve, reject}) => {
        if(error){
            reject(error);
        }else{
            resolve();
        }
    });
    failedQueue = [];
}

async function fetchWithAuth(url, options ={}){
    const config = {...options, credentials: 'include'};

    const response = await fetch(url, config);

    if(response.status !== 401) {
        return response;

    }

    if(url.includes('/refresh') || config._retry) {
        throw new Error('session expired');
    }

    config._retry = true;

    if (isrefreshing){
        await new Promise((resolve, reject) => {
            failedQueue.push({resolve, reject});
        });
        return fetch(url, config);
    }

    isrefreshing = true;

    try{
        const refreshResponse = await fetch('http://localhost:5000/refresh', {
            method: 'POST',
            credentials: 'include'
        });

        if(!refreshResponse.ok){
            throw new Error('refresh token invalid or expired');
        }

        processQueue(null);
        return await fetch(url, config);
    }catch(refreshErr){
        processQueue(refreshErr);
        window.dispatchEvent(new Event('auth:session-expired'));
        throw refreshErr;
    }finally{
        isrefreshing = false;
    }
}

export default fetchWithAuth;
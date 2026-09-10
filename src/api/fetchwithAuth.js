async function fetchWithAuth(url, options={}) {
    const response = await fetch(url, {...options, credentials: 'include'});

    if(response.status !== 401){
        return response;
    }

    const refreshResponse = await fetch('http://localhost:5000/refresh', {
        method: 'POST',
        credentials: 'include',
    });

    if(!refreshResponse.ok) {
        window.location.href = '/signin';
        throw new Error('session expired. Please log in again.');  
    }

    const retryResponse = await fetch(url, {...options, credentials: 'include'});

    return retryResponse;
}

export default fetchWithAuth;
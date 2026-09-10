async function fetchWithAuth(url, options={}) {
    const response = await fetch(url, {...options, credentials: 'include'});

    if(response.status !== 401){
        return response;
    }

    // The sign-in page is public and must not try to refresh or redirect itself.
    if(window.location.pathname === '/signin'){
        return response;
    }

    const refreshResponse = await fetch('http://localhost:5000/refresh', {
        method: 'POST',
        credentials: 'include',
    });

    if(!refreshResponse.ok) {
        window.location.href = '/signin';
        return refreshResponse;
    }

    const retryResponse = await fetch(url, {...options, credentials: 'include'});

    return retryResponse;
}

export default fetchWithAuth;
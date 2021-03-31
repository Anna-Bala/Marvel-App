function fetchData(url)
    {
     const fetchData = fetch(url)
        .then(response => {
            if(response.ok) return response;
        })
        .then(response => response.json())
        .then(result => result.data)
        .catch(() => window.location.href += '-error')
        return fetchData;
    }

    export default fetchData;
function fetchData(url)
    {
     const fetchData = fetch(url)
        .then(response => {
            if(response.ok) return response;
        })
        .then(response => response.json())
        .then(result => result.data)
        .catch(error => console.log(error));
        return fetchData;
    }

    export default fetchData;
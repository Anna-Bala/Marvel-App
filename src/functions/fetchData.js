//CHANGED from results[0] TO results!!!!!!
function fetchData(url)
    {
     const fetchData = fetch(url)
        .then(response => {
            if(response.ok) return response;
        })
        .then(response => response.json())
        .then(result => result.data.results)
        .catch(error => console.log(error));
        return fetchData;
    }

    export default fetchData;
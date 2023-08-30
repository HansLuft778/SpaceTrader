async function getShipyardInfo() {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('api_key'),
        },
    };

    const result = await fetch('https://api.spacetraders.io/v2/systems/X1-QB20/waypoints/X1-QB20-99657C/shipyard', options)
        .then(response => response.json());

    console.log(result);
}



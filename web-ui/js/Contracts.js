function getContracts() {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer INSERT_TOKEN_HERE'
        },
    };

    fetch('https://api.spacetraders.io/v2/my/contracts', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}
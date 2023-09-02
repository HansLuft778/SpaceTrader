import { ApiResponse, Contract, ShipBought } from "./types/types";

async function getFleet() {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('api_key'),
        },
    };

    let result: ApiResponse<ShipBought> = await fetch('https://api.spacetraders.io/v2/my/ships', options)
        .then(response => response.json());

    console.log(result);
}

getFleet();
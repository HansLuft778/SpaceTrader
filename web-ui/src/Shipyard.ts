import { ShipyardModal } from "./Classes/ModalShipyard";
import type { Shipyard } from "./types/shipTypes";
import type { ApiResponse, ShipBought } from './types/types';

export async function getShipyardInfo(waypointSymbol: string) {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('api_key'),
        },
    };
    const systemSymbol: string = waypointSymbol.split("-")[0] + "-" + waypointSymbol.split("-")[1];

    const result: ApiResponse<Shipyard> = await fetch('https://api.spacetraders.io/v2/systems/' + systemSymbol + '/waypoints/' + waypointSymbol + '/shipyard', options)
        .then(response => response.json());

    console.log(result);
    return result;
}

export async function buyShipFromYard(shipType: string, waypointSymbol: string) {

    console.log("called: buyShipFromYard");
    

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('api_key'),
        },
        body: JSON.stringify({
            shipType: shipType,
            waypointSymbol: waypointSymbol,
        }),
    };

    const result: ApiResponse<ShipBought> = await fetch('https://api.spacetraders.io/v2/my/ships', options)
        .then(response => response.json());

    console.log(result);
    return result;
}

export async function renderModal(parentElement: HTMLLIElement, systemSymbol: string) {

    const shipyardData = await getShipyardInfo(systemSymbol);

    const modal = new ShipyardModal("shipyardModal", "Shipyard", "shipyardModalLabel");
    modal.attachButtonTo(parentElement);
    modal.attachTo(document.getElementById("modalsDiv") as HTMLDivElement);

    modal.renderBody(shipyardData.data);
}


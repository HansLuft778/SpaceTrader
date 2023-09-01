import { ShipyardModal } from "./Classes/ModalShipyard";
import * as t from './types/types'

export async function getShipyardInfo() {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('api_key'),
        },
    };

    const result: t.ApiResponse<t.Shipyard> = await fetch('https://api.spacetraders.io/v2/systems/X1-QB20/waypoints/X1-QB20-99657C/shipyard', options)
        .then(response => response.json());

    console.log(result);

}

export function renderModal(parentElement: HTMLLIElement) {
    const modal = new ShipyardModal("shipyardModal", "Shipyard", "shipyardModalLabel");
    modal.renderModalButtonAndAppendTo(parentElement);
    modal.renderMondalAndAppendTo(document.getElementById("modalsDiv") as HTMLDivElement);
    modal.renderModalBody();

    getShipyardInfo();

}
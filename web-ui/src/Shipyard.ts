import { ShipyardModal } from "./Classes/ModalShipyard";
import type { ApiResponse } from './types/types'
import type { Shipyard, Ship } from "./types/shipTypes";

import { CardGroup } from "./Classes/CardGroup";
import { Card } from "./Classes/Card";

export async function getShipyardInfo() {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('api_key'),
        },
    };

    const result: ApiResponse<Shipyard> = await fetch('https://api.spacetraders.io/v2/systems/X1-QB20/waypoints/X1-QB20-99657C/shipyard', options)
        .then(response => response.json());

    console.log(result);
    return result;
}

export async function renderModal(parentElement: HTMLLIElement) {
    const modal = new ShipyardModal("shipyardModal", "Shipyard", "shipyardModalLabel");
    modal.attachButtonTo(parentElement);
    modal.attachTo(document.getElementById("modalsDiv") as HTMLDivElement);

    const modalBodyDiv = document.getElementById("shipyardModalBody") as HTMLDivElement;

    const cardGroup = new CardGroup();
    cardGroup.attachToParent(modalBodyDiv);;

    const shipyardData = await getShipyardInfo();

    const ships: Ship[] = shipyardData.data.ships;

    ships.forEach(ship => {
        const card = new Card(ship.name, ship.description, "Show more info");
        card.addSubtext("Price: $" + ship.purchasePrice.toString());
        card.addFooterButton("Show more info");
        cardGroup.addCard(card);
    });


    modal.renderModalBody();


}
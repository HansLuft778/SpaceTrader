import { ShipyardModal } from "./Classes/ModalShipyard";
import { ModalShipInfo as ShipInfoModal } from "./Classes/ModalShipInfo";
import type { ApiResponse } from './types/types'
import type { Shipyard, Ship } from "./types/shipTypes";

import { CardGroup } from "./Classes/CardGroup";
import { Card } from "./Classes/Card";

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

export async function renderModal(parentElement: HTMLLIElement, systemSymbol: string) {
    const modal = new ShipyardModal("shipyardModal", "Shipyard", "shipyardModalLabel");
    modal.attachButtonTo(parentElement);
    modal.attachTo(document.getElementById("modalsDiv") as HTMLDivElement);

    const modalBodyDiv = document.getElementById("shipyardModalBody") as HTMLDivElement;

    const cardGroup = new CardGroup();
    cardGroup.attachToParent(modalBodyDiv);;

    const shipyardData = await getShipyardInfo(systemSymbol);

    const ships: Ship[] = shipyardData.data.ships;

    let shipId = 0;
    ships.forEach(ship => {
        const card = new Card(ship.name, ship.description, shipId);
        card.addSubtext("Price: $" + ship.purchasePrice.toString());
        card.addFooterButton("Show more info");
        cardGroup.addCard(card);

        addShipInfoModal(shipId);

        shipId++;
    });
}

function addShipInfoModal(id: number) {
    const modalParent = document.getElementById("modalsDiv") as HTMLDivElement;
                                    // "#shipInfoModal" + this.id
    const modal = new ShipInfoModal("shipInfoModal" + id, "Ship Info", "shipInfoModalLabel" + id);
    modal.attachTo(modalParent);
    modal.renderBody();
}
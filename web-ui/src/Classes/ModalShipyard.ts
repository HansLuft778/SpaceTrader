import { Ship, Shipyard } from '../types/shipTypes';
import { Card } from './Card';
import { CardGroup } from './CardGroup';
import { ShipInfoCard } from './CardShipInfo';
import { Modal } from './Modal';
import { ShipInfoModal } from './ModalShipInfo';

export class ShipyardModal extends Modal {

    // "shipyardModal", "Shipyard", "shipyardModalLabel"
    constructor(id: string, title: string, label: string) {
        super(id, title, label);
    }

    renderBody(shipyardData: Shipyard) {

        const modalBodyDiv = document.getElementById("shipyardModalBody") as HTMLDivElement;

        const cardGroup = new CardGroup();
        cardGroup.attachToParent(modalBodyDiv);;

        const ships: Ship[] = shipyardData.ships;

        let shipId = 0;
        ships.forEach(ship => {
            const card = new ShipInfoCard(ship, shipId);
            card.addSecondarySubtitle("Price: $" + ship.purchasePrice.toString());
            // card.addFooterButton("Show more");
            cardGroup.addCard(card);

            this.addShipInfoModal(shipId, ship);

            shipId++;
        });

    }

    addShipInfoModal(id: number, ship: Ship) {
        const modalParent = document.getElementById("modalsDiv") as HTMLDivElement;
        // "#shipInfoModal" + this.id
        const modal = new ShipInfoModal("shipInfoModal" + id, "Ship Info", "shipInfoModalLabel" + id);
        modal.attachTo(modalParent);
        modal.renderBody();
    }
}

/*
<div class="card-group">
  <div class="card">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
  <div class="card">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
  <div class="card">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
</div>
*/
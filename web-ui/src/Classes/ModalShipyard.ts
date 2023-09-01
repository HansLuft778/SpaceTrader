import { Modal } from './Modal';

export class ShipyardModal extends Modal {

    private shipyardModalBody: HTMLDivElement | null;

    //     "shipyardModal", "Shipyard", "shipyardModalLabel"
    constructor(id: string, title: string, label: string) {
        super(id, title, label);
        this.shipyardModalBody = null;
    }

    renderModalBody() {
        if (this.shipyardModalBody != null) {
            return this.shipyardModalBody;
        }
        this.shipyardModalBody = document.getElementById(this.id + "Body") as HTMLDivElement
        const shipyardModalBodyText = document.createElement("p");
        shipyardModalBodyText.innerHTML = "This is a shipyard.";

        this.shipyardModalBody.appendChild(shipyardModalBodyText);

        return this.shipyardModalBody;
    }
}
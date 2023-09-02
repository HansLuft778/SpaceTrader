import { Ship } from "../types/shipTypes";
import { Card } from "./Card";
import { CardGroup } from "./CardGroup";
import { Modal } from "./Modal";

export class ShipInfoModal extends Modal {

    private ship: Ship;

    private requirements = {
        crew: 0,
        power: 0,
        slots: 0
    };

    constructor(id: string, label: string, ship: Ship) {
        super(id, "Ship info for " + ship.name, label);
        this.id = id;
        this.ship = ship;

        this.getRequirements();
        this.renderBody();
        this.remapCloseButton();
    }

    private renderBody() {

        this.genrateGrid();


    }

    remapCloseButton() {
        // const closeButton = document.getElementById(this.id + "CloseButton") as HTMLButtonElement;
        const closeButton = this.closeButton2;

        closeButton.removeAttribute("data-bs-dismiss");
        closeButton.className = "btn btn-secondary";
        closeButton.innerHTML = "Back";
        closeButton.setAttribute("data-bs-target", "#shipyardModal");
        closeButton.setAttribute("data-bs-toggle", "modal");
    }
    // <button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Back to first</button>

    private getRequirements() {
        // engine: power/crew; frame: power/crew; reactor: crew
        const frame = this.ship.frame.requirements;
        const engine = this.ship.engine.requirements;
        const reactor = this.ship.reactor.requirements;

        if (frame == null && engine == null && reactor == null) {
            return null;
        }

        try {
            this.requirements.crew = (frame.crew ?? 0) + (engine.crew ?? 0) + (reactor.crew ?? 0);
            this.requirements.power = (frame.power ?? 0) + (engine.power ?? 0);
        } catch (error) {
            console.log("requirements error: " + error);
        }
    }

    private genrateGrid() {

        const containerDiv = document.createElement("div");
        containerDiv.className = "container text-center";

        const rowDiv = document.createElement("div");
        rowDiv.className = "row";

        const colDiv = document.createElement("div");
        colDiv.className = "col";
        if (this.requirements.crew > 0) {
            colDiv.innerHTML = "Crew Needed: " + this.requirements.crew;
        } else {
            colDiv.innerHTML = "Crew Needed: nil";
        }

        const colDiv2 = document.createElement("div");
        colDiv2.className = "col";
        if (this.requirements.power > 0) {
            colDiv2.innerHTML = "Power Needed: " + this.requirements.power;
        } else {
            colDiv2.innerHTML = "Power Needed: nil";
        }

        rowDiv.appendChild(colDiv);
        rowDiv.appendChild(colDiv2);

        const rowDiv2 = document.createElement("div");
        rowDiv2.className = "row";

        const colDiv3 = document.createElement("div");
        colDiv3.className = "col";

        // add a cardgroup to the second row
        const cardGroup = new CardGroup();
        cardGroup.attachToParent(colDiv3);

        const frameCard = new Card(this.ship.frame.name, this.ship.frame.description);
        frameCard.addSecondarySubtitle("Crew: " + this.ship.frame.requirements.crew + " - Power: " + this.ship.frame.requirements.power);
        frameCard.addListItemToCard("Module Slots: " + this.ship.frame.moduleSlots);
        frameCard.addListItemToCard("Mounting Points: " + this.ship.frame.mountingPoints);

        const engineCard = new Card(this.ship.engine.name, this.ship.engine.description);
        engineCard.addSecondarySubtitle("Crew: " + this.ship.engine.requirements.crew + " - Power: " + this.ship.engine.requirements.power);
        engineCard.addListItemToCard("Speed: " + this.ship.engine.speed);

        const reactorCard = new Card(this.ship.reactor.name, this.ship.reactor.description);
        reactorCard.addSecondarySubtitle("Crew: " + this.ship.reactor.requirements.crew)
        reactorCard.addListItemToCard("Power Output: " + this.ship.reactor.powerOutput);


        cardGroup.addCard(frameCard);
        cardGroup.addCard(engineCard);
        cardGroup.addCard(reactorCard);


        rowDiv2.appendChild(colDiv3);

        containerDiv.appendChild(rowDiv);
        containerDiv.appendChild(rowDiv2);

        this.modalBodyDiv.appendChild(containerDiv);
    }


}
import { Ship } from "../types/shipTypes";
import { Card } from "./Card";
import { CardGroup } from "./CardGroup";
import { ListCard } from "./ListCard";
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

        const colRow1_1 = document.createElement("div");
        colRow1_1.className = "col";
        if (this.requirements.crew > 0) {
            colRow1_1.innerHTML = "Crew Needed: " + this.requirements.crew;
        } else {
            colRow1_1.innerHTML = "Crew Needed: nil";
        }

        const colRow1_2 = document.createElement("div");
        colRow1_2.className = "col";
        if (this.requirements.power > 0) {
            colRow1_2.innerHTML = "Power Needed: " + this.requirements.power;
        } else {
            colRow1_2.innerHTML = "Power Needed: nil";
        }

        rowDiv.appendChild(colRow1_1);
        rowDiv.appendChild(colRow1_2);

        const rowDiv2 = document.createElement("div");
        rowDiv2.className = "row";

        const colDiv3 = document.createElement("div");
        colDiv3.className = "col";

        // add a cardgroup to the second row
        const cardGroup = new CardGroup();
        cardGroup.attachToParent(colDiv3);

        // frame info
        const frameCard = new Card(this.ship.frame.name, this.ship.frame.description);
        frameCard.addSecondarySubtitle("Crew: " + this.ship.frame.requirements.crew + " - Power: " + this.ship.frame.requirements.power);
        frameCard.addListItemToCard("Module Slots: " + this.ship.frame.moduleSlots);
        frameCard.addListItemToCard("Mounting Points: " + this.ship.frame.mountingPoints);

        // engine info
        const engineCard = new Card(this.ship.engine.name, this.ship.engine.description);
        engineCard.addSecondarySubtitle("Crew: " + this.ship.engine.requirements.crew + " - Power: " + this.ship.engine.requirements.power);
        engineCard.addListItemToCard("Speed: " + this.ship.engine.speed);

        // reactor info
        const reactorCard = new Card(this.ship.reactor.name, this.ship.reactor.description);
        reactorCard.addSecondarySubtitle("Crew: " + this.ship.reactor.requirements.crew)
        reactorCard.addListItemToCard("Power Output: " + this.ship.reactor.powerOutput);


        cardGroup.addCard(frameCard);
        cardGroup.addCard(engineCard);
        cardGroup.addCard(reactorCard);

        // row for modules and mounts
        const rowDiv3 = document.createElement("div");
        rowDiv3.className = "row";
        rowDiv3.style.marginTop = "1rem";

        const colRow3_1 = document.createElement("div");
        colRow3_1.className = "col";

        const colRow3_2 = document.createElement("div");
        colRow3_2.className = "col";

        // modules
        const modulesCard = new Card("Modules", "");

        if (this.ship.modules.length == 0) {
            modulesCard.addListItemToCard("This ship has no installed Modules");
        } else {
            this.ship.modules.forEach(module => {
                const listCard = new ListCard(false);

                listCard.appendListText(module.name + " - " + module.description);

                const type = module.symbol.split("_")[1];
                console.log(type);

                switch (type) {
                    case "CARGO":
                        listCard.appendListText("Cargo Capacity: " + module.capacity);
                        break;
                    case "CREW":
                        listCard.appendListText("Crew Cpacity: " + module.capacity);
                        break;
                    case "MINERAL":
                        break;
                    case "JUMP":
                        listCard.appendListText("Jump Range: " + module.rage);
                        break;
                    case "WARP":
                        listCard.appendListText("Warp Range: " + module.rage);
                        break;
                    default:
                        break;
                }
                console.log(listCard.getCardDiv);

                modulesCard.addElementToCard(listCard.getCardDiv);
            });

            if (this.ship.modules.length < this.ship.frame.moduleSlots) {
                modulesCard.addListItemToCard("Empty Module Slots: " + (this.ship.frame.moduleSlots - this.ship.modules.length));
            }
        }

        // mounts
        const mountsCard = new Card("Mounts", "");

        if (this.ship.mounts.length == 0) {
            mountsCard.addListItemToCard("This ship has no installed Mounts");
        } else {
            this.ship.mounts.forEach(mount => {
                const listCard = new ListCard(false);

                listCard.appendListText(mount.name + " - " + mount.description);
                listCard.appendListText("Strength: " + mount.strength);

                if(mount.deposits != null) {
                    listCard.appendListText("Deposits: " + mount.deposits);
                }

                mountsCard.addElementToCard(listCard.getCardDiv);
            });

            if (this.ship.mounts.length < this.ship.frame.mountingPoints) {
                mountsCard.addListItemToCard("Empty Mounting Points: " + (this.ship.frame.mountingPoints - this.ship.mounts.length));
            }
        }

        colRow3_1.appendChild(modulesCard.getCardDiv);
        colRow3_2.appendChild(mountsCard.getCardDiv);

        rowDiv3.appendChild(colRow3_1);
        rowDiv3.appendChild(colRow3_2);


        rowDiv2.appendChild(colDiv3);

        containerDiv.appendChild(rowDiv);
        containerDiv.appendChild(rowDiv2);
        containerDiv.appendChild(rowDiv3);

        this.modalBodyDiv.appendChild(containerDiv);
    }


}
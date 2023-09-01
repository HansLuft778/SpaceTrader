import { Modal } from "./Modal";



export class ModalShipInfo extends Modal {

    private shipInfoModalBody: HTMLDivElement | null;

    constructor(id: string, title: string, label: string) {
        super(id, title, label);
        this.shipInfoModalBody = null;
        this.id = id;

        this.remapCloseButton();
    }

    renderBody() {
        const pElem = document.createElement("p");
        pElem.innerHTML = "This is a test with id: " + this.id;

        this.shipInfoModalBody = document.getElementById(this.id + "Body") as HTMLDivElement;
        this.shipInfoModalBody.appendChild(pElem);
    }

    remapCloseButton() {
        // const closeButton = document.getElementById(this.id + "CloseButton") as HTMLButtonElement;
        const closeButton = this.closeButton2;
        console.log(this.id + "CloseButton is: " + closeButton);
        
        closeButton.removeAttribute("data-bs-dismiss");
        closeButton.className = "btn btn-secondary";
        closeButton.innerHTML = "Back";
        closeButton.setAttribute("data-bs-target", "#shipyardModal");
        closeButton.setAttribute("data-bs-toggle", "modal");
    }
    // <button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Back to first</button>
}
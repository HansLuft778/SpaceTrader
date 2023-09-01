import { Modal } from './Modal';

export class ShipyardModal extends Modal {

    private shipyardModalBody: HTMLDivElement | null;

    // "shipyardModal", "Shipyard", "shipyardModalLabel"
    constructor(id: string, title: string, label: string) {
        super(id, title, label);
        this.shipyardModalBody = null;
    }

    renderModalBody() {
        if (this.shipyardModalBody != null) {
            return this.shipyardModalBody;
        }
        this.shipyardModalBody = document.getElementById(this.id + "Body") as HTMLDivElement
        const shipyardMainDiv = document.createElement("div");
        shipyardMainDiv.id = "shipyardMainDiv";

        this.shipyardModalBody.appendChild(shipyardMainDiv);

        return this.shipyardModalBody;
    }

    addElementToModalBody(element: HTMLElement) {
        const modalBody = this.renderModalBody();
        modalBody.appendChild(element);
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
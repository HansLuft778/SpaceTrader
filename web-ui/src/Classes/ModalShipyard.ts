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
        const shipyardMainDIv = document.createElement("div");

        const cardGroup = document.createElement("div");
        cardGroup.className = "card-group";

        const card1 = document.createElement("div");
        card1.className = "card";

        const card1Img = document.createElement("img");
        card1Img.src = "https://via.placeholder.com/150";
        card1Img.className = "card-img-top";
        card1Img.alt = "Ship Image";

        const card1Body = document.createElement("div");
        card1Body.className = "card-body";

        const card1Title = document.createElement("h5");
        card1Title.className = "card-title";
        card1Title.innerHTML = "Ship Name";

        const card1Text = document.createElement("p");
        card1Text.className = "card-text";
        card1Text.innerHTML = "Ship Description";

        const card1Text2 = document.createElement("p");
        card1Text2.className = "card-text";
        
        




        this.shipyardModalBody.appendChild(shipyardMainDIv);

        return this.shipyardModalBody;
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
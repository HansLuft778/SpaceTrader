import { Ship } from "../types/shipTypes";
import { Card } from "./Card";
import Swal from "sweetalert2";

export class ShipInfoCard extends Card {

    private id: number;
    private shipData: Ship;

    constructor(shipData: Ship, id: number) {
        super(shipData.name, shipData.description);

        this.id = id;
        this.shipData = shipData;

        this.addFooterButton();
    }

    addFooterButton() {
        const cardFooter = document.createElement("div");
        cardFooter.className = "card-footer";

        const buttonsDiv = document.createElement("div");
        buttonsDiv.className = "d-grid gap-2 d-md-flex justify-content-md-center";

        // info button
        const cardButton = document.createElement("button");
        cardButton.className = "btn btn-primary";
        cardButton.setAttribute("data-bs-target", "#shipInfoModal" + this.id);
        cardButton.setAttribute("data-bs-toggle", "modal");
        cardButton.innerHTML = "Show more";

        // buy button
        const buyButton = document.createElement("button");
        buyButton.className = "btn btn-danger";
        buyButton.setAttribute("type", "button");
        buyButton.innerHTML = "Buy";
        buyButton.addEventListener("click", () => {
            console.log("buying ship with id: " + this.id);
            Swal.fire({
                title: 'Are you sure you want to buy this ship for ' + this.shipData.purchasePrice.toLocaleString() + '?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, buy it for ' + this.shipData.purchasePrice.toLocaleString() + '!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Purchase Successful!',
                        'You have successfully purchased the ' + this.shipData.name + '!',
                        'success'
                    )
                }
            })
        });

        buttonsDiv.appendChild(cardButton);
        buttonsDiv.appendChild(buyButton);

        cardFooter.appendChild(buttonsDiv);

        this.cardDiv.appendChild(cardFooter);
    }
}
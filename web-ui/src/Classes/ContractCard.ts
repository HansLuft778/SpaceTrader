import { Contract } from "../types/types";

export class Card {

    private contract: Contract;

    constructor(contract: Contract) {
        this.contract = contract;
    }

    renderCardAndAppendTo(parentDiv: HTMLDivElement) {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.setAttribute("style", "width: 18rem; margin-top: 10px;")

        const cardBodyDiv = document.createElement("div");
        cardBodyDiv.className = "card-body";

        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.innerHTML = this.contract.type;

        const cardSubtitleSec = document.createElement("h6");
        cardSubtitleSec.className = "card-subtitle mb-2 text-body-secondary";
        var date = new Date(this.contract.terms.deadline);
        cardSubtitleSec.innerHTML = date.toLocaleString("de-DE");

        const cardSubtitleSec2 = document.createElement("h6");
        cardSubtitleSec2.className = "card-subtitle mb-2 text-body-secondary";
        const pay = this.contract.terms.payment.onAccepted + this.contract.terms.payment.onFulfilled;;
        cardSubtitleSec2.innerHTML = "Payment: $" + pay;

        const cardSubtitleTer = document.createElement("h6");
        cardSubtitleTer.className = "card-subtitle mb-2 text-body-tertiary";
        cardSubtitleTer.innerHTML = this.contract.id;

        const cardText = document.createElement("p");
        cardText.className = "card-text";
        const deliver = this.contract.terms.deliver[0];
        cardText.innerHTML = "Deliver " + deliver.unitsRequired + " " + deliver.tradeSymbol + " to " + deliver.destinationSymbol;

        const acceptButton = document.createElement("button");
        acceptButton.className = this.contract.accepted ? "btn btn-success disabled" : "btn btn-primary";
        acceptButton.innerHTML = this.contract.accepted ? "Accepted" : "Accept";

        cardBodyDiv.appendChild(cardTitle);
        cardBodyDiv.appendChild(cardSubtitleSec);
        cardBodyDiv.appendChild(cardSubtitleSec2);
        cardBodyDiv.appendChild(cardSubtitleTer);
        cardBodyDiv.appendChild(cardText);
        cardBodyDiv.appendChild(acceptButton);

        cardDiv.appendChild(cardBodyDiv);
        parentDiv.appendChild(cardDiv);

        return cardDiv;
    }
}
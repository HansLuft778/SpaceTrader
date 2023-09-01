import { Contract } from "../types/types";
import { Card } from "./Card";

export class ContractCard extends Card {

    private contract: Contract;

    constructor(contract: Contract) {
        super(contract.type, "Deliver:", contract.accepted ? "Accepted" : "Accept");

        this.contract = contract;

        this.updateCard();
    }

    updateCard() {
        this.cardDiv.setAttribute("style", "width: 18rem; margin-top: 10px;")
        const date = new Date(this.contract.terms.deadline);
        this.addSecondarySubtitle(date.toLocaleString("de-DE"));
        const rewad = this.contract.terms.payment.onAccepted + this.contract.terms.payment.onFulfilled;
        this.addSecondarySubtitle("Reward: $" + rewad.toLocaleString());
        this.addTertiarySubtitle(this.contract.id)

        this.contract.terms.deliver.forEach(derlivery => {
            this.addListItemToCard("<span>" + derlivery.unitsRequired + " " + derlivery.tradeSymbol
                + " to </span><a style=\"white-space: nowrap;\" href=\"./waypoint.html?waypointSymbol=" + derlivery.destinationSymbol + "\">"
                + derlivery.destinationSymbol + "</a>");
        });

        const cardText = this.cardDiv.getElementsByClassName("card-text")[0] as HTMLDivElement;
        cardText.setAttribute("style", "margin-bottom: 0px;");
        cardText.className = "card-text fw-semibold";



        const acceptButton = this.cardButton as HTMLButtonElement;
        acceptButton.className = this.contract.accepted ? "btn btn-success disabled" : "btn btn-primary";
        acceptButton.innerHTML = this.contract.accepted ? "Accepted" : "Accept";
    }

    appendTo(parentDiv: HTMLElement) {
        parentDiv.appendChild(this.cardDiv);
    }

    addEventHandler(handler: (contractID: string, button: HTMLButtonElement) => void) {
        const acceptButton = this.cardButton as HTMLButtonElement;
        acceptButton.addEventListener("click", () => {
            handler(this.contract.id, acceptButton);
        });
    }
}
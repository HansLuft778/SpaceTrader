import { Contract } from "../types/types";
import { Card } from "./Card";

export class ContractCard extends Card {

    private contract: Contract;

    constructor(contract: Contract) {
        super(contract.type, "Deliver " + contract.terms.deliver[0].unitsRequired.toLocaleString() + " " + contract.terms.deliver[0].tradeSymbol + " to " + contract.terms.deliver[0].destinationSymbol, contract.accepted ? "Accepted" : "Accept");

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
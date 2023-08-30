export class AgentCard {
    constructor(agent) {
        this.agent = agent;
    }

    /*
    <div class="card" style="width: 18rem;">
        <ul class="list-group list-group-flush">
            <li class="list-group-item">An item</li>
            <li class="list-group-item">A second item</li>
            <li class="list-group-item">A third item</li>
        </ul>
    </div>
    */

    renderCard(parentDiv) {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.setAttribute("style", "width: 18rem; margin-top: 10px;")

        const listGroup = document.createElement("ul");
        listGroup.className = "list-group list-group-flush"

        const listGroupItem = document.createElement("li");
        listGroupItem.className = "list-group-item"
        listGroupItem.innerHTML = this.contract.type;

        const cardSubtitleSec = document.createElement("h6");
        cardSubtitleSec.className = "card-subtitle mb-2 text-body-secondary";
        var date = new Date(this.contract.expiration);
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

        listGroup.appendChild(listGroupItem);
        listGroup.appendChild(cardSubtitleSec);
        listGroup.appendChild(cardSubtitleSec2);
        listGroup.appendChild(cardSubtitleTer);
        listGroup.appendChild(cardText);
        listGroup.appendChild(acceptButton);

        cardDiv.appendChild(listGroup);
        parentDiv.appendChild(cardDiv);

        return cardDiv;
    }
}
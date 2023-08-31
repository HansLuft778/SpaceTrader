"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCard = void 0;
class ListCard {
    constructor(footer) {
        this.listGroup = document.createElement("ul");
        this.footer = footer;
    }
    renderCardAndAppendTo(parentDiv) {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.setAttribute("style", "margin-top: 10px;");
        this.listGroup = document.createElement("ul");
        this.listGroup.className = "list-group list-group-flush";
        cardDiv.appendChild(this.listGroup);
        if (this.footer) {
            const cardFooter = document.createElement("div");
            cardFooter.className = "card-footer";
            const cardFooterText = document.createElement("small");
            cardFooterText.className = "text-body-secondary";
            cardFooterText.innerHTML = "Last updated 3 mins ago";
            cardFooter.appendChild(cardFooterText);
            cardDiv.appendChild(cardFooter);
        }
        parentDiv.appendChild(cardDiv);
        return cardDiv;
    }
    appendListText(text) {
        const listElement = document.createElement("li");
        listElement.className = "list-group-item";
        listElement.innerHTML = text;
        this.listGroup.appendChild(listElement);
    }
    appendListElement(element) {
        const listElement = document.createElement("li");
        listElement.className = "list-group-item";
        listElement.appendChild(element);
        this.listGroup.appendChild(listElement);
    }
}
exports.ListCard = ListCard;
//# sourceMappingURL=ListCard.js.map
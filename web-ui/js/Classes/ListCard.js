export class ListCard {

    #listGroup;

    constructor(footer) {
        this.#listGroup = document.createElement("ul");
        this.footer = footer;
    }

    renderCard(parentDiv) {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.setAttribute("style", "margin-top: 10px;")

        this.#listGroup = document.createElement("ul");
        this.#listGroup.className = "list-group list-group-flush"
        
        cardDiv.appendChild(this.#listGroup);

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

    appendListElement(text) {
        const listElement = document.createElement("li");
        listElement.className = "list-group-item";
        listElement.innerHTML = text;
        this.#listGroup.appendChild(listElement);
    }
}


/*
<div class="card" style="width: 18rem;">
    <ul class="list-group list-group-flush">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
    </ul>
    <div class="card-footer">
      <small class="text-body-secondary">Last updated 3 mins ago</small>
    </div>
</div>
*/
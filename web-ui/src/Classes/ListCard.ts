export class ListCard {

    private cardDiv: HTMLDivElement;

    private listGroup: HTMLUListElement;
    private footer: boolean;

    constructor(footer: boolean) {
        this.cardDiv = document.createElement("div");
        this.listGroup = document.createElement("ul");
        this.footer = footer;

        this.renderCard();
    }

    renderCard() {
        this.cardDiv.className = "card";
        this.cardDiv.setAttribute("style", "margin-top: 10px;")

        this.listGroup = document.createElement("ul");
        this.listGroup.className = "list-group list-group-flush"

        this.cardDiv.appendChild(this.listGroup);

        if (this.footer) {
            const cardFooter = document.createElement("div");
            cardFooter.className = "card-footer";

            const cardFooterText = document.createElement("small");
            cardFooterText.className = "text-body-secondary";
            cardFooterText.innerHTML = "Last updated 3 mins ago";

            cardFooter.appendChild(cardFooterText);
            this.cardDiv.appendChild(cardFooter);
        }
    }

    appendTo(parentDiv: HTMLDivElement) {
        parentDiv.appendChild(this.cardDiv);
        return this.cardDiv;
    }

    appendListText(text: string, clickable: boolean = false, onClick: Function = Function) {
        const listElement = document.createElement("li");
        listElement.className = "list-group-item";
        listElement.innerHTML = text;
        if (clickable) {
            listElement.setAttribute("style", "cursor: pointer;");
            listElement.addEventListener("click", () => {
                onClick();
            });
        }
        this.listGroup.appendChild(listElement);
    }

    appendListElement(element: HTMLElement) {
        const listElement = document.createElement("li");
        listElement.className = "list-group-item";
        listElement.appendChild(element);
        this.listGroup.appendChild(listElement);
    }

    get getCardDiv(): HTMLDivElement {
        return this.cardDiv;
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
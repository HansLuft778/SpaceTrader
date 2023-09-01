export class ListCard {

    private listGroup: HTMLUListElement;
    private footer: boolean;

    constructor(footer: boolean) {
        this.listGroup = document.createElement("ul");
        this.footer = footer;
    }

    renderCardAndAppendTo(parentDiv: HTMLDivElement) {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.setAttribute("style", "margin-top: 10px;")

        this.listGroup = document.createElement("ul");
        this.listGroup.className = "list-group list-group-flush"

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
export class Card {

    protected cardDiv: HTMLElement;
    protected cardButton: HTMLButtonElement | null = null;
    protected cardBody: HTMLDivElement;
    private parentDiv: HTMLElement | null;
    private listGroup: HTMLUListElement | null = null;


    private title: string;
    private description: string;
    private buttonText: string | undefined = undefined;

    constructor(title: string, description: string, buttonText?: string) {
        this.cardDiv = document.createElement("div");
        this.cardDiv.className = "card";
        if (buttonText != undefined) {
            this.buttonText = buttonText;
        }
        this.cardBody = document.createElement("div");
        this.parentDiv = null;


        this.title = title;
        this.description = description;


        this.renderCard()
    }

    renderCard() {
        this.cardBody = document.createElement("div");
        this.cardBody.className = "card-body";

        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.innerHTML = this.title;

        const cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.innerHTML = this.description;

        this.cardBody.appendChild(cardTitle);
        this.cardBody.appendChild(cardText);

        if (this.buttonText != undefined) {
            console.log("adding button");
            this.cardButton = document.createElement("button");
            this.cardButton.className = "btn btn-primary";
            this.cardButton.innerHTML = this.buttonText;
            this.cardBody.appendChild(this.cardButton);
        }

        this.cardDiv.appendChild(this.cardBody);
    }

    addSecondarySubtitle(subtext: string) {
        const cardSubtext = document.createElement("h6");
        cardSubtext.className = "card-subtitle mb-2 text-body-secondary";
        cardSubtext.innerHTML = subtext;

        const cardBody = this.cardDiv.getElementsByClassName("card-body")[0] as HTMLDivElement;
        cardBody.insertBefore(cardSubtext, cardBody.getElementsByClassName("card-text")[0]);
    }

    addTertiarySubtitle(subtext: string) {
        const cardSubtext = document.createElement("h6");
        cardSubtext.className = "card-subtitle mb-2 text-body-tertiary";
        cardSubtext.innerHTML = subtext;

        // append this after the last secondary subtitle
        const cardBody = this.cardDiv.getElementsByClassName("card-body")[0] as HTMLDivElement;
        cardBody.insertBefore(cardSubtext, cardBody.getElementsByClassName("card-text")[0]);
    }

    attachToParent(parentDiv: HTMLElement) {
        this.parentDiv = parentDiv;
        this.parentDiv.appendChild(this.cardDiv);
        return this.cardDiv;
    }

    /**
     * returns the existing list group or creates a new one if it doesn't exist
     * @returns the list group element
     */
    private getListBody() {
        if (this.listGroup != null) {
            return this.listGroup;
        }

        this.listGroup = document.createElement("ul");
        this.listGroup.className = "list-group list-group-flush";

        this.cardBody.insertBefore(this.listGroup, this.cardButton);
        console.log("created list group");
        
        return this.listGroup;
    }

    addListItemToCard(text: string) {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.innerHTML = text;

        this.getListBody().appendChild(listItem);
    }

    addImageToCard(imageSrc: string) {
        const cardImg = document.createElement("img");
        cardImg.src = imageSrc;

        this.cardDiv.insertBefore(cardImg, this.cardDiv.firstChild);
    }

    public get getCardDiv(): HTMLDivElement {
        return this.cardDiv as HTMLDivElement;
    }
}

/**
<div class="card" style="width: 18rem;">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
</div>
 */
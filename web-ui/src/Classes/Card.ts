import Swal from "sweetalert2";

export class Card {

    protected cardDiv: HTMLElement;
    private parentDiv: HTMLElement | null;

    private title: string;
    private description: string;
    private buttonText: string | undefined = undefined;

    constructor(title: string, description: string, buttonText?: string) {
        this.cardDiv = document.createElement("div");
        this.cardDiv.className = "card";

        this.title = title;
        this.description = description;
        if (buttonText != undefined) {
            this.buttonText = buttonText;
        }

        this.parentDiv = null;

        this.renderCard()
    }

    renderCard() {
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.innerHTML = this.title;

        const cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.innerHTML = this.description;

        if (this.buttonText != null && this.buttonText != undefined) {
            const cardButton = document.createElement("button");
            cardButton.className = "btn btn-primary";
            cardButton.innerHTML = this.buttonText;
            cardBody.appendChild(cardButton);
        }

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);

        this.cardDiv.appendChild(cardBody);
    }

    addSubtext(subtext: string) {
        const cardSubtext = document.createElement("small");
        cardSubtext.className = "card-subtitle mb-2 text-body-secondary";
        cardSubtext.innerHTML = subtext;

        const cardBody = this.cardDiv.getElementsByClassName("card-body")[0] as HTMLDivElement;
        cardBody.insertBefore(cardSubtext, cardBody.getElementsByClassName("card-text")[0]);
    }

    attachToParent(parentDiv: HTMLElement) {
        this.parentDiv = parentDiv;
        this.parentDiv.appendChild(this.cardDiv);
        return this.cardDiv;
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
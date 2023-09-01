class Card {

    private cardDiv: HTMLElement;

    constructor() {
        this.cardDiv = document.createElement("div");
        this.cardDiv.className = "card";
    }
    renderCardAndAppendTo(parentDiv: HTMLElement) {
        

        return this.cardDiv;
    }

    addImageToCard(cardDiv: HTMLElement, imageSrc: string) {
}
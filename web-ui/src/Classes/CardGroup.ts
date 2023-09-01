import { Card } from "./Card";

export class CardGroup {

    private cardGroupDiv: HTMLElement | null = null;
    private cards: Card[] = [];

    constructor() {
        this.cardGroupDiv = document.createElement("div");
        this.cardGroupDiv.className = "card-group";
    }

    attachToParent(parentDiv: HTMLElement) {
        if (this.cardGroupDiv == null) {
            return;
        }

        parentDiv.appendChild(this.cardGroupDiv);
        return this.cardGroupDiv;
    }

    addCardDefault(title: string, description: string, buttonText?: string) {
        if (this.cardGroupDiv == null) {
            return;
        }

        const card = new Card(title, description, undefined, buttonText);
        const cardDiv = card.attachToParent(this.cardGroupDiv);

        this.cards.push(card);
        this.cardGroupDiv.appendChild(cardDiv);
    }

    addCard(card: Card) {
        if (this.cardGroupDiv == null) {
            return;
        }

        this.cards.push(card);
        this.cardGroupDiv.appendChild(card.cardMainDiv);
    }
}
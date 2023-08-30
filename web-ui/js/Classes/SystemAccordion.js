import { ListCard } from "./ListCard.js";

export class SystemAccordion {

    #accordionDiv;

    constructor() {
    }

    renderAccordion(parentDiv) {
        this.#accordionDiv = document.createElement("div");
        this.#accordionDiv.className = "accordion";
        this.#accordionDiv.id = "systemAccordion";

        parentDiv.appendChild(this.#accordionDiv);
    }

    appendAccordionItem(system) {
        const accordionItem = document.createElement("div");
        accordionItem.className = "accordion-item";

        const accordionHeader = document.createElement("h2");
        accordionHeader.className = "accordion-header";

        const accordionButton = document.createElement("button");
        accordionButton.className = "accordion-button";
        accordionButton.type = "button";
        accordionButton.setAttribute("data-bs-toggle", "collapse");
        accordionButton.setAttribute("data-bs-target", "#collapse" + system.symbol);
        accordionButton.setAttribute("aria-expanded", "true");
        accordionButton.setAttribute("aria-controls", "collapse" + system.symbol);
        accordionButton.innerHTML = system.symbol;

        accordionHeader.appendChild(accordionButton);
        accordionItem.appendChild(accordionHeader);

        const accordionCollapse = document.createElement("div");
        accordionCollapse.id = "collapse" + system.symbol;
        accordionCollapse.className = "accordion-collapse collapse";
        accordionCollapse.setAttribute("aria-labelledby", "heading" + system.symbol);
        accordionCollapse.setAttribute("data-bs-parent", "#systemAccordion");

        const accordionBody = document.createElement("div");
        accordionBody.className = "accordion-body";

        const listCard = new ListCard(false);
        listCard.renderCard(accordionBody);
        listCard.appendListElement("Type: " + system.type);
        const traits = system.traits;

        traits.forEach(trait => {
            
        });

        listCard.appendListElement("Traits: " + system.location);

        accordionCollapse.appendChild(accordionBody);
        accordionItem.appendChild(accordionCollapse);
        this.#accordionDiv.appendChild(accordionItem);
    }
}

/**
 * HTML like with one item:
<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      </div>
    </div>
  </div>
</div>
 */

export class SystemAccordion {

    #accordionDiv;

    constructor() {
    }

    renderAccordionAndAppendTo(parentDiv) {
        this.#accordionDiv = document.createElement("div");
        this.#accordionDiv.className = "accordion";
        this.#accordionDiv.id = "systemAccordion";

        parentDiv.appendChild(this.#accordionDiv);
    }

    appendAccordionItem(waypoint) {
        const accordionItem = document.createElement("div");
        accordionItem.className = "accordion-item";

        const accordionHeader = document.createElement("h2");
        accordionHeader.className = "accordion-header";

        const accordionButton = document.createElement("button");
        accordionButton.id = "accordionButton" + waypoint.symbol;
        accordionButton.className = "accordion-button";
        accordionButton.type = "button";
        accordionButton.setAttribute("data-bs-toggle", "collapse");
        accordionButton.setAttribute("data-bs-target", "#collapse" + waypoint.symbol);
        accordionButton.setAttribute("aria-expanded", "true");
        accordionButton.setAttribute("aria-controls", "collapse" + waypoint.symbol);
        accordionButton.innerHTML = "🪐" + waypoint.symbol; // THIS NEEDS TO HAVE MARGIN LEFT + emote

        accordionHeader.appendChild(accordionButton);
        accordionItem.appendChild(accordionHeader);

        const accordionCollapse = document.createElement("div");
        accordionCollapse.id = "collapse" + waypoint.symbol;
        accordionCollapse.className = "accordion-collapse collapse";
        accordionCollapse.setAttribute("aria-labelledby", "heading" + waypoint.symbol);
        accordionCollapse.setAttribute("data-bs-parent", "#systemAccordion");

        const accordionBody = document.createElement("div");
        accordionBody.className = "accordion-body";

        accordionCollapse.appendChild(accordionBody);
        accordionItem.appendChild(accordionCollapse);
        this.#accordionDiv.appendChild(accordionItem);

        return accordionItem;
    }
}

/**
 * HTML like with one item:
<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        <Card>
            <h5 class="card-title">Card title</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">An item</li>
                <li class="list-group-item">A second item</li>
                <li class="list-group-item">A third item</li>
                <li class="list-group-item">A fourth item</li>
                <li class="list-group-item">And a fifth one</li>
            </ul>
        </Card>
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      </div>
    </div>
  </div>
</div>
 */



"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemAccordion = void 0;
class SystemAccordion {
    constructor() {
        this.accordionDiv = document.createElement("div");
    }
    renderAccordionAndAppendTo(parentDiv) {
        this.accordionDiv = document.createElement("div");
        this.accordionDiv.className = "accordion";
        this.accordionDiv.id = "systemAccordion";
        parentDiv.appendChild(this.accordionDiv);
    }
    appendAccordionItem(id) {
        const accordionItem = document.createElement("div");
        accordionItem.className = "accordion-item";
        const accordionHeader = document.createElement("h2");
        accordionHeader.className = "accordion-header";
        const accordionButton = document.createElement("button");
        accordionButton.id = "accordionButton" + id;
        accordionButton.className = "accordion-button";
        accordionButton.type = "button";
        accordionButton.setAttribute("data-bs-toggle", "collapse");
        accordionButton.setAttribute("data-bs-target", "#collapse" + id);
        accordionButton.setAttribute("aria-expanded", "true");
        accordionButton.setAttribute("aria-controls", "collapse" + id);
        accordionButton.innerHTML = "🪐" + id;
        accordionHeader.appendChild(accordionButton);
        accordionItem.appendChild(accordionHeader);
        const accordionCollapse = document.createElement("div");
        accordionCollapse.id = "collapse" + id;
        accordionCollapse.className = "accordion-collapse collapse";
        accordionCollapse.setAttribute("aria-labelledby", "heading" + id);
        accordionCollapse.setAttribute("data-bs-parent", "#systemAccordion");
        const accordionBody = document.createElement("div");
        accordionBody.className = "accordion-body";
        accordionCollapse.appendChild(accordionBody);
        accordionItem.appendChild(accordionCollapse);
        this.accordionDiv.appendChild(accordionItem);
        return accordionItem;
    }
}
exports.SystemAccordion = SystemAccordion;
//# sourceMappingURL=SystemAccordion.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
class Modal {
    constructor(id, title, label) {
        this.id = id;
        this.title = title;
        this.label = label;
    }
    renderMondalAndAppendTo(parentDiv) {
        const modalDiv = document.createElement("div");
        modalDiv.className = "modal fade";
        modalDiv.setAttribute("id", this.id);
        modalDiv.setAttribute("tabindex", "-1");
        modalDiv.setAttribute("aria-labelledby", this.label);
        modalDiv.setAttribute("aria-hidden", "true");
        const modalDialogDiv = document.createElement("div");
        modalDialogDiv.className = "modal-dialog modal-dialog-centered modal-lg";
        const modalContentDiv = document.createElement("div");
        modalContentDiv.className = "modal-content";
        const modalHeaderDiv = document.createElement("div");
        modalHeaderDiv.className = "modal-header";
        const modalTitle = document.createElement("h1");
        modalTitle.className = "modal-title fs-5";
        modalTitle.setAttribute("id", this.label);
        modalTitle.innerHTML = this.title;
        const modalCloseButton = document.createElement("button");
        modalCloseButton.className = "btn-close";
        modalCloseButton.setAttribute("type", "button");
        modalCloseButton.setAttribute("data-bs-dismiss", "modal");
        modalCloseButton.setAttribute("aria-label", "Close");
        modalHeaderDiv.appendChild(modalTitle);
        modalHeaderDiv.appendChild(modalCloseButton);
        const modalBodyDiv = document.createElement("div");
        modalBodyDiv.className = "modal-body";
        const modalFooterDiv = document.createElement("div");
        modalFooterDiv.className = "modal-footer";
        const modalCloseButton2 = document.createElement("button");
        modalCloseButton2.className = "btn btn-primary";
        modalCloseButton2.setAttribute("type", "button");
        modalCloseButton2.setAttribute("data-bs-dismiss", "modal");
        modalCloseButton2.innerHTML = "Close";
        modalFooterDiv.appendChild(modalCloseButton2);
        modalContentDiv.appendChild(modalHeaderDiv);
        modalContentDiv.appendChild(modalBodyDiv);
        modalContentDiv.appendChild(modalFooterDiv);
        modalDialogDiv.appendChild(modalContentDiv);
        modalDiv.appendChild(modalDialogDiv);
        parentDiv.appendChild(modalDiv);
        return modalDiv;
    }
}
exports.Modal = Modal;
//# sourceMappingURL=Modal.js.map
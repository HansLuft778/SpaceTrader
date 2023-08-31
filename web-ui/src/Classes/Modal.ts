export class Modal {

    private id: string;
    private title: string;
    private label: string;

    constructor(id: string, title: string, label: string) {
        this.id = id;
        this.title = title;
        this.label = label;
    }

    renderMondalAndAppendTo(parentDiv: HTMLDivElement) {
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


/**
    <div class="modal fade" id="shipyardModal" tabindex="-1" aria-labelledby="shipyardModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="shipyardModalLabel">Shipyard</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
 */
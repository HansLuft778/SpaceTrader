export class Modal {

    protected id: string;
    private title: string;
    private label: string;

    private modalDiv: HTMLDivElement | null = null;
    private modalLaunchButton: HTMLButtonElement | null = null;
    private modalCloseButton2: HTMLButtonElement;

    constructor(id: string, title: string, label: string) {
        this.id = id;
        this.title = title;
        this.label = label;

        this.modalCloseButton2 = document.createElement("button");

        this.renderModalButton();
        this.renderMondal();
    }

    renderModalButton() {
        this.modalLaunchButton = document.createElement("button");
        this.modalLaunchButton.type = "button";
        this.modalLaunchButton.innerHTML = "Visit";
        this.modalLaunchButton.className = "btn btn-primary";
        this.modalLaunchButton.setAttribute("style", "--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem; margin-left: 10px");
        this.modalLaunchButton.setAttribute("data-bs-toggle", "modal");
        this.modalLaunchButton.setAttribute("data-bs-target", "#shipyardModal");
    }

    attachButtonTo(parentDiv: HTMLElement) {
        if (this.modalLaunchButton == null) {
            return;
        }

        parentDiv.appendChild(this.modalLaunchButton);
        return this.modalLaunchButton;
    }

    attachTo(parentDiv: HTMLElement) {
        if (this.modalDiv == null) {
            return;
        }

        parentDiv.appendChild(this.modalDiv);
        return this.modalDiv;
    }

    renderMondal() {
        this.modalDiv = document.createElement("div");
        this.modalDiv.className = "modal fade";
        this.modalDiv.setAttribute("id", this.id);
        this.modalDiv.setAttribute("tabindex", "-1");
        this.modalDiv.setAttribute("aria-labelledby", this.label);
        this.modalDiv.setAttribute("aria-hidden", "true");

        const modalDialogDiv = document.createElement("div");
        modalDialogDiv.className = "modal-dialog modal-dialog-centered modal-xl";

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
        modalBodyDiv.id = this.id + "Body";

        const modalFooterDiv = document.createElement("div");
        modalFooterDiv.className = "modal-footer";
        console.log(this.id + "CloseButton");
        
        // this.modalCloseButton2 = document.createElement("button");
        this.modalCloseButton2.id = this.id + "CloseButton";
        this.modalCloseButton2.className = "btn btn-secondary";
        this.modalCloseButton2.setAttribute("type", "button");
        this.modalCloseButton2.setAttribute("data-bs-dismiss", "modal");
        this.modalCloseButton2.innerHTML = "Close";

        modalFooterDiv.appendChild(this.modalCloseButton2);

        modalContentDiv.appendChild(modalHeaderDiv);
        modalContentDiv.appendChild(modalBodyDiv);
        modalContentDiv.appendChild(modalFooterDiv);

        modalDialogDiv.appendChild(modalContentDiv);

        this.modalDiv.appendChild(modalDialogDiv);

        return this.modalDiv;
    }

    
    public get closeButton2() : HTMLButtonElement{
        return this.modalCloseButton2;
    }
    
}


/**
    <div class="modal fade" id="shipyardModal" tabindex="-1" aria-labelledby="shipyardModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
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
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SystemAccordion_1 = require("./Classes/SystemAccordion");
const ListCard_1 = require("./Classes/ListCard");
const Modal_1 = require("./Classes/Modal");
const swInfoInput = document.getElementById('SWInfoInput');
swInfoInput.addEventListener('keypress', function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        const value = swInfoInput.value;
        console.log(value);
        const regex = /^[a-zA-Z0-9]+-[a-zA-Z0-9]+(-[a-zA-Z0-9]+)?$/;
        if (!regex.test(value)) {
            return;
        }
        const systemSymbol = value.split("-")[0] + "-" + value.split("-")[1];
        console.log("systemSymbol " + systemSymbol);
        console.log("waypointSymbol " + value);
        getSystemInfo(systemSymbol);
    }
});
function getSystemInfo(systemSymbol) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("api_key")
            },
        };
        const result = yield fetch('https://api.spacetraders.io/v2/systems/' + systemSymbol + '/waypoints', options)
            .then(response => response.json());
        console.log(result);
        if (result.error) {
            return;
        }
        else {
            displaySystemInfo(result);
        }
    });
}
function displaySystemInfo(response) {
    const systemWaypointList = response.data;
    const systemAccordion = new SystemAccordion_1.SystemAccordion();
    const systemInfoDiv = document.getElementById("SWInfoDiv");
    while (systemInfoDiv.firstChild) {
        systemInfoDiv.removeChild(systemInfoDiv.firstChild);
    }
    systemAccordion.renderAccordionAndAppendTo(systemInfoDiv);
    let orbitals = [];
    systemWaypointList.forEach(waypoint => {
        const accordionItem = systemAccordion.appendAccordionItem(waypoint.symbol);
        if (orbitals.includes(waypoint.symbol)) {
            const accordionButton = document.getElementById("accordionButton" + waypoint.symbol);
            accordionButton.innerHTML = "";
            const symbolSpan = document.createElement("span");
            symbolSpan.innerHTML = "🛰️" + waypoint.symbol;
            symbolSpan.setAttribute("style", "margin-left: 20px;");
            accordionButton.appendChild(symbolSpan);
        }
        if (waypoint.orbitals.length > 0) {
            console.log("orbitals found");
            orbitals = waypoint.orbitals.map((orbital) => orbital.symbol);
            console.log(orbitals);
        }
        const listCard = new ListCard_1.ListCard(false);
        const accordionBody = accordionItem.getElementsByClassName("accordion-body")[0];
        listCard.renderCardAndAppendTo(accordionBody);
        listCard.appendListText("Type: " + waypoint.type);
        const traits = waypoint.traits;
        if (traits.length > 0) {
            listCard.appendListText("Traits:");
            const listGroup = document.createElement("ul");
            listGroup.className = "list-group list-group-flush";
            traits.forEach((trait) => {
                const listElement = document.createElement("li");
                listElement.className = "list-group-item d-flex align-items-center justify-content-center";
                listElement.innerHTML = trait.name;
                if (trait.name == "Shipyard") {
                    const modalLaunchButton = document.createElement("button");
                    modalLaunchButton.type = "button";
                    modalLaunchButton.innerHTML = "Visit";
                    modalLaunchButton.className = "btn btn-primary";
                    modalLaunchButton.setAttribute("style", "--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem; margin-left: 10px");
                    modalLaunchButton.setAttribute("data-bs-toggle", "modal");
                    modalLaunchButton.setAttribute("data-bs-target", "#shipyardModal");
                    const modal = new Modal_1.Modal("shipyardModal", "Shipyard", "shipyardModalLabel");
                    modal.renderMondalAndAppendTo(document.getElementById("modalsDiv"));
                    listElement.appendChild(modalLaunchButton);
                }
                listGroup.appendChild(listElement);
            });
            listCard.appendListElement(listGroup);
        }
        listCard.appendListText("Location: " + waypoint.x + ", " + waypoint.y);
    });
}
function displayWaypointInfo(response) {
    console.log("displayWaypointInfo");
}
//# sourceMappingURL=Waypoint.js.map
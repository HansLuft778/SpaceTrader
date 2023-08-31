import { SystemAccordion } from "./Classes/SystemAccordion.js";
import { ListCard } from "./Classes/ListCard.js";
import { Modal } from "./Classes/Modal.js";

import * as t from "./types/types";


const swInfoInput = document.getElementById('SWInfoInput') as HTMLInputElement;

swInfoInput.addEventListener('keypress', function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        const value: string = swInfoInput.value;
        console.log(value);

        const regex = /^[a-zA-Z0-9]+-[a-zA-Z0-9]+(-[a-zA-Z0-9]+)?$/;
        if (!regex.test(value)) {
            // Swal.fire({
            //     title: 'Error!',
            //     text: "Invalid System or Waypoint Symbol",
            //     icon: 'error',
            //     confirmButtonText: 'ok'
            // })
            return;
        }

        const systemSymbol: string = value.split("-")[0] + "-" + value.split("-")[1];
        console.log("systemSymbol " + systemSymbol);
        console.log("waypointSymbol " + value);

        getSystemInfo(systemSymbol);
    }
});

async function getSystemInfo(systemSymbol: string) {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("api_key")
        },
    };
    const result: t.ApiResponse<t.Waypoint[]> = await fetch('https://api.spacetraders.io/v2/systems/' + systemSymbol + '/waypoints', options)
        .then(response => response.json());

    console.log(result);

    if (result.error) {
        // Swal.fire({
        //     title: 'Error!',
        //     text: result.error.message,
        //     icon: 'error',
        //     confirmButtonText: 'ok'
        // })
        return;
    } else {
        displaySystemInfo(result);
    }
}

function displaySystemInfo(response: t.ApiResponse<t.Waypoint[]>) {
    const systemWaypointList: t.Waypoint[] = response.data;

    const systemAccordion = new SystemAccordion();

    // clean up
    const systemInfoDiv = document.getElementById("SWInfoDiv") as HTMLDivElement;

    while (systemInfoDiv.firstChild) {
        systemInfoDiv.removeChild(systemInfoDiv.firstChild);
    }

    systemAccordion.renderAccordionAndAppendTo(systemInfoDiv);

    let orbitals: string[] = [];
    systemWaypointList.forEach(waypoint => {
        // append another Item to the accordion and get its body to fill with a ListCard
        const accordionItem = systemAccordion.appendAccordionItem(waypoint.symbol);

        // if current waypoint is an orbital, change the accordion button to show a satellite and apply margin
        if (orbitals.includes(waypoint.symbol)) {
            const accordionButton = document.getElementById("accordionButton" + waypoint.symbol) as HTMLButtonElement;

            accordionButton.innerHTML = ""
            const symbolSpan = document.createElement("span");
            symbolSpan.innerHTML = "🛰️" + waypoint.symbol;
            symbolSpan.setAttribute("style", "margin-left: 20px;");
            accordionButton.appendChild(symbolSpan);
        }

        // find orbitals
        if (waypoint.orbitals.length > 0) {
            console.log("orbitals found");
            // waypoint.orbitals.forEach((orbital: Orbital) => {
            //     orbitals.push(orbital.symbol);
            // });
            orbitals = waypoint.orbitals.map((orbital: t.Orbital) => orbital.symbol);
            console.log(orbitals);
        }

        const listCard = new ListCard(false);
        const accordionBody = accordionItem.getElementsByClassName("accordion-body")[0] as HTMLDivElement;
        listCard.renderCardAndAppendTo(accordionBody);
        // append waypoint type
        listCard.appendListText("Type: " + waypoint.type);

        // append traits to list
        const traits = waypoint.traits;
        if (traits.length > 0) {
            listCard.appendListText("Traits:");

            const listGroup = document.createElement("ul");
            listGroup.className = "list-group list-group-flush";

            traits.forEach((trait: t.Trait) => {
                const listElement = document.createElement("li");
                listElement.className = "list-group-item d-flex align-items-center justify-content-center";
                listElement.innerHTML = trait.name;

                if (trait.name == "Shipyard") {
                    // Build the button to visit a shipyard
                    const modalLaunchButton = document.createElement("button");
                    modalLaunchButton.type = "button";
                    modalLaunchButton.innerHTML = "Visit";
                    modalLaunchButton.className = "btn btn-primary";
                    modalLaunchButton.setAttribute("style", "--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem; margin-left: 10px");
                    modalLaunchButton.setAttribute("data-bs-toggle", "modal");
                    modalLaunchButton.setAttribute("data-bs-target", "#shipyardModal");

                    const modal = new Modal("shipyardModal", "Shipyard", "shipyardModalLabel");
                    modal.renderMondalAndAppendTo(document.getElementById("modalsDiv") as HTMLDivElement);

                    listElement.appendChild(modalLaunchButton);
                }
                listGroup.appendChild(listElement);
            });
            listCard.appendListElement(listGroup);
        }
        // append location to list
        listCard.appendListText("Location: " + waypoint.x + ", " + waypoint.y);
    });
}

function displayWaypointInfo(response: t.ApiResponse<t.Waypoint>) {
    console.log("displayWaypointInfo");
}

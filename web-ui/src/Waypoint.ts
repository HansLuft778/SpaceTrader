import { SystemAccordion } from "./Classes/SystemAccordion";
import { ListCard } from "./Classes/ListCard";
import { renderModal } from "./Shipyard";
import Swal from 'sweetalert2';

import { ApiResponse, Waypoint, Orbital, Trait } from "./types/types";

const sInfoInput = document.getElementById('sInfoInput') as HTMLInputElement;

sInfoInput.addEventListener('keypress', function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        const value: string = sInfoInput.value;
        console.log(value);

        checkSystemSymbolIsValid(value);
    }
});

function checkSystemSymbolIsValid(value: string) {
    const regex = /^[a-zA-Z0-9]+-[a-zA-Z0-9]+(-[a-zA-Z0-9]+)?$/;
    if (!regex.test(value)) {
        Swal.fire({
            title: 'Error!',
            text: "Invalid System or Waypoint Symbol",
            icon: 'error',
            confirmButtonText: 'ok'
        });
        return;
    }

    const systemSymbol: string = value.split("-")[0] + "-" + value.split("-")[1];
    console.log("systemSymbol " + systemSymbol);
    console.log("waypointSymbol " + value);

    getSystemInfo(systemSymbol);
}

/**
 * Checks if the url contains a waypointSymbol parameter and if so, checks if it is valid
 * and displays the system info
 * 
 * @returns void
 */
function checkUrlParameter() {
    console.log("checkUrlParameter");
    const urlParams = new URLSearchParams(window.location.search);

    if (!urlParams.has('waypointSymbol')) {
        return;
    }
    console.log(urlParams + " " + typeof urlParams);

    const waypointSymbol = urlParams.get('waypointSymbol');
    console.log(waypointSymbol + " " + typeof waypointSymbol);

    if (waypointSymbol) {
        console.log(waypointSymbol);
        sInfoInput.value = waypointSymbol;
        // clean current params
        window.history.replaceState({}, document.title, "/waypoint.html");
        checkSystemSymbolIsValid(waypointSymbol);
    }
}
checkUrlParameter();

/**
 * Fetches the SpaceTraders API for the system info
 * @param systemSymbol System Symbol
 * @returns void
 */
async function getSystemInfo(systemSymbol: string) {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("api_key")
        },
    };
    const result: ApiResponse<Waypoint[]> = await fetch('https://api.spacetraders.io/v2/systems/' + systemSymbol + '/waypoints', options)
        .then(response => response.json());

    console.log(result);

    if (result.error) {
        Swal.fire({
            title: 'Error!',
            text: result.error.message,
            icon: 'error',
            confirmButtonText: 'ok'
        })
        return;
    } else {
        displaySystemInfo(result);
    }
}

function displaySystemInfo(response: ApiResponse<Waypoint[]>) {
    const systemWaypointList: Waypoint[] = response.data;

    const systemAccordion = new SystemAccordion();
    const systemInfoDiv = document.getElementById("sInfoDiv") as HTMLDivElement;

    // clean up
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
            orbitals = waypoint.orbitals.map((orbital: Orbital) => orbital.symbol);
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

            traits.forEach((trait: Trait) => {
                const listElement = document.createElement("li");
                listElement.className = "list-group-item d-flex align-items-center justify-content-center";
                listElement.innerHTML = trait.name;

                if (trait.name == "Shipyard") {
                    // Build the button to visit a shipyard
                    renderModal(listElement, waypoint.symbol);
                }
                listGroup.appendChild(listElement);
            });
            listCard.appendListElement(listGroup);
        }
        // append location to list
        listCard.appendListText("Location: " + waypoint.x + ", " + waypoint.y);
    });
}

function displayWaypointInfo(response: ApiResponse<Waypoint>) {
    Swal.fire({
        title: response.data.symbol,
        html: "Type: " + response.data.type + "<br>" +
            "Location: " + response.data.x + ", " + response.data.y + "<br>" +
            "Traits: " + response.data.traits.map((trait: Trait) => trait.name).join(", "),
        icon: 'info',
        confirmButtonText: 'ok'
    })
}


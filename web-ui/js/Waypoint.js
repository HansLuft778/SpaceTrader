import { SystemAccordion } from "./Classes/SystemAccordion.js";

const swInfoInput = document.getElementById('SWInfoInput');

swInfoInput.addEventListener('keypress', function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        const value = swInfoInput.value;
        console.log(value);

        const regex = /^[a-zA-Z0-9]+-[a-zA-Z0-9]+(-[a-zA-Z0-9]+)?$/;
        if (!regex.test(value)) {
            Swal.fire({
                title: 'Error!',
                text: "Invalid System or Waypoint Symbol",
                icon: 'error',
                confirmButtonText: 'ok'
            })
            return;
        }

        const systemSymbol = value.split("-")[0] + "-" + value.split("-")[1];
        console.log("systemSymbol " + systemSymbol);
        console.log("waypointSymbol " + value);

        if (value.split("-").length == 2) {
            getWaypointInfo(systemSymbol, "");
        } else {
            getWaypointInfo(systemSymbol, value);
        }
    }
});

async function getWaypointInfo(systemSymbol, waypointSymbol) {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("api_key")
        },
    };
    const result = await fetch('https://api.spacetraders.io/v2/systems/' + systemSymbol + '/waypoints/' + waypointSymbol, options)
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
    } else if (result.data.chart) {
        displayWaypointInfo(result);
    } else {
        displaySystemInfo(result);
    }
}

function displaySystemInfo(response) {
    const systemWaypointList = response.data;

    const systemAccordion = new SystemAccordion();

    // clean up
    const systemInfoDiv = document.getElementById("SWInfoDiv");
    while (systemInfoDiv.firstChild) {
        systemInfoDiv.removeChild(systemInfoDiv.firstChild);
    }

    systemAccordion.renderAccordion(systemInfoDiv);

    systemWaypointList.forEach(waypoint => {
        systemAccordion.appendAccordionItem(waypoint);
    });
}

function displayWaypointInfo(response) {
    console.log("displayWaypointInfo");
    
}

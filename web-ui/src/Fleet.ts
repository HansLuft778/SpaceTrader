import { Map } from "./Classes/Map";
import { ShipOwned } from "./types/shipTypes";
import { ApiResponse, Waypoint } from "./types/types";

async function getFleet() {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('api_key'),
        },
    };

    let result: ApiResponse<ShipOwned[]> = await fetch('https://api.spacetraders.io/v2/my/ships', options)
        .then(response => response.json());

    console.log(result);
}

getFleet();

async function drawMap(systemSymbol: string) {

    const systemData = await getSystemInfo(systemSymbol);

    let xMin: number = 0
    let xMax: number = 0
    let yMin: number = 0
    let yMax: number = 0

    systemData.data.forEach(waypoint => {
        if (waypoint.x < xMin) {
            xMin = waypoint.x;
        }
        if (waypoint.x > xMax) {
            xMax = waypoint.x;
        }
        if (waypoint.y < yMin) {
            yMin = waypoint.y;
        }
        if (waypoint.y > yMax) {
            yMax = waypoint.y;
        }
    });


    const map = new Map(xMin, xMax, yMin, yMax);

    systemData.data.forEach(waypoint => {
        map.addWaypoint(waypoint.x, waypoint.y);
    });
}

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

    return result;
}

// Call drawMap when the document is ready and when the window is resized
document.addEventListener("DOMContentLoaded", () => {
    drawMap("X1-QB20");
});
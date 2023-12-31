import { ListCard } from "./Classes/ListCard";
import { ApiResponse, Account } from "./types/types";

import { initAPI } from "./APIkeyManager";

import Swal from 'sweetalert2';

export async function getAgentData() {

    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("api_key")
        },
    };
    const result: ApiResponse<Account> = await fetch('https://api.spacetraders.io/v2/my/agent', options)
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
    }

    const agentDataDiv = document.getElementById("AgentDataDiv") as HTMLDivElement;
    const agent = result.data;

    const agentCard = new ListCard(true);
    agentCard.appendTo(agentDataDiv);
    agentCard.appendListText("Call sign: " + agent.symbol);
    agentCard.appendListText("Credits: " + agent.credits.toLocaleString());
    agentCard.appendListText("Headquarters: " + agent.headquarters, true, () => {
        window.location.href = "./waypoint.html?waypointSymbol=" + agent.headquarters;
    });
    agentCard.appendListText("Faction: " + agent.startingFaction);
}

initAPI();
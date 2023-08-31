import { ListCard } from "./Classes/ListCard.js";

export async function getAgentData() {

    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("api_key")
        },
    };
    const result = await fetch('https://api.spacetraders.io/v2/my/agent', options)
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

    const agentDataDiv = document.getElementById("AgentDataDiv");
    const agent = result.data;

    const agentCard = new ListCard(true);
    agentCard.renderCardAndAppendTo(agentDataDiv);
    agentCard.appendListText("Call sign: " + agent.symbol);
    agentCard.appendListText("Credits: " + agent.credits);
    agentCard.appendListText("Headquarters: " + agent.headquarters);
    agentCard.appendListText("Faction: " + agent.startingFaction);
}
import { setIsKeySet } from "./APIkeyManager.js";

async function getAgentData() {

    console.log("getAgentData");

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
        if (result.error.code == 4100) {
            console.log("error 4100");
            setIsKeySet(false);
            return;
        } 
        Swal.fire({
            title: 'Error!',
            text: result.error.message,
            icon: 'error',
            confirmButtonText: 'ok'
        })
        return;
    }

    setIsKeySet(true);

    const agentDataDiv = document.getElementById("AgentDataDiv");
    agentDataDiv.innerHTML = result.data.accountId;
}

getAgentData();
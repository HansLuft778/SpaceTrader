import { Card } from "./Classes/ContractCard.js";
import * as t from "./types/types.js"

async function getContracts() {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('api_key'),
        },
    };

    let result: t.ApiResponse<t.Contract[]> = await fetch('https://api.spacetraders.io/v2/my/contracts', options)
        .then(response => response.json());

    console.log(result);
    displayContracts(result);
}

async function acceptContract(contractID: string, button: HTMLButtonElement) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('api_key'),
        },
    };

    const result = await fetch('https://api.spacetraders.io/v2/my/contracts/cllvhzpant1vos60c4x8qflau/accept', options)
        .then(response => response.json()); // TODO: type definition

    console.log(result);

    if (result.error) {
        // Swal.fire({
        //     title: 'Error!',
        //     text: result.error.message,
        //     icon: 'error',
        //     confirmButtonText: 'ok'
        // })
        return;
    }

    updateButtonStatus(button);
}

function updateButtonStatus(button: HTMLButtonElement) {
    button.innerHTML = "Accepted"; // hähä der yoy stinkt nach gagge 
    button.className = "btn btn-success"; // und versteht nüscht ausher trainstation
}

function displayContracts(rawData: t.ApiResponse<t.Contract[]>) {
    const contractsDiv = document.getElementById("contractList") as HTMLDivElement;

    rawData.data.forEach(contract => {
        const card = new Card(contract);
        const cardDiv = card.renderCardAndAppendTo(contractsDiv);

        const acceptButton = cardDiv.getElementsByTagName("button")[0] as HTMLButtonElement;
        acceptButton.onclick = function () {
            acceptContract(contract.id, acceptButton);
        }
    });
}

getContracts();
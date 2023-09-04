import { ContractCard } from "./Classes/ContractCard";
import { ApiResponse, Contract } from "./types/types"
import Swal from 'sweetalert2';

async function getContracts() {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('api_key'),
        },
    };

    let result: ApiResponse<Contract[]> = await fetch('https://api.spacetraders.io/v2/my/contracts', options)
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

    const result = await fetch('https://api.spacetraders.io/v2/my/contracts/' + contractID + '/accept', options)
        .then(response => response.json()); // TODO: type definition

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

    updateButtonStatus(button);
}

function updateButtonStatus(button: HTMLButtonElement) {
    button.innerHTML = "Accepted"; // hähä der yoy stinkt nach gagge 
    button.className = "btn btn-success disabled"; // und versteht nüscht ausher trainstation
}

function displayContracts(rawData: ApiResponse<Contract[]>) {
    const contractsDiv = document.getElementById("contractList") as HTMLDivElement;

    rawData.data.forEach(contract => {
        const card = new ContractCard(contract);
        card.appendTo(contractsDiv);
        card.addEventHandler(acceptContract);
    });
}

getContracts();
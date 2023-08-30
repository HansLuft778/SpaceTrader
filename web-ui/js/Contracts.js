import { Card } from "./ContractCard.js";

async function getContracts() {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('api_key'),
        },
    };

    let result = await fetch('https://api.spacetraders.io/v2/my/contracts', options)
        .then(response => response.json());

    console.log(result);
    displayContracts(result);
}

async function acceptContract(contractID, button) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('api_key'),
        },
    };

    const result = await fetch('https://api.spacetraders.io/v2/my/contracts/cllvhzpant1vos60c4x8qflau/accept', options)
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

    updateButtonStatus(button);
}

function updateButtonStatus(button) {
    button.innerHTML = "Accepted";
    button.className = "btn btn-success";
}

function displayContracts(rawData) {
    const contractsDiv = document.getElementById("contractList");
    if (!contractsDiv) {
        return;
    }

    rawData.data.forEach(contract => {
        const card = new Card(contract);
        const cardDiv = card.renderCard(contractsDiv);

        const acceptButton = cardDiv.getElementsByTagName("button")[0];
        acceptButton.onclick = function () {
            acceptContract(contract.id, acceptButton);
        }
    });
}

getContracts();
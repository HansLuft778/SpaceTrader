

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
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.setAttribute("style", "width: 18rem; margin-top: 10px;")

        const cardBodyDiv = document.createElement("div");
        cardBodyDiv.className = "card-body";

        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.innerHTML = contract.type;

        const cardSubtitleSec = document.createElement("h6");
        cardSubtitleSec.className = "card-subtitle mb-2 text-body-secondary";
        var date = new Date(contract.expiration);
        cardSubtitleSec.innerHTML = date.toLocaleString("de-DE");

        const cardSubtitleSec2 = document.createElement("h6");
        cardSubtitleSec2.className = "card-subtitle mb-2 text-body-secondary";
        const pay = contract.terms.payment.onAccepted + contract.terms.payment.onFulfilled;;
        cardSubtitleSec2.innerHTML = "Payment: $" + pay;

        const cardSubtitleTer = document.createElement("h6");
        cardSubtitleTer.className = "card-subtitle mb-2 text-body-tertiary";
        cardSubtitleTer.innerHTML = contract.id;

        const cardText = document.createElement("p");
        cardText.className = "card-text";
        const deliver = contract.terms.deliver[0];
        cardText.innerHTML = "Deliver " + deliver.unitsRequired + " " + deliver.tradeSymbol + " to " + deliver.destinationSymbol;

        const acceptButton = document.createElement("button");
        acceptButton.className = contract.accepted ? "btn btn-success disabled" : "btn btn-primary";
        acceptButton.innerHTML = contract.accepted ? "Accepted" : "Accept";
        acceptButton.onclick = function () {
            acceptContract(contract.id, acceptButton);
        }

        cardBodyDiv.appendChild(cardTitle);
        cardBodyDiv.appendChild(cardSubtitleSec);
        cardBodyDiv.appendChild(cardSubtitleSec2);
        cardBodyDiv.appendChild(cardSubtitleTer);
        cardBodyDiv.appendChild(cardText);
        cardBodyDiv.appendChild(acceptButton);

        cardDiv.appendChild(cardBodyDiv);
        contractsDiv.appendChild(cardDiv);

    });

}

getContracts();
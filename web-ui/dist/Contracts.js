"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ContractCard_js_1 = require("./Classes/ContractCard.js");
function getContracts() {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('api_key'),
            },
        };
        let result = yield fetch('https://api.spacetraders.io/v2/my/contracts', options)
            .then(response => response.json());
        console.log(result);
        displayContracts(result);
    });
}
function acceptContract(contractID, button) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('api_key'),
            },
        };
        const result = yield fetch('https://api.spacetraders.io/v2/my/contracts/cllvhzpant1vos60c4x8qflau/accept', options)
            .then(response => response.json());
        console.log(result);
        if (result.error) {
            return;
        }
        updateButtonStatus(button);
    });
}
function updateButtonStatus(button) {
    button.innerHTML = "Accepted";
    button.className = "btn btn-success";
}
function displayContracts(rawData) {
    const contractsDiv = document.getElementById("contractList");
    rawData.data.forEach(contract => {
        const card = new ContractCard_js_1.Card(contract);
        const cardDiv = card.renderCardAndAppendTo(contractsDiv);
        const acceptButton = cardDiv.getElementsByTagName("button")[0];
        acceptButton.onclick = function () {
            acceptContract(contract.id, acceptButton);
        };
    });
}
getContracts();
//# sourceMappingURL=Contracts.js.map
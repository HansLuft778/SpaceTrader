/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Classes/ContractCard.ts":
/*!*************************************!*\
  !*** ./src/Classes/ContractCard.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Card: () => (/* binding */ Card)
/* harmony export */ });
class Card {
    constructor(contract) {
        this.contract = contract;
    }
    renderCardAndAppendTo(parentDiv) {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.setAttribute("style", "width: 18rem; margin-top: 10px;");
        const cardBodyDiv = document.createElement("div");
        cardBodyDiv.className = "card-body";
        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.innerHTML = this.contract.type;
        const cardSubtitleSec = document.createElement("h6");
        cardSubtitleSec.className = "card-subtitle mb-2 text-body-secondary";
        var date = new Date(this.contract.expiresAt);
        cardSubtitleSec.innerHTML = date.toLocaleString("de-DE");
        const cardSubtitleSec2 = document.createElement("h6");
        cardSubtitleSec2.className = "card-subtitle mb-2 text-body-secondary";
        const pay = this.contract.terms.payment.onAccepted + this.contract.terms.payment.onFulfilled;
        ;
        cardSubtitleSec2.innerHTML = "Payment: $" + pay;
        const cardSubtitleTer = document.createElement("h6");
        cardSubtitleTer.className = "card-subtitle mb-2 text-body-tertiary";
        cardSubtitleTer.innerHTML = this.contract.id;
        const cardText = document.createElement("p");
        cardText.className = "card-text";
        const deliver = this.contract.terms.deliver[0];
        cardText.innerHTML = "Deliver " + deliver.unitsRequired + " " + deliver.tradeSymbol + " to " + deliver.destinationSymbol;
        const acceptButton = document.createElement("button");
        acceptButton.className = this.contract.accepted ? "btn btn-success disabled" : "btn btn-primary";
        acceptButton.innerHTML = this.contract.accepted ? "Accepted" : "Accept";
        cardBodyDiv.appendChild(cardTitle);
        cardBodyDiv.appendChild(cardSubtitleSec);
        cardBodyDiv.appendChild(cardSubtitleSec2);
        cardBodyDiv.appendChild(cardSubtitleTer);
        cardBodyDiv.appendChild(cardText);
        cardBodyDiv.appendChild(acceptButton);
        cardDiv.appendChild(cardBodyDiv);
        parentDiv.appendChild(cardDiv);
        return cardDiv;
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/Contracts.ts ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Classes_ContractCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Classes/ContractCard */ "./src/Classes/ContractCard.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

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
        const card = new _Classes_ContractCard__WEBPACK_IMPORTED_MODULE_0__.Card(contract);
        const cardDiv = card.renderCardAndAppendTo(contractsDiv);
        const acceptButton = cardDiv.getElementsByTagName("button")[0];
        acceptButton.onclick = function () {
            acceptContract(contract.id, acceptButton);
        };
    });
}
getContracts();

})();

/******/ })()
;
//# sourceMappingURL=contract.bundle.js.map
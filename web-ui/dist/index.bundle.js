/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/APIkeyManager.ts":
/*!******************************!*\
  !*** ./src/APIkeyManager.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initAPI: () => (/* binding */ initAPI)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/index.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var isKeySet = false;
function setAPIkey() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiKeyInput = document.getElementById("apiKeyInput");
        const key = apiKeyInput.value;
        if (key === null || key === undefined || key === "" || key.length < 10) {
            console.log('API key is not valid');
            sessionStorage.removeItem('api_key');
            isKeySet = false;
            setAPIkeyMessage();
            return;
        }
        console.log('setting API key to ' + key);
        sessionStorage.setItem('api_key', key);
        yield checkKeyIsValid();
    });
}
function checkKeyIsValid() {
    return __awaiter(this, void 0, void 0, function* () {
        const key = sessionStorage.getItem('api_key');
        if (key === null) {
            isKeySet = false;
            setAPIkeyMessage();
        }
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("api_key")
            },
        };
        const respone = yield fetch('https://api.spacetraders.io/v2/my/agent', options)
            .then(response => response.json());
        if (respone.error) {
            if (respone.error.code == 4100) {
                console.log("error 4100");
                isKeySet = false;
                return;
            }
            return;
        }
        else {
            console.log("API key is valid");
            isKeySet = true;
            (0,_index__WEBPACK_IMPORTED_MODULE_0__.getAgentData)();
        }
        setAPIkeyMessage();
    });
}
function setAPIkeyMessage() {
    console.log("setAPIkeyMessage() called " + isKeySet);
    const isSetText = document.getElementById("APIkeySet");
    const key = sessionStorage.getItem('api_key');
    if (isKeySet) {
        isSetText.innerHTML = "API key is set ✅";
        return;
    }
    else {
        isSetText.innerHTML = "API key not set ❌";
        return;
    }
}
function initAPI() {
    return __awaiter(this, void 0, void 0, function* () {
        const setAPIkeyButton = document.getElementById("setAPIkeyButton");
        setAPIkeyButton.addEventListener("click", setAPIkey);
        yield checkKeyIsValid();
    });
}


/***/ }),

/***/ "./src/Classes/ListCard.ts":
/*!*********************************!*\
  !*** ./src/Classes/ListCard.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ListCard: () => (/* binding */ ListCard)
/* harmony export */ });
class ListCard {
    constructor(footer) {
        this.listGroup = document.createElement("ul");
        this.footer = footer;
    }
    renderCardAndAppendTo(parentDiv) {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.setAttribute("style", "margin-top: 10px;");
        this.listGroup = document.createElement("ul");
        this.listGroup.className = "list-group list-group-flush";
        cardDiv.appendChild(this.listGroup);
        if (this.footer) {
            const cardFooter = document.createElement("div");
            cardFooter.className = "card-footer";
            const cardFooterText = document.createElement("small");
            cardFooterText.className = "text-body-secondary";
            cardFooterText.innerHTML = "Last updated 3 mins ago";
            cardFooter.appendChild(cardFooterText);
            cardDiv.appendChild(cardFooter);
        }
        parentDiv.appendChild(cardDiv);
        return cardDiv;
    }
    appendListText(text) {
        const listElement = document.createElement("li");
        listElement.className = "list-group-item";
        listElement.innerHTML = text;
        this.listGroup.appendChild(listElement);
    }
    appendListElement(element) {
        const listElement = document.createElement("li");
        listElement.className = "list-group-item";
        listElement.appendChild(element);
        this.listGroup.appendChild(listElement);
    }
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAgentData: () => (/* binding */ getAgentData)
/* harmony export */ });
/* harmony import */ var _Classes_ListCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Classes/ListCard */ "./src/Classes/ListCard.ts");
/* harmony import */ var _APIkeyManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./APIkeyManager */ "./src/APIkeyManager.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


function getAgentData() {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("api_key")
            },
        };
        const result = yield fetch('https://api.spacetraders.io/v2/my/agent', options)
            .then(response => response.json());
        console.log(result);
        if (result.error) {
            return;
        }
        const agentDataDiv = document.getElementById("AgentDataDiv");
        const agent = result.data;
        const agentCard = new _Classes_ListCard__WEBPACK_IMPORTED_MODULE_0__.ListCard(true);
        agentCard.renderCardAndAppendTo(agentDataDiv);
        agentCard.appendListText("Call sign: " + agent.symbol);
        agentCard.appendListText("Credits: " + agent.credits);
        agentCard.appendListText("Headquarters: " + agent.headquarters);
        agentCard.appendListText("Faction: " + agent.startingFaction);
    });
}
(0,_APIkeyManager__WEBPACK_IMPORTED_MODULE_1__.initAPI)();


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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.bundle.js.map
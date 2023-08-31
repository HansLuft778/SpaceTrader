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
const index_js_1 = require("../index.js");
var isKeySet = false;
const setAPIkeyButton = document.getElementById("setAPIkeyButton");
setAPIkeyButton.addEventListener("click", setAPIkey);
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
            (0, index_js_1.getAgentData)();
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
checkKeyIsValid();
//# sourceMappingURL=APIkeyManager.js.map
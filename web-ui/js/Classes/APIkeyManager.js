import { getAgentData } from "../index.js";

var isKeySet = false;
const setAPIkeyButton = document.getElementById("setAPIkeyButton");
setAPIkeyButton.addEventListener("click", setAPIkey);

async function setAPIkey() {
    const apiKeyInput = document.getElementById("apiKeyInput");
    const key = apiKeyInput.value;

    if (key === null || key === undefined || key === "" || key.length < 10) {
        console.log('API key is not valid');
        sessionStorage.removeItem('api_key');
        isKeySet = false;
        setAPIkeyMessage();
        return;
    }

    // set the API key for the current session
    console.log('setting API key to ' + key);
    sessionStorage.setItem('api_key', key);

    await checkKeyIsValid();
}

async function checkKeyIsValid() {
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
    const respone = await fetch('https://api.spacetraders.io/v2/my/agent', options)
        .then(response => response.json());

    if (respone.error) {
        if (respone.error.code == 4100) {
            console.log("error 4100");
            isKeySet = false;
            return;
        }
        Swal.fire({
            title: 'Error!',
            text: respone.error.message,
            icon: 'error',
            confirmButtonText: 'ok'
        })
        return;
    } else {
        console.log("API key is valid");
        isKeySet = true;
        getAgentData();
    }

    setAPIkeyMessage();
}

function setAPIkeyMessage() {
    console.log("setAPIkeyMessage() called " + isKeySet);
    const isSetText = document.getElementById("APIkeySet");
    const key = sessionStorage.getItem('api_key');

    if (isKeySet) {
        isSetText.innerHTML = "API key is set ✅";
        return;
    } else {
        isSetText.innerHTML = "API key not set ❌";
        return;
    }
}

checkKeyIsValid()
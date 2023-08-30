var isKeySet = false;

function setAPIkey() {
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
    isKeySet = true;

    setAPIkeyMessage();
}

function setAPIkeyMessage() {
    const isSetText = document.getElementById("APIkeySet");
    const key = sessionStorage.getItem('api_key');

    if (key === null) {
        isKeySet = false;
    }

    if (isKeySet) {
        isSetText.innerHTML = "API key is set ✅";
        return;
    } else {
        isSetText.innerHTML = "API key not set ❌";
        return;
    }
}

export function setIsKeySet(value) {
    isKeySet = value;
    setAPIkeyMessage();
}
sessionStorage.setItem('api_key', '***REMOVED***');
setAPIkeyMessage();
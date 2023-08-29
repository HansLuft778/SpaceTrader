function setAPIkey() {
    const apiKeyInput = document.getElementById("apiKeyInput");
    const key = apiKeyInput.value;

    if (key === null || key === undefined || key === "" || key.length < 10) {
        console.log('API key is not valid');
        sessionStorage.removeItem('api_key');
        checkAPIKeyIsSet();
        return;
    }

    // set the API key for the current session
    console.log('setting API key to ' + key);
    sessionStorage.setItem('api_key', key);

    checkAPIKeyIsSet();
}

function checkAPIKeyIsSet() {
    const isSetText = document.getElementById("APIkeySet");
    const key = sessionStorage.getItem('api_key');

    if (key === null) {
        console.log('API key not set ❌');
        isSetText.innerHTML = "API key not set ❌";
        return false;
    } else {
        console.log('API key is set ✅');
        isSetText.innerHTML = "API key is set ✅";
        return true;
    }
}

checkAPIKeyIsSet();
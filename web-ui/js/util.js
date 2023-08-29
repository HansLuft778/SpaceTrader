function setAPIkey() {
    const apiKeyInput = document.getElementById("apiKeyInput");
    const key = apiKeyInput.value;
    // set the API key for the current session
    console.log('setting API key to ' + key);
    sessionStorage.setItem('api_key', key);
}
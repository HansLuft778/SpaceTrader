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
sessionStorage.setItem('api_key', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiR09SRyIsInZlcnNpb24iOiJ2MiIsInJlc2V0X2RhdGUiOiIyMDIzLTA4LTI2IiwiaWF0IjoxNjkzMjUyOTA2LCJzdWIiOiJhZ2VudC10b2tlbiJ9.wES8blc6BS7FOlKXVmfGTV7xJ-pWOsw2VBPQY4HkdEI3sXrBsyE2ajNtJ9vPuujmr1haF7N4jIlQjY5bRXd06PYq2FSKlFG0ctTiIL8x6qe4KyS-NeQCucVzkb2iqzpJjbPZ5OJMsYiEh--Sx5BY3wmwqVTsjDMhO513JXL7UK6-Otb2xXegQ8vtI-J0JPMbP_w10ZxbhkWnJOC3IdRoVkqOAWv4gognaxgkIbY9Lj1jfVW-hdeKHaOVnd9EU-gAdBbkiY1LifrxTldixSUR_JCBCAPFbJBlqBoyPgoQ0I3p9guB6R8_tfrOb4OqcyLk2CGvTwX2fgjoW8p-LE9d6A');
setAPIkeyMessage();

const URL = "https://rasmusweb.no/hs.php"
const GameID = "bendikspill"
const svar = localStorage.score;

const requestOptions = {
    method: "GET",
    headers: {
        Accept: "application/json",
    },
}

async function getRequest() {
    const htmlObj = document.getElementById("get_result")
    htmlObj.innerHTML = "Waiting for response"

    const apiCallPromise = await fetch(URL + "?id=" + GameID, requestOptions)

    htmlObj.innerHTML = ""
    appendPElm(htmlObj, "StatusCodeOK: " + apiCallPromise.ok)

    // Getting the json from the response (NOTE: Also await!)
    const json = await apiCallPromise.json()
    console.log(json)
    appendPElm(htmlObj, "hs: " + json.hs)
    appendPElm(htmlObj, "player: " + json.player)
}

// Poster ny HS til php backend
async function postRequest(score, playername) {

    postBody = {"id": GameID, "hs": score, "player": playername}

    const apiCallPromise = await fetch(URL, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        body: JSON.stringify(postBody),
    })


    /*
    appendPElm(htmlObj, "StatusCodeOK: " + apiCallPromise.ok)

    // Getting the json from the response:
    const responseJson = await apiCallPromise.json()
    console.log(responseJson)

    appendPElm(htmlObj, "Response: " + responseJson)
    */
}

function appendPElm(htmlObj, text) {
    const p = document.createElement("p")
    p.textContent = text
    htmlObj.appendChild(p)
}

function submitscore(event) {
    event.preventDefault();
    const navnInput = document.getElementById("navn").value;
    const input = document.getElementById("navn")
    if (!navnInput) {
        alert("Vennligst skriv inn navnet ditt.");
    } else if (svar >= 0) {
        postRequest(svar, navnInput);
        input.placeholder = navnInput;
        input.value = ""
    }

    return false;
}

document.getElementById("dinscore").innerHTML = svar;
if(svar < 0){
    document.getElementById("dinscore").innerHTML = "Du Tapte";
}
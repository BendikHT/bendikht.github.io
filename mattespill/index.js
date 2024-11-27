const svar = localStorage.score;
document.getElementById("dinscore").innerHTML = svar;
if(svar < 0){
    document.getElementById("dinscore").innerHTML = "Du Tapte";
}


const URL = "https://rasmusweb.no/hs.php"
const GameID = "spillbendik"

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
async function postRequest(svar) {
    const htmlObj = document.getElementById("post_result")
    htmlObj.innerHTML = "Waiting for response"

    postBody = {}
    postBody.id = GameID
    postBody.hs = document.getElementById("hs_number").value
    postBody.player = document.getElementById("hs_player").value

    const apiCallPromise = await fetch(URL, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        body: JSON.stringify(postBody),
    })

    htmlObj.innerHTML = ""

    appendPElm(htmlObj, "StatusCodeOK: " + apiCallPromise.ok)

    // Getting the json from the response:
    const responseJson = await apiCallPromise.json()
    console.log(responseJson)

    appendPElm(htmlObj, "Response: " + responseJson)
}

function appendPElm(htmlObj, text) {
    const p = document.createElement("p")
    p.textContent = text
    htmlObj.appendChild(p)
}
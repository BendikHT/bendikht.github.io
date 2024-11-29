
let rettSvar = 0;
let score = 0;
let tid = 0;
let feil1 = 0;
let feil2 = 0;
let feil3 = 0;
let rett = 0;
let type = 0;


const box = document.getElementById("sky");
let tidInterval;

function tidSidenStart() {
    tid += 0.1
    document.getElementById("tid").innerHTML = Math.round(tid * 10);

}

function start() {
    const random = Math.floor(Math.random() * 10) + 1;
    const random2 = Math.floor(Math.random() * 10) + 1;
    type = Math.floor(Math.random() * 2) + 1;

    if (type == 1) {
        document.getElementById("p2").innerHTML = random + " + " + random2;
        rettSvar = random + random2
    } else if (type == 2) {
        document.getElementById("p2").innerHTML = random + " * " + random2;
        rettSvar = random * random2
    }

    box.classList.remove("tallFall");
    void box.offsetWidth;
    box.classList.add("tallFall");
    tapt()
    if (!tidInterval) {
        tidInterval = setInterval(tidSidenStart, 1000);
    }
    
    setTimeout(ferdig, 10010)
}

function ror() {
    rett = Math.floor(Math.random() * 3) + 1;
    feil1 = Math.floor(Math.random() * 10) + 1;
    feil2 = Math.floor(Math.random() * 10) + 1;
    feil3 = Math.floor(Math.random() * 10) + 1;

    if (rett === 1) {
        document.getElementById("rørp1").innerHTML = rettSvar;
        document.getElementById("rørp2").innerHTML = Math.abs(rettSvar - feil2);
        document.getElementById("rørp3").innerHTML = Math.abs(rettSvar + feil3);
    } else if (rett === 2) {
        document.getElementById("rørp1").innerHTML = Math.abs(rettSvar + feil1);
        document.getElementById("rørp2").innerHTML = rettSvar;
        document.getElementById("rørp3").innerHTML = Math.abs(rettSvar - feil3);
    } else {
        document.getElementById("rørp1").innerHTML = Math.abs(rettSvar - feil1);
        document.getElementById("rørp2").innerHTML = Math.abs(rettSvar + feil2);
        document.getElementById("rørp3").innerHTML = rettSvar;
    }
}

function ror1() {
    const rørp1Innhold = parseInt(document.getElementById("rørp1").innerHTML);
    if (rørp1Innhold == rettSvar) {
        if (type == 1) {
            score += 1;
        } else if (type = 2) {
            score += 10;
        }

        document.getElementById("score").innerHTML = score;
        start()
    } else {
        score -= 10;
        document.getElementById("score").innerHTML = score;
    }
    if (score > 0) {
        ror()
        setTimeout(ror, 10)
    }
    tapt()
}

function ror2() {
    const rørp2Innhold = parseInt(document.getElementById("rørp2").innerHTML);
    if (rørp2Innhold == rettSvar) {
        if (type == 1) {
            score += 1;
        } else if (type = 2) {
            score += 10;
        }
        document.getElementById("score").innerHTML = score;
        start()
    } else {
        score -= 10;
        document.getElementById("score").innerHTML = score;
    }
    if (score > 0) {
        ror()
        setTimeout(ror, 10)
    }
    tapt()
}
function ror3() {
    const rørp3Innhold = parseInt(document.getElementById("rørp3").innerHTML);
    if (rørp3Innhold == rettSvar) {
        if (type == 1) {
            score += 1;
        } else if (type = 2) {
            score += 10;
        }
        document.getElementById("score").innerHTML = score;
        start()
    } else {
        score -= 10;
        document.getElementById("score").innerHTML = score;
    }
    if (score >= 0) {
        ror()
        setTimeout(ror, 10)
    }
    tapt()

}

function finnPosisjon() {
    const sky = document.getElementById("sky");
    const rect = sky.getBoundingClientRect();
    let hoydeForhold = Math.round(rect.top / window.innerHeight * 1000);
    if (hoydeForhold >= 720) {
        score -= 5;
        document.getElementById("score").innerHTML = score;
        console.log("Score decreased to:", score);
        box.classList.remove("tallFall");
        void box.offsetWidth;
        box.classList.add("tallFall");
    }
    tapt()

    setInterval(finnPosisjon, 0)
}



function ferdig() {
    lagreinfo()
    window.open("index.html", "_self")
    document.getElementById("tid1") = tid1;
    document.getElementById("score").innerHTML = score;
}


function tapt() {
    if (score < 0) {
        ferdig()
    } else {
        document.getElementById("tapt").innerHTML = "";
    }
}

function lagreinfo() {
    localStorage.setItem("score", score);
}

function tilbake(){
    window.open("index.html", "_self")
}

start()
ror()
const $ = selector => document.querySelector(selector);

const StartGame = () => {

    stopTimer()
    startTimer()
    let gameDiv = $("#game");
    gameDiv.innerHTML = "";
    const difficulty = document.querySelector("#difficulty").value;
    
    if (difficulty=="Beginner") {
        field = creatingTheField(10, 81);
    }
    else if (difficulty=="Intermediate") {
        field = creatingTheField(40, 256);

    }
    else if (difficulty=="Expert") {
        field = creatingTheField(99, 484);

    }
    let indexNumber = 0;
    colorCode = 1;
    colorShuffler = 0;

    shuffle(field);
    let sideLength = Math.sqrt(field.length);
    for (let i = 0; i < sideLength; i++) {
        if (difficulty=="Intermediate" || difficulty=="Expert") {
            if (colorShuffler == 0) {
                colorShuffler += 1;
                colorCode -= 1
            }
            else {
                colorShuffler = 0;
                colorCode += 1;
            }
        }
        else {
            colorShuffler = 0;
        }
        for (let j = 0; j < sideLength; j++) {
            const node = document.createElement("button");
            node.textContent = " ";    

            if (colorCode == 0) {
                node.style.backgroundColor = "rgb(65, 105, 225)";
                colorCode += 1;
            }
            else {
                node.style.backgroundColor = "rgb(182, 208, 226)";
                colorCode = 0;
            }
            
            
            node.value = field[i][j];
            node.style.fontFamily = 'Courier New, monospace';
            // node.addEventListener ("click", tryHere);
            gameDiv.appendChild(node);
            indexNumber += 1

        }
        gameDiv.appendChild(document.createElement("br"));
        
    }

}

const startTimer = () => {
    var sec = 0;
    timer = setInterval(function(){
        document.getElementById('timer').innerHTML = sec;
        sec++;
    }, 1000);
}

const stopTimer = () => {
    clearInterval(timer);
}


const TilesDiscovered = () => {
    alert("fawf")
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function creatingTheField(bombs, tiles) {
    let arr = [];
    let = arrRows = []
    for (let i = 0; i < bombs; i++) {
        arr.push("1");
    }
    for (let i = 0; i < tiles-bombs; i++) {
        arr.push("0");
    }
    shuffle(arr);
    
    while (arr.length > 0) {
        rows = arr.splice(0, Math.sqrt(tiles))
        arrRows.push(rows)
    }
    return arrRows;
}

const Start = document.getElementById("start");
Start.addEventListener("click", StartGame);
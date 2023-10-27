const $ = selector => document.querySelector(selector);

const StartGame = () => {

    // Refreshes revealed tiles
    revealed = 0
    document.getElementById('revealed').innerHTML = revealed

    // Resets timer
    timer1 = stopTimer()
    startTimer()
    
    // Inputs difficulty and creates random field.
    let gameDiv = document.querySelector("#game");
    gameDiv.innerHTML = "";
    const difficulty = document.querySelector("#difficulty").value;
    let field;
    if (difficulty=="Beginner") {
        field = creatingTheField(10, 81);
    }
    else if (difficulty=="Intermediate") {
        field = creatingTheField(40, 256);

    }
    else if (difficulty=="Expert") {
        field = creatingTheField(99, 484);
    }
    colorCode = 1;
    colorShuffler = 0;


    for (rowString in field) {
        let row = parseInt(rowString)

        // Creates colored pattern shown in game
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
        // Button creation.
        for (i = 0; i < field.length-1; i++) {
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
            node.value = field[row][i];
            node.style.fontFamily = 'Courier New, monospace';
            // node.style.background = 'url("photos/joshtaylor.jpg")';

            // Gives event listeners for mines and safe squares.
            if (field[row][i] == "b") {
                node.addEventListener("click", mine);
                // Remove
                node.textContent = "b";    
            }
            else {
                node.addEventListener("click", safe);

                // Detects value of specified square to detect if bomb or not.
                newNodeValue = 0;

                // TOP LEFT
                if (row > 0 && i > 0) {
                    if (field[row-1][i-1] == "b") {
                        newNodeValue += 1;
                    }
                }

                // TOP
                if (row > 0) {
                    if (field[row-1][i] == "b") {
                        newNodeValue += 1;
                    }
                }

                // TOP RIGHT
                if (row > 0 && i < field.length) {
                    if (field[row-1][i+1] == "b") {
                        newNodeValue += 1;
                    }
                }

                // LEFT
                if (i > 0) {
                    if (field[row][i-1] == "b") {
                        newNodeValue += 1;
                    }
                }

                // RIGHT
                if (i < field.length) {
                    if (field[row][i+1] == "b") {
                        newNodeValue += 1;
                    }
                }

                // BOTTOM LEFT

                if (row < field.length && i > 0) {
                    if (field[row+1][i-1] == "b") {
                        newNodeValue += 1;
                    }
                }

                // BOTTOM
                if (row < field.length) {
                    if (field[row+1][i] == "b") {
                        newNodeValue += 1;
                    }
                }

                // BOTTOM RIGHT
                if (row < field.length && i < field.length) {
                    if (field[row+1][i+1] == "b") {
                        newNodeValue += 1;
                    }
                }

                node.value = newNodeValue;
                // Remove
                node.textContent = newNodeValue;    
            }
            gameDiv.appendChild(node);
        }
        gameDiv.appendChild(document.createElement("br"));   
    }
}

const startTimer = () => {
    var sec = 0;
    let timer = setInterval(function(){
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
    let arrRows = [];
    for (let i = 0; i < bombs; i++) {
        arr.push("b");
    }
    for (let i = 0; i < tiles-bombs; i++) {
        arr.push("0");
    }
    shuffle(arr);
    
    while (arr.length > 0) {
        rows = arr.splice(0, Math.sqrt(tiles))
        arrRows.push(rows)
    }

    // Stupid bug makes the table print one row fewer then it should. This is just a throw away row.
    arrRows.push('end')
    return arrRows;
}


const mine = evt => { 
    alert('HERE');
    evt.target.style.backgroundColor = "red"
    stopTimer();
}

const safe = evt => { 
    if (evt.target.style.backgroundColor == "rgb(65, 105, 225)") {
        evt.target.style.backgroundColor = "grey"
    }
    else if (evt.target.style.backgroundColor == "rgb(182, 208, 226)"){
        evt.target.style.backgroundColor = "lightgrey"
    }
    revealed += 1
    document.getElementById('revealed').innerHTML = revealed
    

    


}

const Start = document.getElementById("start");
Start.addEventListener("click", StartGame);

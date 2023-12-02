const StartGame = () => {

    // Refreshes revealed tiles.
    revealed = 0
    document.getElementById('revealed').innerHTML = revealed

    // Resets timer, Also uses an object!
    Timer.stop();
    Timer.start();
    
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

        // Creates colored pattern shown in game.
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
            
            node.addEventListener('contextmenu', flag);

            // Gives event listeners for mines and safe squares.
            if (field[row][i] == "b") {
                node.addEventListener("click", mine);
                // Remove
                node.textContent = " ";    
            }
            else {
                node.addEventListener("click", safe);
                node.id = row + " " + i;
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
                node.textContent = " ";    
            }
            gameDiv.appendChild(node);
        }
        gameDiv.appendChild(document.createElement("br"));   
    }
}

// Timer object with start and stop functions.
const Timer = {
    timer: null,
    start: function () {
        const timerDiv = document.getElementById('timer');
        let sec = 0;
        this.timer = setInterval(function () {
            timerDiv.innerHTML = sec;
            sec++;
        }, 1000);
    },
    stop: function () {
        clearInterval(this.timer);
    }
};

// Random int generator.
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Array shuffler.
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Creates the playing field.
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

// Displays "YOU WIN" and stops the timer.
const youWin = () => {
    Timer.stop();
    let gameDiv = document.querySelector("#game");
    gameDiv.innerHTML = "<h6>YOU WIN</h6>";
}

// Flagging mechanic.
const flag = evt => { 
    evt.preventDefault();
    if (evt.target.style.background != 'url("photos/flagMinesweeper.png") 0% 0% / cover no-repeat') {
        evt.target.style.background = "url(photos/flagMinesweeper.png)"; 
        evt.target.style.backgroundSize = "cover";
        evt.target.style.backgroundRepeat = "no-repeat";
    }
    else {
        evt.target.style.background = ""; 
        evt.target.style.backgroundColor = "rgb(65, 105, 225)";
        
    }
}

// Triggers if a mine is hit
const mine = evt => { 
    if (evt.target.style.background != 'url("photos/flagMinesweeper.png") 0% 0% / cover no-repeat') {
        alert('YOU LOSE');
        evt.target.removeEventListener('click', mine);
        evt.target.removeEventListener('contextmenu', flag);
        evt.target.style.backgroundColor = "red"
        Timer.stop();
        let gameDiv = document.querySelector("#game");
        gameDiv.innerHTML = "<h5>YOU LOSE</h5>";
    }
}

// Triggers if a safe square is hit
const safe = evt => { 
    if (evt.target.style.background != 'url("photos/flagMinesweeper.png") 0% 0% / cover no-repeat') {
        evt.target.removeEventListener('click', safe);
        evt.target.removeEventListener('contextmenu', flag);
        if (evt.target.style.backgroundColor == "rgb(65, 105, 225)") {
            evt.target.style.backgroundColor = "grey"
        }
        else if (evt.target.style.backgroundColor == "rgb(182, 208, 226)"){
            evt.target.style.backgroundColor = "lightgrey"
        }
        revealed += 1
        document.getElementById('revealed').innerHTML = revealed
        const difficulty = document.querySelector("#difficulty").value;
        let field = 0;
        if (difficulty=="Beginner") {
            if (revealed == 71) {
                youWin();
            }
            field = 8;
        }
        else if (difficulty=="Intermediate") {
            if (revealed == 216) {
                youWin();
            }
            field = 16;
        }
        else if (difficulty=="Expert") {
            if (revealed == 385) {
                youWin();
            }
            field = 22;
        }

        buttonPostion = evt.target.id.split(" ");
        let row = buttonPostion[0];
        let i = buttonPostion[1];
        
        // Triggers the recursion if a 0 square is hit.
        if (evt.target.value == 0) {
            let newRowVariable = 0;
            let newIVariable = 0;
            let newId =  " ";

            // TOP LEFT
            newRowVariable = parseInt(row)-1;
            newIVariable = parseInt(i)-1;
            if (newIVariable < 0 || newRowVariable < 0) {
            }
            else {
                newId = newRowVariable + " " + newIVariable;
                document.getElementById(newId).click();
            }
            
            // TOP
            newRowVariable = parseInt(row)-1;
            newIVariable = parseInt(i);
            if (newRowVariable < 0) {
            }
            else {
                newId = newRowVariable + " " + newIVariable;
                document.getElementById(newId).click();
            }

            // TOP RIGHT
            newRowVariable = parseInt(row)-1;
            newIVariable = parseInt(i)+1;
            if (newIVariable > field || newRowVariable < 0) {
            }
            else {
                newId = newRowVariable + " " + newIVariable;
                document.getElementById(newId).click();
            }

            // LEFT
            newRowVariable = parseInt(row);
            newIVariable = parseInt(i)-1;
            if (newIVariable < 0) {
            }
            else {
                newId = newRowVariable + " " + newIVariable;
                document.getElementById(newId).click();
            }

            // RIGHT
            newRowVariable = parseInt(row);
            newIVariable = parseInt(i)+1;
            if (newIVariable > field) {
            }
            else {
                newId = newRowVariable + " " + newIVariable;
                document.getElementById(newId).click();
            }

            // BOTTOM LEFT
            newRowVariable = parseInt(row)+1;
            newIVariable = parseInt(i)-1;
            if (newIVariable < 0 || newRowVariable > field) {
            }
            else {
                newId = newRowVariable + " " + newIVariable;
                document.getElementById(newId).click();
            }

            // BOTTOM
            newRowVariable = parseInt(row)+1;
            newIVariable = parseInt(i);
            if (newRowVariable > field) {
            }
            else {
                newId = newRowVariable + " " + newIVariable;
                document.getElementById(newId).click();
            }
            
            // BOTTOM RIGHT
            newRowVariable = parseInt(row)+1;
            newIVariable = parseInt(i)+1;
            if (newIVariable > field || newRowVariable > field) {
            }
            else {
                newId = newRowVariable + " " + newIVariable;
                document.getElementById(newId).click();
            }
            evt.target.textContent =  " "
        }
        else {
            evt.target.textContent = evt.target.value;
        }
        
        
    }
    
    
}

const Start = document.getElementById("start");
Start.addEventListener("click", StartGame);
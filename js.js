function undo(moveArray) {
    if (moveArray.length > 0) {
        let last = moveArray.length - 1
        moveArray[last].classList.remove('x', 'o')
        moveArray[last].innerHTML = ''
        moveArray.pop()
        currentPlayer = (currentPlayer == player2) ? player1 : player2
    }
}
function saveGame(saveArray) {
    /* let saveId = JSON.stringify(saveArray)
    console.log(JSON.parse(saveId))
    localStorage.saveMoveId = saveId
    console.log(saveId) */

    var savID = saveArray.map(f => f.id)
    var savInner = saveArray.map(f => f.innerHTML)
    let saveId = JSON.stringify(savID)
    let saveIn = JSON.stringify(savInner)
    localStorage.saveMoveId = saveId
    localStorage.saveMoveIN = saveIn
    console.log(saveId)
    console.log(saveIn)
}


//אובייקטים של שחקן 1 ו2
var player1 = {
    name: "aviad", //prompt("player 1: Enter your name"),
    shape: "x",
    cssClass: "x"
}

var player2 = {
    name: "gilad", //prompt("player 2: Enter your name"),
    shape: "o",
    cssClass: "o"
}
let currentPlayer = player1
function loadGame() {
    reset()
    var savedGameId = JSON.parse(localStorage.saveMoveId)
    var savedGameShap = JSON.parse(localStorage.saveMoveIN)
    console.log(savedGameId)
    console.log(savedGameShap)
    for (var index = 0; index < savedGameId.length; index++) {
        let playerShap = document.getElementById(savedGameId[index]).innerHTML = savedGameShap[index]
        if (playerShap == player1.shape) {
            document.getElementById(savedGameId[index]).classList.add(player1.cssClass)
        }
        else if (playerShap == player2.shape) {
            document.getElementById(savedGameId[index]).classList.add(player2.cssClass)
        }
    }
    let torload = savedGameShap.length - 1
    if (savedGameShap[torload] == player1.shape) { currentPlayer = player2 }
    else if (savedGameShap[torload] == player2.shape) { currentPlayer = player1 }
}

let win

let moves = []

let combination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
var loadMoveC

var board = document.querySelector("#board")
function checkWin(box, shape) {
    //מוציא את האות B מהמיקום
    var pos = Number(box.id.replace("b", ""))
    //משתנה שלוקח מרשימת הפשרויות ניצחון רק את הרלוונטיות
    var rellavanty = combination.filter(c => c.includes(pos))
    for (c of rellavanty) {
        var x = c.map(rr => {
            return (document.getElementById(`b${rr}`).innerText == shape) ? 1 : 0
        })
        if (x.reduce((a, b) => a + b, 0) == 3) {
            alert("winnnnnnnnnnnn")
            let movC = moves.length
            if (localStorage.getItem("min") === null) {
                localStorage.min = movC;
            }

            else {
                if (movC < parseInt(localStorage.getItem("min"))) {
                    localStorage.min = movC;
                }
            }
            win = true
            console.log(win)
            return true
            
        }

        //  debugger
    }
    // debugger;




    return false
}


// האם חברי הקומבנציה שווים ל-shape




// פונקציה שתפעל בעת לחיצה
function sign(box) {
    /* בדיקת תא פנוי */
    // להכיר את התא
    if (box.innerHTML == '') {

        /* סימון עצמי */
        box.innerText = currentPlayer.shape
        box.classList.add(currentPlayer.cssClass)

        /* שמירת מהלך */
        moves.push(box)

        /* בדיקת ניצחון */
        checkWin(box, currentPlayer.shape)

        /* החלפת תור */
        currentPlayer = (currentPlayer == player2) ? player1 : player2
        if (moves.length == 9) { console.log("sdfds") }
    }
}



if (win = true) { board.removeEventListener("clicjk", (e) => sign()) }
board.addEventListener("click", (e) => sign(e.target))

// board.addEventListener(s'click', function (e) {
//         console.log(e)
//         if (currentPlayer == "x") {
//             if (e.target.innerHTML == "") {
//                 e.target.innerHTML = player1.shape
//                 e.target.classList.add(player1.cssClass)
//                 currentPlayer = "o"
//                 arrtor.push(e.target.id);
//                 console.log(e.target.id)
//             }
//             for (let i = 0; i < arrtor.length; i++) {
//                 ff.push(Number(arrtor[i].replace("b", "")))
//             }
//         }
//         else {
//             if (e.target.innerHTML == "") {
//                 e.target.innerHTML = player2.shape
//                 e.target.classList.add('o')
//                 currentPlayer = "x"
//                 arrtor.push(e.target.id);
//             }

//         }
//     })

function reset() {
    document.querySelectorAll('.box').forEach(element => {
        element.classList.remove('x', 'o')
        element.innerHTML = ''
    });
    moves = []
}
function showC() {
    alert(loadMoveC)
}
function timer() { }


// Simon the Drummer

//-----------------------------------------------------------------------------------------//
// Current Game Pattern
let track, playerTrack = [];

// Important variables
let flash, turn, win;
let okay; // Whether you're not losing or not
let compTurn; // Whose turn is it now
let intervalID;
let sound, anim = true;
let on, start = false;

// Interactable Stuff
const points = document.querySelector("#score");
const hi = document.querySelector("#hiscore");
const turnCount = document.querySelector("#counter");
const bRed = document.querySelector("#b_red");
const bBlu = document.querySelector("#b_blue");
const bGrn = document.querySelector("#b_green");
const bYlw = document.querySelector("#b_yellow");
const simon = document.querySelector("#simon");

// Drum Sounds
let a_drum_1 = new Audio('https://github.com/CamnItAll/SimonTheDrummer/raw/refs/heads/main/Assets/Sounds/drum_1.mp3');
let a_drum_2 = new Audio('https://github.com/CamnItAll/SimonTheDrummer/raw/refs/heads/main/Assets/Sounds/drum_2.mp3');
let a_drum_3 = new Audio('https://github.com/CamnItAll/SimonTheDrummer/raw/refs/heads/main/Assets/Sounds/drum_3.mp3');
let a_drum_4 = new Audio('https://github.com/CamnItAll/SimonTheDrummer/raw/refs/heads/main/Assets/Sounds/drum_4.mp3');
let a_drum_w = new Audio('https://github.com/CamnItAll/SimonTheDrummer/raw/refs/heads/main/Assets/Sounds/drum_next.mp3');
let a_drum_l = new Audio('https://github.com/CamnItAll/SimonTheDrummer/raw/refs/heads/main/Assets/Sounds/drum_solo.mp3')

//-----------------------------------------------------------------------------------------//
// Animations
// Step 1: Set up the frames
const drum_next = [
    "Assets/drummer_end_1.png", "Assets/drummer_end_2.png", "Assets/drummer_end_3.png", "Assets/drummer_end_4.png",
    "Assets/drummer_idle.png"
];
const drum_1 = [
    "Assets/drummer_hit_red_1.png", "Assets/drummer_hit_red_2.png", "Assets/drummer_hit_red_3.png", "Assets/drummer_hit_red_4.png",
    "Assets/drummer_idle.png"
];
const drum_2 = [
    "Assets/drummer_hit_blue_1.png", "Assets/drummer_hit_blue_2.png", "Assets/drummer_hit_blue_3.png", "Assets/drummer_hit_blue_4.png",
    "Assets/drummer_idle.png"
];
const drum_3 = [
    "Assets/drummer_hit_green_1.png", "Assets/drummer_hit_green_2.png", "Assets/drummer_hit_green_3.png", "Assets/drummer_hit_green_4.png",
    "Assets/drummer_idle.png"
];
const drum_4 = [
    "Assets/drummer_hit_yellow_1.png", "Assets/drummer_hit_yellow_2.png", "Assets/drummer_hit_yellow_3.png", "Assets/drummer_hit_yellow_4.png",
    "Assets/drummer_idle.png"
];
const drum_lose = [
    "Assets/drummer_hit_red_1.png", "Assets/drummer_hit_red_2.png", "Assets/drummer_hit_red_3.png",
    "Assets/drummer_hit_blue_1.png", "Assets/drummer_hit_blue_2.png", "Assets/drummer_hit_blue_3.png",
    "Assets/drummer_hit_green_1.png", "Assets/drummer_hit_green_2.png", "Assets/drummer_hit_green_3.png",
    "Assets/drummer_hit_yellow_1.png", "Assets/drummer_hit_yellow_2.png", "Assets/drummer_hit_yellow_3.png",
    "Assets/drummer_hit_blue_alt_1.png", "Assets/drummer_hit_blue_alt_2.png", "Assets/drummer_hit_blue_alt_3.png",
    "Assets/drummer_hit_green_alt_1.png", "Assets/drummer_hit_green_alt_2.png", "Assets/drummer_hit_green_alt_3.png",
    "Assets/drummer_end_1.png", "Assets/drummer_end_2.png", "Assets/drummer_end_3.png", "Assets/drummer_end_4.png", "Assets/drummer_end_4.png",
    "Assets/drummer_end_1.png", "Assets/drummer_end_2.png", "Assets/drummer_end_1.png", "Assets/drummer_end_2.png", "Assets/drummer_end_3.png",
    "Assets/drummer_end_4.png"
];

// Step 2: Make the animations
function beatNext() {
    let index = 0;
    function frameBeatNext() {
        const image = drum_next[index++];
        if (!image) return; 
        simon.src = image;
        setTimeout(frameBeatNext, 40);
    };
    frameBeatNext();
}
function beat1() {
    if (anim) {
        let index = 0;
        function frameBeat1() {
            const image = drum_1[index++];
            if (!image) return; 
            simon.src = image;
            setTimeout(frameBeat1, 40);
        };
        frameBeat1();
    }
}
function beat2() {
    if (anim) {
        let index = 0;
        function frameBeat2() {
            const image = drum_2[index++];
            if (!image) return; 
            simon.src = image;
            setTimeout(frameBeat2, 40);
        };
        frameBeat2();
    }
}
function beat3() {
    if (anim) {
        let index = 0;
        function frameBeat3() {
            const image = drum_3[index++];
            if (!image) return; 
            simon.src = image;
            setTimeout(frameBeat3, 40);
        };
        frameBeat3();
    }
}
function beat4() {
    if (anim) {
        let index = 0;
        function frameBeat4() {
            const image = drum_4[index++];
            if (!image) return; 
            simon.src = image;
            setTimeout(frameBeat4, 40);
        };
        frameBeat4();
    }
}
function beatLoss() {
    let index = 0;
    function frameBeatLoss() {
        const image = drum_lose[index++];
        if (!image) return; 
        simon.src = image;
        setTimeout(frameBeatLoss, 40);
    };
    frameBeatLoss();
}

//-----------------------------------------------------------------------------------------//
// Display the current high score on load
function displayScore() {
    var score = localStorage.getItem("hiscore");
    if (score) {
        hi.innerHTML = `Your Best Score: ${score}`; }
}

// Start the game (by clicking on the bubble above the guy)
turnCount.addEventListener('click', (event) => {
    if (start == false) {
        start = true;
        turnCount.style.cursor = "default";
        theShow = document.getElementById("hiscore");
        theShow.scrollIntoView({ behavior: "smooth" });
        points.innerHTML = "";
        play();
    }
});

// Main Game
function play() {
    // Initialize the game
    win = false;
    track = [];
    playerTrack = [];
    flash = 0;
    intervalID = 0;
    turn = 1;
    clearColor();
    points.innerHTML = 0;
    okay = true;

    a_drum_w.play();
    beatNext();

    // Start Game Loop
    setTimeout(() => {
        // Start the track by adding a random beat between 1 and 4.
        track.push(Math.floor(Math.random()*4) + 1);
        compTurn = true;
        intervalID = setInterval(gameTurn, 500);
    }, 350)
}

//-----------------------------------------------------------------------------------------//
// The Game Loop
function gameTurn() {
    on = false;
    sound = true;
    anim = true;

    if (flash == turn) {
        clearInterval(intervalID);
        compTurn = false;
        clearColor();
        on = true;
    }
    if (compTurn) {
        clearColor();
        setTimeout(() => {
            // Flash a button depending on what's next in "track"
            if (track[flash] == 1) one();
            if (track[flash] == 2) two();
            if (track[flash] == 3) tre();
            if (track[flash] == 4) fur();
            flash++;
        }, 200); // Wait 200 ms before doing that again
    }
}

// Button Flashes
function one() {
    if (sound) {
        a_drum_1.cloneNode(true).play();
    }
    sound = true;
    bRed.style.backgroundColor = "white";
    bRed.style.borderColor = "red";
}
function two() {
    if (sound) {
        a_drum_2.cloneNode(true).play();
    }
    sound = true;
    bBlu.style.backgroundColor = "white";
    bBlu.style.borderColor = "blue";
}
function tre() {
    if (sound) {
        a_drum_3.cloneNode(true).play();
    }
    sound = true;
    bGrn.style.backgroundColor = "white";
    bGrn.style.borderColor = "green";
}
function fur() {
    if (sound) {
        a_drum_4.cloneNode(true).play();
    }
    sound = true;
    bYlw.style.backgroundColor = "white";
    bYlw.style.borderColor = "yellow";
}
function clearColor() {
    bRed.style.backgroundColor = "red";
    bRed.style.borderColor = "white";
    bBlu.style.backgroundColor = "blue";
    bBlu.style.borderColor = "white";
    bGrn.style.backgroundColor = "green";
    bGrn.style.borderColor = "white";
    bYlw.style.backgroundColor = "yellow";
    bYlw.style.borderColor = "white";
}

// Click the Buttons
bRed.addEventListener("click", (event) => {
    if (on && okay) {
        playerTrack.push(1);
        compare();
        one();
        beat1();
        setTimeout(() => {
            clearColor();
        }, 200);
    }
});
bBlu.addEventListener("click", (event) => {
    if (on && okay) {
        playerTrack.push(2);
        compare();
        two();
        beat2();
        setTimeout(() => {
            clearColor();
        }, 200);
    }
});
bGrn.addEventListener("click", (event) => {
    if (on && okay) {
        playerTrack.push(3);
        compare();
        tre();
        beat3();
        setTimeout(() => {
            clearColor();
        }, 200);
    }
});
bYlw.addEventListener("click", (event) => {
    if (on && okay) {
        playerTrack.push(4);
        compare();
        fur();
        beat4();
        setTimeout(() => {
            clearColor();
        }, 200);
    }
});

//-----------------------------------------------------------------------------------------//
// Did the player do it right?
function compare() {
    // If not:
    if (playerTrack[playerTrack.length - 1] !== track[playerTrack.length - 1]) {
        okay = false;
    }
    if (okay == false) {
        // End sequence
        points.innerHTML = "Game Over!";
        sound = false;
        anim = false;
        a_drum_l.play();
        beatLoss();
        setTimeout(() => {
            // Reset the drummer and the bubble
            start = false;
            turnCount.style.cursor = "pointer";
            simon.src = "Assets/drummer_idle.png";
            points.innerHTML = "Click here to play again!";
        }, 2500);
    }

    // At the end of each track:
    if (turn == playerTrack.length && okay && !win) {
        turn++;
        sound = false;
        a_drum_w.play();

        // If the player makes the high score, do something about it.
        var score = localStorage.getItem("hiscore");
        var thisScore = turn - 1;
        if (score < thisScore) {
            localStorage.setItem("hiscore", thisScore);
            hi.innerHTML = `Your Best Score: ${thisScore}`;
        }

        // Add new beat to the track
        track.push(Math.floor(Math.random()*4) + 1);

        // Reset some stuff
        playerTrack = [];
        compTurn = true;
        flash = 0;
        points.innerHTML = (turn - 1);
        // Replay the interval
        intervalID = setInterval(gameTurn, 800);
    }
}

// For unused win condition
function youWinga() {
    a_drum_w.play();
    points.innerHTML = "end";
    on = false;
    win = true;

}

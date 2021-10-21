// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 544;
document.getElementById("theCanvas").appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "background.jpg";

// Bug image
var bugReady = false;
var bugImage = new Image();
bugImage.onload = function () {
    bugReady = true;
};
bugImage.src = "bug.jpg";

// initialize score to 0
var score = 0;
// initialize hop interval to 2 seconds
var hopInterval = 2000;
//set hopping 
var hop = setInterval(function () {
    resetLocation();
}, hopInterval);

var bug = {
    speed: 256 // movement in pixels per second
};

// Handle mouse click events to check if the user clicked
// on the bug
canvas.addEventListener("mousedown", clicked, false);
function clicked(e) {
    e.preventDefault();
    // Get the location of the mouse click
    var x = e.clientX;
    var y = e.clientY;

    // check if the player clicked on the bug
    if (x > bug.x && x < bug.x + 61 && y > bug.y && y < bug.y + 169) {
        // increment score by 10
        score += 10;
        resetLocation();
        // reduce hop interval, but should not be less than 0
        if (hopInterval - 100 >= 50) {
            clearInterval(hop);
            hopInterval -= 100;
            hop = setInterval(function () {
                resetLocation();
            }, hopInterval);

        }
    }
}

// Reset the bug location when the player restarts or catches a bug
var resetLocation = function () {
    // Throw the bug somewhere on the screen randomly
    bug.x = 32 + (Math.random() * (canvas.width - 64));
    bug.y = 32 + (Math.random() * (canvas.height - 64));
};

// Reset hopping interval
var resetSpeed = function () {
    clearInterval(hop);
    hopInterval = 2000;
    hop = setInterval(function () {
        resetLocation();
    }, hopInterval);
};
var resetScore = function () {
    score = 0;
    // reset the speed
    resetSpeed();
};

// Draw everything
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (bugReady) {
        ctx.drawImage(bugImage, bug.x, bug.y);
    }

    // Score
    ctx.fillStyle = "rgb(0, 0, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    document.getElementById("score").innerHTML = "Score : " + score;
};

// The main game loop
var main = function () {
    render();

    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame
        || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Play game
main();
original.js

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
        bgReady = true;
};
bgImage.src = "background.png";

// Hero image
var bugReady = false;
var bugImage = new Image();
bugImage.onload = function () {
        bugReady = true;
};
bugImage.src = "bug.jpg";



// Game objects
var bug = {
        speed: 256 // movement in pixels per second
};



var keysDown = {};

addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
}, false);


//Update game objects
var update = function (modifier) {
        if (38 in keysDown) { 
                bug.y -= bug.speed * modifier;
        }
        if (40 in keysDown) { 
                bug.y += bug.speed * modifier;
        }
        if (37 in keysDown) { 
                bug.x -= bug.speed * modifier;
        }
        if (39 in keysDown) { 
                bug.x += bug.speed * modifier;
        }

        //do they touch
        if (
                bug.x <= (monster.x + 32)
                && monster.x <= (bug.x + 32)
                && bug.y <= (monster.y + 32)
                && monster.y <= (bug.y + 32)
        ) {
                ++monstersCaught;
                reset();
        }
};


var render = function () {
        if (bgReady) {
                ctx.drawImage(bgImage, 0, 0);
        }

        if (bugReady) {
                ctx.drawImage(bugImage, bug.x, bug.y);
        }

        if (monsterReady) {
                ctx.drawImage(monsterImage, monster.x, monster.y);
        }

        //Score
        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
};

//  game loop
var main = function () {
        var now = Date.now();
        var delta = now - then;

        update(delta / 1000);
        render();

        then = now;


        requestAnimationFrame(main);
};


var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame 
        || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
// play this game!
reset();
main();
Assignment5.html
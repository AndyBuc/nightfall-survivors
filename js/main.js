import {
    loadHighScores,
    saveLevelScore,
    saveOverallScore,
    saveInfiniteScore
} from "./storage.js";


import {
    levels,
    getLevelBackground
} from "./levels.js";


import {
    player,
    resetPlayer,
    updatePlayer
} from "./player.js";


import {
    enemies,
    resetEnemies,
    createEnemy,
    updateEnemies,
    drawEnemies
} from "./enemies.js";


import {
    projectiles,
    resetProjectiles,
    playerAttack,
    updateProjectiles,
    checkProjectileCollisions,
    drawProjectiles
} from "./weapons.js";


import {
    resetGameplay,
    checkEnemyCollisions,
    createXPGem,
    updateXPGems,
    checkLevelUp,
    drawXPGems,
    isPlayerHit
} from "./gameplay.js";


import {
    updateHUD,
    updateHighScoreDisplay,
    showUpgradeScreen,
    showGameOver,
    showLevelComplete,
    hideLevelComplete,
    showPauseScreen,
    hidePauseScreen
} from "./ui.js";


import {
    resetObstacles,
    createLevelObstacles,
    drawObstacles
} from "./obstacles.js";


// ------------------------------------
// CANVAS
// ------------------------------------

const canvas =
    document.getElementById(
        "gameCanvas"
    );

const ctx =
    canvas.getContext("2d");

const GAME_WIDTH =
    canvas.width;

const GAME_HEIGHT =
    canvas.height;


// ------------------------------------
// SCREENS
// ------------------------------------

const startScreen =
    document.getElementById(
        "startScreen"
    );


const mainMenuScreen =
    document.getElementById(
        "mainMenuScreen"
    );


const gameModeScreen =
    document.getElementById(
        "gameModeScreen"
    );


const highScoresScreen =
    document.getElementById(
        "highScoresScreen"
    );


const aboutScreen =
    document.getElementById(
        "aboutScreen"
    );


const pauseScreen =
    document.getElementById(
        "pauseScreen"
    );


const gameOverScreen =
    document.getElementById(
        "gameOverScreen"
    );


const levelCompleteScreen =
    document.getElementById(
        "levelCompleteScreen"
    );


const hud =
    document.getElementById(
        "hud"
    );


const xpBarContainer =
    document.getElementById(
        "xpBarContainer"
    );


const victoryScreen =
    document.getElementById(
        "victoryScreen"
    );


// ------------------------------------
// BUTTONS
// ------------------------------------

const startButton =
    document.getElementById(
        "startButton"
    );


const playButton =
    document.getElementById(
        "playButton"
    );


const campaignModeButton =
    document.getElementById(
        "campaignModeButton"
    );


const infiniteModeButton =
    document.getElementById(
        "infiniteModeButton"
    );


const gameModeBackButton =
    document.getElementById(
        "gameModeBackButton"
    );


const highScoresButton =
    document.getElementById(
        "highScoresButton"
    );


const aboutButton =
    document.getElementById(
        "aboutButton"
    );


const highScoresBackButton =
    document.getElementById(
        "highScoresBackButton"
    );


const aboutBackButton =
    document.getElementById(
        "aboutBackButton"
    );


const resumeButton =
    document.getElementById(
        "resumeButton"
    );


const pauseMainMenuButton =
    document.getElementById(
        "pauseMainMenuButton"
    );


const victoryPlayAgainButton =
    document.getElementById(
        "victoryPlayAgainButton"
    );


const victoryMainMenuButton =
    document.getElementById(
        "victoryMainMenuButton"
    );


// ------------------------------------
// GAME STATE
// ------------------------------------

let currentLevel = 1;

let overallRunScore = 0;

let gameMode = "campaign";

let highScores =
    loadHighScores();

let survivalTime = 0;

let kills = 0;

let score = 0;

let enemySpawnTimer = 0;

let gameRunning = false;

let gamePaused = false;

let lastTime = 0;


// ------------------------------------
// INPUT
// ------------------------------------

const keys = {};


window.addEventListener(
    "keydown",
    function(event) {

        keys[
            event.key.toLowerCase()
        ] = true;

    }
);


window.addEventListener(
    "keyup",
    function(event) {

        keys[
            event.key.toLowerCase()
        ] = false;

    }
);


// ------------------------------------
// START SCREEN
// ------------------------------------

startButton.addEventListener(
    "click",
    function() {

        startScreen.classList.add(
            "hidden"
        );

        mainMenuScreen.classList.remove(
            "hidden"
        );

    }
);


// ------------------------------------
// MAIN MENU
// ------------------------------------

playButton.addEventListener(
    "click",
    function() {

        mainMenuScreen.classList.add(
            "hidden"
        );

        gameModeScreen.classList.remove(
            "hidden"
        );

    }
);


highScoresButton.addEventListener(
    "click",
    function() {

        updateHighScoreDisplay(
            highScores
        );

        mainMenuScreen.classList.add(
            "hidden"
        );

        highScoresScreen.classList.remove(
            "hidden"
        );

    }
);


aboutButton.addEventListener(
    "click",
    function() {

        mainMenuScreen.classList.add(
            "hidden"
        );

        aboutScreen.classList.remove(
            "hidden"
        );

    }
);


// ------------------------------------
// GAME MODE SELECTION
// ------------------------------------

campaignModeButton.addEventListener(
    "click",
    function() {

        gameMode =
            "campaign";

        gameModeScreen.classList.add(
            "hidden"
        );

        startNewRun();

    }
);


infiniteModeButton.addEventListener(
    "click",
    function() {

        gameMode =
            "infinite";

        gameModeScreen.classList.add(
            "hidden"
        );

        startNewRun();

    }
);


gameModeBackButton.addEventListener(
    "click",
    function() {

        gameModeScreen.classList.add(
            "hidden"
        );

        mainMenuScreen.classList.remove(
            "hidden"
        );

    }
);


// ------------------------------------
// HIGH SCORES
// ------------------------------------

highScoresBackButton.addEventListener(
    "click",
    function() {

        highScoresScreen.classList.add(
            "hidden"
        );

        mainMenuScreen.classList.remove(
            "hidden"
        );

    }
);


// ------------------------------------
// ABOUT
// ------------------------------------

aboutBackButton.addEventListener(
    "click",
    function() {

        aboutScreen.classList.add(
            "hidden"
        );

        mainMenuScreen.classList.remove(
            "hidden"
        );

    }
);


// ------------------------------------
// PAUSE
// ------------------------------------

resumeButton.addEventListener(
    "click",
    function() {

        hidePauseScreen();

        gamePaused = false;

        lastTime =
            performance.now();

    }
);


pauseMainMenuButton.addEventListener(
    "click",
    function() {

        gameRunning = false;

        gamePaused = false;

        hidePauseScreen();

        hud.classList.add(
            "hidden"
        );

        xpBarContainer.classList.add(
            "hidden"
        );

        mainMenuScreen.classList.remove(
            "hidden"
        );

    }
);


// ------------------------------------
// ESCAPE = PAUSE
// ------------------------------------

window.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape" &&
            gameRunning
        ) {

            const upgradeScreen =
                document.querySelector(
                    ".upgrade-overlay"
                );


            if (upgradeScreen) {

                return;

            }


            if (gamePaused) {

                hidePauseScreen();

                gamePaused = false;

                lastTime =
                    performance.now();

            } else {

                gamePaused = true;

                showPauseScreen();

            }

        }

    }
);


// ------------------------------------
// VICTORY
// ------------------------------------

victoryPlayAgainButton.addEventListener(
    "click",
    function() {

        victoryScreen.classList.add(
            "hidden"
        );

        gameMode =
            "campaign";

        currentLevel = 1;

        overallRunScore = 0;

        startGame();

    }
);


victoryMainMenuButton.addEventListener(
    "click",
    function() {

        victoryScreen.classList.add(
            "hidden"
        );

        currentLevel = 1;

        overallRunScore = 0;

        gameMode =
            "campaign";

        mainMenuScreen.classList.remove(
            "hidden"
        );

    }
);


// ------------------------------------
// START NEW RUN
// ------------------------------------

function startNewRun() {

    overallRunScore = 0;


    if (
        gameMode === "infinite"
    ) {

        currentLevel = 5;

    } else {

        currentLevel = 1;

    }


    startGame();

}


// ------------------------------------
// START GAME / LEVEL
// ------------------------------------

function startGame() {

    resetPlayer(
        GAME_WIDTH,
        GAME_HEIGHT
    );


    resetEnemies();


    resetProjectiles();


    resetGameplay();


    resetObstacles();


    createLevelObstacles(
        GAME_WIDTH,
        GAME_HEIGHT,
        currentLevel
    );


    survivalTime = 0;

    kills = 0;

    score = 0;

    enemySpawnTimer = 0;

    gamePaused = false;

    gameRunning = true;


    startScreen.classList.add(
        "hidden"
    );


    mainMenuScreen.classList.add(
        "hidden"
    );


    gameModeScreen.classList.add(
        "hidden"
    );


    highScoresScreen.classList.add(
        "hidden"
    );


    aboutScreen.classList.add(
        "hidden"
    );


    gameOverScreen.classList.add(
        "hidden"
    );


    levelCompleteScreen.classList.add(
        "hidden"
    );


    victoryScreen.classList.add(
        "hidden"
    );


    hidePauseScreen();


    hud.classList.remove(
        "hidden"
    );


    xpBarContainer.classList.remove(
        "hidden"
    );


    updateHUD(
        gameMode === "infinite"
            ? "Infinite Mode"
            : levels[currentLevel].name,
        survivalTime,
        kills,
        score
    );


    lastTime =
        performance.now();


    requestAnimationFrame(
        gameLoop
    );

}


// ------------------------------------
// LEVEL COMPLETE
// ------------------------------------

function completeLevel() {

    gamePaused = true;


    saveLevelScore(
        highScores,
        currentLevel,
        score
    );


    overallRunScore +=
        score;


    saveOverallScore(
        highScores,
        overallRunScore
    );


    showLevelComplete(
        currentLevel,
        score,
        overallRunScore,

        function() {

            currentLevel++;


            if (
                currentLevel > 5
            ) {

                saveOverallScore(
                    highScores,
                    overallRunScore
                );


                showVictoryScreen();


                currentLevel = 1;


                return;

            }


            hideLevelComplete();

            startGame();

        }
    );

}


// ------------------------------------
// VICTORY SCREEN
// ------------------------------------

function showVictoryScreen() {

    gameRunning = false;

    gamePaused = false;


    levelCompleteScreen.classList.add(
        "hidden"
    );


    gameOverScreen.classList.add(
        "hidden"
    );


    hud.classList.add(
        "hidden"
    );


    xpBarContainer.classList.add(
        "hidden"
    );


    document.getElementById(
        "victoryStats"
    ).innerHTML = `

        You survived all five levels!<br><br>

        Total Kills:
        <strong>${kills}</strong><br>

        Final Score:
        <strong>${overallRunScore}</strong>

    `;


    victoryScreen.classList.remove(
        "hidden"
    );

}


// ------------------------------------
// ENEMY KILLED
// ------------------------------------

function handleEnemyKilled(
    enemy
) {

    createXPGem(
        enemy
    );


    kills++;


    score += 10;

}


// ------------------------------------
// GAME OVER
// ------------------------------------

function endGame() {

    gameRunning = false;

    gamePaused = false;


    if (
        gameMode === "infinite"
    ) {

        saveInfiniteScore(
            highScores,
            score
        );

    } else {

        saveLevelScore(
            highScores,
            currentLevel,
            score
        );


        overallRunScore +=
            score;


        saveOverallScore(
            highScores,
            overallRunScore
        );

    }


    showGameOver(
        survivalTime,
        kills,
        score,
        overallRunScore,

        // PLAY AGAIN

        function() {

            overallRunScore = 0;


            if (
                gameMode === "infinite"
            ) {

                currentLevel = 5;

            } else {

                currentLevel = 1;

            }


            startGame();

        },

        // MAIN MENU

        function() {

            gameOverScreen.classList.add(
                "hidden"
            );


            hud.classList.add(
                "hidden"
            );


            xpBarContainer.classList.add(
                "hidden"
            );


            mainMenuScreen.classList.remove(
                "hidden"
            );

        }
    );

}


// ------------------------------------
// UPDATE
// ------------------------------------

function update(dt) {

    survivalTime += dt;


    // ------------------------------------
    // CAMPAIGN LEVEL TIMER
    // ------------------------------------

    if (
        gameMode === "campaign"
    ) {

        if (
            survivalTime >=
            levels[currentLevel].duration
        ) {

            completeLevel();

            return;

        }

    }


    // ------------------------------------
    // INFINITE DIFFICULTY
    // ------------------------------------

    let difficultyMultiplier = 1;


    if (
        gameMode === "infinite"
    ) {

        const difficultyTier =
            Math.floor(
                survivalTime / 60
            );


        difficultyMultiplier =
            1 +
            (
                difficultyTier *
                0.15
            );

    }


    // ------------------------------------
    // PLAYER MOVEMENT
    // ------------------------------------

    updatePlayer(
        dt,
        keys,
        GAME_WIDTH,
        GAME_HEIGHT
    );


    // ------------------------------------
    // ENEMY MOVEMENT AND AI
    // ------------------------------------

    updateEnemies(
        dt,
        GAME_WIDTH,
        GAME_HEIGHT,
        currentLevel,
        difficultyMultiplier
    );


    // ------------------------------------
    // AUTOMATIC WEAPON
    // ------------------------------------

    playerAttack(dt);


    // ------------------------------------
    // PROJECTILE MOVEMENT
    // ------------------------------------

    updateProjectiles(
        dt,
        GAME_WIDTH,
        GAME_HEIGHT,
        handleEnemyKilled
    );


    // ------------------------------------
    // PROJECTILE COLLISIONS
    // ------------------------------------

    checkProjectileCollisions(
        handleEnemyKilled
    );


    // ------------------------------------
    // ENEMY / PLAYER COLLISIONS
    // ------------------------------------

    checkEnemyCollisions(
        dt,
        endGame
    );


    // ------------------------------------
    // XP MOVEMENT AND COLLECTION
    // ------------------------------------

    updateXPGems(dt);


    // ------------------------------------
    // LEVEL UP
    // ------------------------------------

    checkLevelUp(
        function() {

            gamePaused = true;


            showUpgradeScreen(
                function() {

                    gamePaused = false;

                    lastTime =
                        performance.now();

                }
            );

        }
    );


    // ------------------------------------
    // ENEMY SPAWNING
    // ------------------------------------

    enemySpawnTimer -= dt;


    if (
        enemySpawnTimer <= 0
    ) {

        createEnemy(
            GAME_WIDTH,
            GAME_HEIGHT,
            currentLevel,
            difficultyMultiplier,
            survivalTime
        );


        enemySpawnTimer =
            levels[currentLevel].spawnRate /
            difficultyMultiplier;

    }


    // ------------------------------------
    // HUD
    // ------------------------------------

    updateHUD(
        gameMode === "infinite"
            ? "Infinite Mode"
            : levels[currentLevel].name,
        survivalTime,
        kills,
        score
    );

}


// ------------------------------------
// GAME LOOP
// ------------------------------------

function gameLoop(
    currentTime
) {

    if (!gameRunning) {

        draw();

        return;

    }


    const deltaTime =
        (
            currentTime -
            lastTime
        ) / 1000;


    lastTime =
        currentTime;


    const dt =
        Math.min(
            deltaTime,
            0.05
        );


    if (!gamePaused) {

        update(dt);

    }


    draw();


    requestAnimationFrame(
        gameLoop
    );

}


// ------------------------------------
// DRAW
// ------------------------------------

function draw() {

    ctx.fillStyle =
        getLevelBackground(
            currentLevel
        );


    ctx.fillRect(
        0,
        0,
        GAME_WIDTH,
        GAME_HEIGHT
    );


    drawGrid();

    drawObstacles(ctx);

    drawXPGems(ctx);

    drawEnemies(ctx);

    drawProjectiles(ctx);

    drawPlayer();

}


// ------------------------------------
// GRID
// ------------------------------------

function drawGrid() {

    ctx.strokeStyle =
        "rgba(120, 80, 180, 0.12)";


    ctx.lineWidth = 1;


    const gridSize = 40;


    for (
        let x = 0;
        x <= GAME_WIDTH;
        x += gridSize
    ) {

        ctx.beginPath();

        ctx.moveTo(
            x,
            0
        );

        ctx.lineTo(
            x,
            GAME_HEIGHT
        );

        ctx.stroke();

    }


    for (
        let y = 0;
        y <= GAME_HEIGHT;
        y += gridSize
    ) {

        ctx.beginPath();

        ctx.moveTo(
            0,
            y
        );

        ctx.lineTo(
            GAME_WIDTH,
            y
        );

        ctx.stroke();

    }

}


// ------------------------------------
// PLAYER DRAWING
// ------------------------------------

function drawPlayer() {

    if (
        isPlayerHit()
    ) {

        ctx.fillStyle =
            "#ffffff";

    } else {

        ctx.fillStyle =
            "#9c5cff";

    }


    ctx.beginPath();


    ctx.arc(
        player.x,
        player.y,
        player.radius,
        0,
        Math.PI * 2
    );


    ctx.fill();


    // Player glow

    ctx.strokeStyle =
        "rgba(156, 92, 255, 0.5)";


    ctx.lineWidth = 3;


    ctx.beginPath();


    ctx.arc(
        player.x,
        player.y,
        player.radius + 4,
        0,
        Math.PI * 2
    );


    ctx.stroke();

}
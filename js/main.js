import {
    playSound,
    startBackgroundMusic,
    stopBackgroundMusic,
    stopAllSounds
} from "./audio.js";

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
    resetLevelUpState,
    drawXPGems,
    isPlayerHit
} from "./gameplay.js";


import {
    updateHUD,
    updateHighScoreDisplay,
    updateDatabaseScoreDisplay,
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
async function checkLoginStatus() {

    try {

        const response =
            await fetch(
                "http://localhost:3000/auth/status",
                {
                    credentials: "include"
                }
            );

        const data =
            await response.json();

        if (data.authenticated) {

            startScreen.classList.add(
                "hidden"
            );

            loginScreen.classList.add(
                "hidden"
            );

            mainMenuScreen.classList.remove(
                "hidden"
            );

        }

    } catch (error) {

        console.error(
            "Could not check login status:",
            error
        );

    }

}
const startScreen =
    document.getElementById(
        "startScreen"
    );

const loginScreen =
    document.getElementById(
        "loginScreen"
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

const googleLoginButton =
    document.getElementById(
        "googleLoginButton"
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
    async function() {

        const isGitHubPages =
            window.location.hostname.endsWith("github.io");

        if (isGitHubPages) {

            startScreen.classList.add("hidden");
            mainMenuScreen.classList.remove("hidden");

            return;
        }

        try {

            const response =
                await fetch(
                    "http://localhost:3000/auth/status",
                    {
                        credentials: "include"
                    }
                );

            const data =
                await response.json();

            startScreen.classList.add("hidden");

            if (data.authenticated) {

                mainMenuScreen.classList.remove("hidden");

            } else {

                loginScreen.classList.remove("hidden");

            }

        } catch (error) {

            console.error(
                "Could not check login status:",
                error
            );

            startScreen.classList.add("hidden");
            loginScreen.classList.remove("hidden");
        }
    }
);

googleLoginButton.addEventListener(
    "click",
    function() {

        const isGitHubPages =
            window.location.hostname.endsWith("github.io");

        if (isGitHubPages) {

            loginScreen.classList.add("hidden");
            mainMenuScreen.classList.remove("hidden");

            return;
        }

        window.location.href =
            "http://localhost:3000/auth/google";
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
    async function() {

        const databaseScores = await loadDatabaseScores();

        if (databaseScores) {

            console.log(
                "Using database scores:",
                databaseScores
            );

            updateDatabaseScoreDisplay(
                databaseScores
            );

        } else {

            console.log(
                "Using local high scores."
            );

            updateHighScoreDisplay(
                highScores
            );
        }

        mainMenuScreen.classList.add("hidden");
        highScoresScreen.classList.remove("hidden");
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
// LOAD SCORES FROM DATABASE
// ------------------------------------

async function loadDatabaseScores() {

    try {

        const response = await fetch(
            "http://localhost:3000/api/scores",
            {
                method: "GET",
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error(
                "Could not load database scores"
            );
        }

        const databaseScores =
            await response.json();

        console.log(
            "Scores loaded from database:",
            databaseScores
        );

        return databaseScores;

    } catch (error) {

        console.error(
            "Error loading database scores:",
            error
        );

        return null;
    }
}



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
                stopAllSounds();

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
// SAVE SCORE TO DATABASE
// ------------------------------------

async function saveScoreToDatabase(
    scoreValue,
    levelValue,
    killsValue,
    survivalTimeValue
) {
    try {
        const response = await fetch(
            "http://localhost:3000/api/scores",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    score: Math.round(scoreValue),
                    level: levelValue,
                    kills: Math.round(killsValue),
                    survivalTime: Math.round(survivalTimeValue)
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error(
                "Failed to save score:",
                data
            );
            return;
        }

        console.log(
            "Game score saved to database:",
            data
        );

    } catch (error) {
        console.error(
            "Error saving score:",
            error
        );
    }
}

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

    startBackgroundMusic();

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

        saveScoreToDatabase(
        score,
        currentLevel,
        kills,
        survivalTime
    );

    playSound("levelComplete");


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

    playSound("enemyDeath");


    kills++;


    score += 10;

}


// ------------------------------------
// GAME OVER
// ------------------------------------

function endGame() {

    gameRunning = false;

    gamePaused = false;

    saveScoreToDatabase(
    score,
    gameMode === "infinite" ? 0 : currentLevel,
    kills,
    survivalTime
);

    playSound("gameOver");


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

console.log("CHECKING LEVEL UP - PAUSED:", gamePaused);

checkLevelUp(
    function() {

        console.log("LEVEL UP CALLBACK - gamePaused:", gamePaused);


        playSound("levelUp");

        gamePaused = true;

        showUpgradeScreen(
            function() {

                resetLevelUpState();

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

checkLoginStatus();
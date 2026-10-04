// ============================================================
// UI SYSTEM
// ============================================================

import { player } from "./player.js";


// ============================================================
// DOM ELEMENTS
// ============================================================

const levelText =
    document.getElementById("levelText");

const levelName =
    document.getElementById("levelName");

const hpText =
    document.getElementById("hpText");

const xpText =
    document.getElementById("xpText");

const timeText =
    document.getElementById("timeText");

const killsText =
    document.getElementById("killsText");

const scoreText =
    document.getElementById("scoreText");

const xpBar =
    document.getElementById("xpBar");


// ============================================================
// UPDATE HUD
// ============================================================

export function updateHUD(
    levelNameValue,
    survivalTime,
    kills,
    score
) {

    levelText.textContent =
        player.level;

    levelName.textContent =
        levelNameValue;

    hpText.textContent =
        `${Math.ceil(player.hp)} / ${player.maxHp}`;

    xpText.textContent =
        `${player.xp} / ${player.xpNeeded}`;

    timeText.textContent =
        Math.floor(survivalTime);

    killsText.textContent =
        kills;

    scoreText.textContent =
        score;

    const xpPercentage =
        Math.min(
            100,
            (player.xp /
                player.xpNeeded) *
            100
        );

    xpBar.style.width =
        xpPercentage + "%";
}


// ============================================================
// NORMAL UPGRADE OPTIONS
// ============================================================

const upgrades = [

    {
        name: "Magic Bolt",

        description:
            "+1 projectile damage",

        apply: function() {

            player.attackDamage += 1;

        }
    },

    {
        name: "Rapid Cast",

        description:
            "Attack 20% faster",

        apply: function() {

            player.attackSpeed *= 0.8;

            player.attackSpeed =
                Math.max(
                    0.12,
                    player.attackSpeed
                );

        }
    },

    {
        name: "Fire Orb",

        description:
            "+1 projectile",

        apply: function() {

            player.projectileCount++;

        }
    },

    {
        name: "Vitality",

        description:
            "+25 maximum HP",

        apply: function() {

            player.maxHp += 25;

            player.hp += 25;

        }
    }

];


// ============================================================
// SPECIAL UPGRADE OPTIONS
// ============================================================

const specialUpgrades = [

    {
        id: "chainLightning",

        name: "Chain Lightning",

        apply: function() {

            player.specialUpgrades
                .chainLightning++;

        }
    },

    {
        id: "forkingBolt",

        name: "Forking Bolt",

        apply: function() {

            player.specialUpgrades
                .forkingBolt++;

        }
    },

    {
        id: "arcBlade",

        name: "Arc Blade",

        apply: function() {

            player.specialUpgrades
                .arcBlade++;

        }
    }

];


// ============================================================
// CREATE UPGRADE BUTTON
// ============================================================

function createUpgradeButton(
    upgrade,
    optionsContainer,
    overlay,
    onSelected
) {

    const button =
        document.createElement(
            "button"
        );

    button.innerHTML = `

        <strong>
            ${upgrade.name}
        </strong>

        <span>
            ${upgrade.description}
        </span>

    `;

    button.addEventListener(
        "click",
        function() {

            upgrade.apply();

            overlay.remove();

            if (onSelected) {

                onSelected();

            }

        }
    );

    optionsContainer.appendChild(
        button
    );
}


// ============================================================
// LEVEL UP SCREEN
// ============================================================

export function showUpgradeScreen(
    onSelected
) {

    const overlay =
        document.createElement("div");

    overlay.className =
        "upgrade-overlay";

    const isSpecialLevel =
        player.level % 2 === 0;

    overlay.innerHTML = `

        <div class="upgrade-box">

            <h2>
                ${
                    isSpecialLevel
                        ? "SPECIAL UPGRADE!"
                        : "LEVEL UP!"
                }
            </h2>

            <p>
                ${
                    isSpecialLevel
                        ? "Choose a special ability"
                        : "Choose an upgrade"
                }
            </p>

            <div class="upgrade-options"></div>

        </div>

    `;

    document.body.appendChild(
        overlay
    );

    const optionsContainer =
        overlay.querySelector(
            ".upgrade-options"
        );


    // ========================================================
    // SPECIAL UPGRADES
    // ========================================================

    if (isSpecialLevel) {

        specialUpgrades.forEach(
            function(upgrade) {

                let description = "";


                if (
                    upgrade.id ===
                    "chainLightning"
                ) {

                    const currentLevel =
                        player.specialUpgrades
                            .chainLightning;

                    const nextLevel =
                        currentLevel + 1;

                    const jumpCount =
                        nextLevel + 1;

                    if (currentLevel === 0) {

                        description =
                            `Unlocks Chain Lightning with ${jumpCount} additional enemies`;

                    } else {

                        description =
                            `Level ${nextLevel}: Lightning jumps to ${jumpCount} additional enemies`;

                    }
                }


                if (
                    upgrade.id ===
                    "forkingBolt"
                ) {

                    const currentLevel =
                        player.specialUpgrades
                            .forkingBolt;

                    const nextLevel =
                        currentLevel + 1;

                    if (currentLevel === 0) {

                        description =
                            "Projectiles fork after hitting an enemy";

                    } else {

                        description =
                            `Level ${nextLevel}: Forked bolts deal increased damage`;

                    }
                }


                if (
                    upgrade.id ===
                    "arcBlade"
                ) {

                    const currentLevel =
                        player.specialUpgrades
                            .arcBlade;

                    const nextLevel =
                        currentLevel + 1;

                    if (currentLevel === 0) {

                        description =
                            "A short-range blade circles the player";

                    } else {

                        description =
                            `Level ${nextLevel}: Arc Blade gains increased range`;

                    }
                }


                const displayUpgrade = {

                    ...upgrade,

                    description:
                        description
                };


                createUpgradeButton(
                    displayUpgrade,
                    optionsContainer,
                    overlay,
                    onSelected
                );

            }
        );

        return;
    }


    // ========================================================
    // NORMAL UPGRADES
    // ========================================================

    const shuffled =
        [...upgrades].sort(
            () => Math.random() - 0.5
        );

    const selected =
        shuffled.slice(0, 3);

    selected.forEach(
        function(upgrade) {

            createUpgradeButton(
                upgrade,
                optionsContainer,
                overlay,
                onSelected
            );

        }
    );
}


// ============================================================
// GAME OVER SCREEN
// ============================================================

export function showGameOver(
    survivalTime,
    kills,
    score,
    overallRunScore,
    onPlayAgain,
    onMainMenu
) {

    const screen =
        document.getElementById(
            "gameOverScreen"
        );

    const stats =
        document.getElementById(
            "gameOverStats"
        );

    stats.innerHTML = `

        You survived
        <strong>
            ${Math.floor(survivalTime)}
        </strong>
        seconds.<br><br>

        Kills:
        <strong>
            ${kills}
        </strong><br>

        Level Score:
        <strong>
            ${score}
        </strong><br>

        Overall Run Score:
        <strong>
            ${overallRunScore}
        </strong>

    `;

    screen.classList.remove(
        "hidden"
    );

    const playAgainButton =
        document.getElementById(
            "playAgainButton"
        );

    const mainMenuButton =
        document.getElementById(
            "gameOverMainMenuButton"
        );

    playAgainButton.onclick =
        onPlayAgain;

    mainMenuButton.onclick =
        onMainMenu;
}


// ============================================================
// LEVEL COMPLETE SCREEN
// ============================================================

export function showLevelComplete(
    currentLevel,
    score,
    overallRunScore,
    onNextLevel
) {

    const screen =
        document.getElementById(
            "levelCompleteScreen"
        );

    const text =
        document.getElementById(
            "levelCompleteText"
        );

    text.innerHTML = `

        Level
        <strong>
            ${currentLevel}
        </strong>
        complete!<br><br>

        Level Score:
        <strong>
            ${score}
        </strong><br>

        Overall Run Score:
        <strong>
            ${overallRunScore}
        </strong>

    `;

    screen.classList.remove(
        "hidden"
    );

    const nextButton =
        document.getElementById(
            "nextLevelButton"
        );

    nextButton.onclick =
        onNextLevel;
}


// ============================================================
// HIDE LEVEL COMPLETE
// ============================================================

export function hideLevelComplete() {

    document
        .getElementById(
            "levelCompleteScreen"
        )
        .classList.add(
            "hidden"
        );
}


// ============================================================
// PAUSE SCREEN
// ============================================================

export function showPauseScreen() {

    document
        .getElementById(
            "pauseScreen"
        )
        .classList.remove(
            "hidden"
        );
}


export function hidePauseScreen() {

    document
        .getElementById(
            "pauseScreen"
        )
        .classList.add(
            "hidden"
        );
}


// ============================================================
// HIGH SCORE DISPLAY
// ============================================================

export function updateHighScoreDisplay(
    highScores
) {

    document.getElementById(
        "highScoreLevel1"
    ).textContent =
        highScores.level1;


    document.getElementById(
        "highScoreLevel2"
    ).textContent =
        highScores.level2;


    document.getElementById(
        "highScoreLevel3"
    ).textContent =
        highScores.level3;


    document.getElementById(
        "highScoreLevel4"
    ).textContent =
        highScores.level4;


    document.getElementById(
        "highScoreLevel5"
    ).textContent =
        highScores.level5;


    document.getElementById(
        "highScoreInfinite"
    ).textContent =
        highScores.infinite || 0;


    document.getElementById(
        "highScoreOverall"
    ).textContent =
        highScores.overall;

}
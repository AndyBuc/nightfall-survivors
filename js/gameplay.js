// ============================================================
// GAMEPLAY SYSTEM
// ============================================================

import { player } from "./player.js";
import { enemies } from "./enemies.js";
import { playSound } from "./audio.js";

let levelUpPending = false;

// ============================================================
// XP GEMS
// ============================================================

export const xpGems = [];


// ============================================================
// GAMEPLAY STATE
// ============================================================

let damageCooldown = 0;

let playerHitTimer = 0;


// ============================================================
// RESET GAMEPLAY
// ============================================================

export function resetGameplay() {

    xpGems.length = 0;

    damageCooldown = 0;

    playerHitTimer = 0;

    levelUpPending = false;

}


// ============================================================
// ENEMY COLLISION / PLAYER DAMAGE
// ============================================================

export function checkEnemyCollisions(
    dt,
    onPlayerDeath
) {

    damageCooldown -= dt;

    playerHitTimer -= dt;


    for (const enemy of enemies) {

        const dx =
            player.x - enemy.x;

        const dy =
            player.y - enemy.y;

        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        if (
            distance <
            player.radius +
            enemy.radius
        ) {

            if (damageCooldown <= 0) {

                player.hp -=
                    enemy.damage;

                    playSound("playerHit");

                player.hp =
                    Math.max(
                        0,
                        player.hp
                    );


                playerHitTimer =
                    0.15;

                damageCooldown =
                    0.5;


                if (player.hp <= 0) {

                    if (onPlayerDeath) {

                        onPlayerDeath();

                    }

                    return;

                }

            }

        }

    }

}


// ============================================================
// CREATE XP GEM
// ============================================================

export function createXPGem(
    enemy
) {

    let value = 1;


    if (enemy.type === "brute") {

        value = 3;

    } else if (
        enemy.type === "necromancer"
    ) {

        value = 5;

    }


    xpGems.push({

        x: enemy.x,

        y: enemy.y,

        radius: 6,

        value: value

    });

}


// ============================================================
// UPDATE XP GEMS
// ============================================================

export function updateXPGems(dt) {

    for (
        let i = xpGems.length - 1;
        i >= 0;
        i--
    ) {

        const gem =
            xpGems[i];


        const dx =
            player.x - gem.x;

        const dy =
            player.y - gem.y;

        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        // Attract nearby XP

        if (
            distance < 100 &&
            distance > 0
        ) {

            const speed =
                300;


            gem.x +=
                (dx / distance) *
                speed *
                dt;

            gem.y +=
                (dy / distance) *
                speed *
                dt;

        }


        // Collect XP

        if (
            distance <
            player.radius +
            gem.radius
        ) {

            collectXP(
                gem.value
            );


            xpGems.splice(
                i,
                1
            );

        }

    }

}


// ============================================================
// COLLECT XP
// ============================================================

function collectXP(value) {

    player.xp += value;

}


// ============================================================
// LEVEL UP
// ============================================================

export function checkLevelUp(onLevelUp) {
    if (player.xp >= player.xpNeeded && !levelUpPending) {
        levelUpPending = true;

        player.xp -= player.xpNeeded;
        player.level++;
        player.xpNeeded = Math.floor(player.xpNeeded * 1.35);

        if (onLevelUp) {
            onLevelUp();
        }
    }
}

export function resetLevelUpState() {

    levelUpPending = false;

}


// ============================================================
// PLAYER HIT EFFECT
// ============================================================

export function isPlayerHit() {

    return playerHitTimer > 0;

}




// ============================================================
// DRAW XP GEMS
// ============================================================

export function drawXPGems(ctx) {

    for (const gem of xpGems) {

        ctx.save();

        ctx.translate(
            gem.x,
            gem.y
        );

        ctx.rotate(
            Math.PI / 4
        );


        ctx.fillStyle =
            "#55e68a";


        ctx.fillRect(
            -5,
            -5,
            10,
            10
        );


        ctx.restore();

    }

}
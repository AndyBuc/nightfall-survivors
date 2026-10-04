import {
    isCircleCollidingWithObstacles
} from "./obstacles.js";

export const player = {
    x: 480,
    y: 270,
    radius: 16,
    speed: 220,
    hp: 100,
    maxHp: 100,
    level: 1,
    xp: 0,
    xpNeeded: 10,
    attackCooldown: 0,
    attackSpeed: 0.45,
    attackDamage: 1,
    projectileSpeed: 420,
    projectileCount: 1,

    // SPECIAL UPGRADES
    specialUpgrades: {
        chainLightning: 0,
        forkingBolt: 0,
        arcBlade: 0
    }
};

export function resetPlayer(
    gameWidth,
    gameHeight
) {
    player.x = gameWidth / 2;
    player.y = gameHeight / 2;
    player.radius = 16;
    player.speed = 220;
    player.hp = 100;
    player.maxHp = 100;
    player.level = 1;
    player.xp = 0;
    player.xpNeeded = 10;
    player.attackCooldown = 0;
    player.attackSpeed = 0.45;
    player.attackDamage = 1;
    player.projectileSpeed = 420;
    player.projectileCount = 1;

    // RESET ALL SPECIAL UPGRADES
    player.specialUpgrades.chainLightning = 0;
    player.specialUpgrades.forkingBolt = 0;
    player.specialUpgrades.arcBlade = 0;
}

export function updatePlayer(
    dt,
    keys,
    gameWidth,
    gameHeight
) {
    let moveX = 0;
    let moveY = 0;

    if (
        keys["w"] ||
        keys["arrowup"]
    ) {
        moveY -= 1;
    }

    if (
        keys["s"] ||
        keys["arrowdown"]
    ) {
        moveY += 1;
    }

    if (
        keys["a"] ||
        keys["arrowleft"]
    ) {
        moveX -= 1;
    }

    if (
        keys["d"] ||
        keys["arrowright"]
    ) {
        moveX += 1;
    }

    const length =
        Math.sqrt(
            moveX * moveX +
            moveY * moveY
        );

    if (length > 0) {
        moveX /= length;
        moveY /= length;
    }

    const newX =
        player.x +
        moveX *
        player.speed *
        dt;

    const newY =
        player.y +
        moveY *
        player.speed *
        dt;

    if (
        !isCircleCollidingWithObstacles(
            newX,
            player.y,
            player.radius
        )
    ) {
        player.x = newX;
    }

    if (
        !isCircleCollidingWithObstacles(
            player.x,
            newY,
            player.radius
        )
    ) {
        player.y = newY;
    }

    player.x =
        Math.max(
            player.radius,
            Math.min(
                gameWidth -
                    player.radius,
                player.x
            )
        );

    player.y =
        Math.max(
            player.radius,
            Math.min(
                gameHeight -
                    player.radius,
                player.y
            )
        );
}
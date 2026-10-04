import {
    player
} from "./player.js";

import {
    enemies
} from "./enemies.js";

import {
    isCircleCollidingWithObstacles
} from "./obstacles.js";


// ============================================================
// PROJECTILES
// ============================================================

export const projectiles = [];


// ============================================================
// CHAIN LIGHTNING EFFECTS
// ============================================================

const chainLightningEffects = [];


// ============================================================
// ARC BLADE STATE
// ============================================================

let arcBladeAngle = 0;

let arcBladeDamageCooldown = 0;


// ============================================================
// RESET PROJECTILES / SPECIAL WEAPONS
// ============================================================

export function resetProjectiles() {

    projectiles.length = 0;

    chainLightningEffects.length = 0;

    arcBladeAngle = 0;

    arcBladeDamageCooldown = 0;
}


// ============================================================
// PLAYER ATTACK
// ============================================================

export function playerAttack(dt) {

    player.attackCooldown -= dt;

    if (
        player.attackCooldown > 0 ||
        enemies.length === 0
    ) {
        return;
    }

    let nearestEnemy = null;
    let nearestDistance = Infinity;

    enemies.forEach(function(enemy) {

        const dx =
            enemy.x - player.x;

        const dy =
            enemy.y - player.y;

        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );

        if (
            distance <
            nearestDistance
        ) {

            nearestDistance =
                distance;

            nearestEnemy =
                enemy;
        }
    });

    if (!nearestEnemy) {
        return;
    }

    const baseAngle =
        Math.atan2(
            nearestEnemy.y - player.y,
            nearestEnemy.x - player.x
        );

    const spread =
        0.18;

    for (
        let i = 0;
        i < player.projectileCount;
        i++
    ) {

        let angle =
            baseAngle;

        if (
            player.projectileCount >
            1
        ) {

            const middle =
                (player.projectileCount - 1) /
                2;

            angle +=
                (i - middle) *
                spread;
        }

        projectiles.push({

            x: player.x,

            y: player.y,

            radius: 5,

            speed:
                player.projectileSpeed,

            damage:
                player.attackDamage,

            vx:
                Math.cos(angle) *
                player.projectileSpeed,

            vy:
                Math.sin(angle) *
                player.projectileSpeed,

            canFork: true

        });
    }

    player.attackCooldown =
        player.attackSpeed;
}


// ============================================================
// UPDATE PROJECTILES
// ============================================================

export function updateProjectiles(
    dt,
    gameWidth,
    gameHeight,
    onEnemyKilled
) {

    for (
        let i = projectiles.length - 1;
        i >= 0;
        i--
    ) {

        const projectile =
            projectiles[i];

        projectile.x +=
            projectile.vx * dt;

        projectile.y +=
            projectile.vy * dt;


        // ----------------------------------------
        // OBSTACLE COLLISION
        // ----------------------------------------

        if (
            isCircleCollidingWithObstacles(
                projectile.x,
                projectile.y,
                projectile.radius
            )
        ) {

            projectiles.splice(
                i,
                1
            );

            continue;
        }


        // ----------------------------------------
        // ARENA BOUNDS
        // ----------------------------------------

        if (
            projectile.x < -20 ||
            projectile.x >
                gameWidth + 20 ||
            projectile.y < -20 ||
            projectile.y >
                gameHeight + 20
        ) {

            projectiles.splice(
                i,
                1
            );
        }
    }


    // ----------------------------------------
    // UPDATE LIGHTNING EFFECTS
    // ----------------------------------------

    for (
        let i =
            chainLightningEffects.length - 1;
        i >= 0;
        i--
    ) {

        const effect =
            chainLightningEffects[i];

        effect.life -= dt;

        if (effect.life <= 0) {

            chainLightningEffects.splice(
                i,
                1
            );
        }
    }


    // ----------------------------------------
    // UPDATE ARC BLADE
    // ----------------------------------------

    updateArcBlade(
        dt,
        onEnemyKilled
    );
}


// ============================================================
// APPLY ENEMY DAMAGE
// ============================================================

function damageEnemy(
    enemy,
    damage,
    onEnemyKilled
) {

    enemy.hp -= damage;


    // ----------------------------------------
    // KNOCKBACK
    // ----------------------------------------

    const directionX =
        enemy.x - player.x;

    const directionY =
        enemy.y - player.y;

    const directionLength =
        Math.sqrt(
            directionX *
                directionX +
            directionY *
                directionY
        ) || 1;

    const knockbackStrength =
        180;

    enemy.knockbackX +=
        (
            directionX /
            directionLength
        ) *
        knockbackStrength;

    enemy.knockbackY +=
        (
            directionY /
            directionLength
        ) *
        knockbackStrength;


    // ----------------------------------------
    // ENEMY DEFEATED
    // ----------------------------------------

    if (enemy.hp <= 0) {

        const enemyIndex =
            enemies.indexOf(enemy);

        if (enemyIndex !== -1) {

            enemies.splice(
                enemyIndex,
                1
            );

            if (onEnemyKilled) {

                onEnemyKilled(
                    enemy
                );
            }
        }

        return true;
    }

    return false;
}


// ============================================================
// CHAIN LIGHTNING
// ============================================================

function triggerChainLightning(
    startingEnemy,
    onEnemyKilled
) {

    const chainLevel =
        player.specialUpgrades
            .chainLightning;

    if (chainLevel <= 0) {
        return;
    }


    // Level 1 = 2 additional enemies
    // Level 2 = 3 additional enemies
    // Level 3 = 4 additional enemies

    const maxJumps =
        chainLevel + 1;


    const hitEnemies =
        new Set();

    hitEnemies.add(
        startingEnemy
    );


    let currentEnemy =
        startingEnemy;


    for (
        let jump = 0;
        jump < maxJumps;
        jump++
    ) {

        let nearestEnemy =
            null;

        let nearestDistance =
            Infinity;


        for (
            const enemy of enemies
        ) {

            if (
                hitEnemies.has(enemy)
            ) {
                continue;
            }


            const dx =
                enemy.x -
                currentEnemy.x;

            const dy =
                enemy.y -
                currentEnemy.y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distance < 180 &&
                distance <
                    nearestDistance
            ) {

                nearestDistance =
                    distance;

                nearestEnemy =
                    enemy;
            }
        }


        if (!nearestEnemy) {
            break;
        }


        chainLightningEffects.push({

            x1:
                currentEnemy.x,

            y1:
                currentEnemy.y,

            x2:
                nearestEnemy.x,

            y2:
                nearestEnemy.y,

            life:
                0.12,

            maxLife:
                0.12
        });


        hitEnemies.add(
            nearestEnemy
        );


        damageEnemy(
            nearestEnemy,
            player.attackDamage,
            onEnemyKilled
        );


        currentEnemy =
            nearestEnemy;
    }
}


// ============================================================
// FORKING BOLT
// ============================================================

function createForkedProjectile(
    projectile,
    enemy
) {

    const forkLevel =
        player.specialUpgrades
            .forkingBolt;

    if (forkLevel <= 0) {
        return;
    }

    if (!projectile.canFork) {
        return;
    }


    // Level 1 = current projectile damage
    // Level 2 = current damage + 1
    // Level 3 = current damage + 2

    const forkDamage =
        projectile.damage +
        (forkLevel - 1);


    const directionLength =
        Math.sqrt(
            projectile.vx *
                projectile.vx +
            projectile.vy *
                projectile.vy
        ) || 1;


    const directionX =
        projectile.vx /
        directionLength;

    const directionY =
        projectile.vy /
        directionLength;


    projectiles.push({

        x:
            enemy.x +
            directionX *
            (enemy.radius + 7),

        y:
            enemy.y +
            directionY *
            (enemy.radius + 7),

        radius: 5,

        speed:
            player.projectileSpeed,

        damage:
            forkDamage,

        vx:
            directionX *
            player.projectileSpeed,

        vy:
            directionY *
            player.projectileSpeed,

        canFork: false
    });
}


// ============================================================
// ARC BLADE
// ============================================================

function updateArcBlade(
    dt,
    onEnemyKilled
) {

    const bladeLevel =
        player.specialUpgrades
            .arcBlade;

    if (bladeLevel <= 0) {
        return;
    }


    // ----------------------------------------
    // ROTATION
    // ----------------------------------------

    arcBladeAngle +=
        dt * 4;

    if (
        arcBladeAngle >
        Math.PI * 2
    ) {

        arcBladeAngle -=
            Math.PI * 2;
    }


    // ----------------------------------------
    // DAMAGE COOLDOWN
    // ----------------------------------------

    arcBladeDamageCooldown -= dt;

    if (
        arcBladeDamageCooldown > 0
    ) {
        return;
    }


    // ----------------------------------------
    // RANGE
    // ----------------------------------------

    const bladeRange =
        55 +
        (bladeLevel - 1) * 8;


    const bladeX =
        player.x +
        Math.cos(arcBladeAngle) *
        bladeRange;

    const bladeY =
        player.y +
        Math.sin(arcBladeAngle) *
        bladeRange;


    // ----------------------------------------
    // CHECK ENEMIES
    // ----------------------------------------

    for (
        let i =
            enemies.length - 1;
        i >= 0;
        i--
    ) {

        const enemy =
            enemies[i];

        const dx =
            enemy.x -
            bladeX;

        const dy =
            enemy.y -
            bladeY;

        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        if (
            distance <
            enemy.radius + 12
        ) {

            damageEnemy(
                enemy,
                player.attackDamage,
                onEnemyKilled
            );

            arcBladeDamageCooldown =
                0.25;

            break;
        }
    }
}


// ============================================================
// PROJECTILE COLLISIONS
// ============================================================

export function checkProjectileCollisions(
    onEnemyKilled
) {

    for (
        let p =
            projectiles.length - 1;
        p >= 0;
        p--
    ) {

        const projectile =
            projectiles[p];

        let projectileHit =
            false;


        for (
            let e =
                enemies.length - 1;
            e >= 0;
            e--
        ) {

            const enemy =
                enemies[e];

            const dx =
                enemy.x -
                projectile.x;

            const dy =
                enemy.y -
                projectile.y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            const collisionDistance =
                enemy.radius +
                projectile.radius;


            if (
                distance <
                collisionDistance
            ) {

                // --------------------------------
                // FORKING BOLT
                // --------------------------------

                createForkedProjectile(
                    projectile,
                    enemy
                );


                // --------------------------------
                // NORMAL DAMAGE
                // --------------------------------

                damageEnemy(
                    enemy,
                    projectile.damage,
                    onEnemyKilled
                );


                // --------------------------------
                // CHAIN LIGHTNING
                // --------------------------------

                triggerChainLightning(
                    enemy,
                    onEnemyKilled
                );


                // --------------------------------
                // REMOVE PROJECTILE
                // --------------------------------

                projectiles.splice(
                    p,
                    1
                );

                projectileHit =
                    true;

                break;
            }
        }


        if (projectileHit) {
            continue;
        }
    }
}


// ============================================================
// DRAW PROJECTILES + SPECIAL WEAPONS
// ============================================================

export function drawProjectiles(ctx) {


    // ========================================================
    // CHAIN LIGHTNING
    // ========================================================

    for (
        const effect of
        chainLightningEffects
    ) {

        const alpha =
            Math.max(
                0,
                effect.life /
                    effect.maxLife
            );


        ctx.save();


        ctx.strokeStyle =
            `rgba(100, 220, 255, ${alpha * 0.12})`;

        ctx.lineWidth = 6;

        ctx.beginPath();

        ctx.moveTo(
            effect.x1,
            effect.y1
        );

        ctx.lineTo(
            effect.x2,
            effect.y2
        );

        ctx.stroke();


        ctx.strokeStyle =
            `rgba(120, 230, 255, ${alpha * 0.45})`;

        ctx.lineWidth = 2;

        ctx.beginPath();

        ctx.moveTo(
            effect.x1,
            effect.y1
        );

        ctx.lineTo(
            effect.x2,
            effect.y2
        );

        ctx.stroke();


        ctx.restore();
    }


    // ========================================================
    // ARC BLADE
    // ========================================================

    const bladeLevel =
        player.specialUpgrades
            .arcBlade;

    if (bladeLevel > 0) {

        const bladeRange =
            55 +
            (bladeLevel - 1) * 8;


        const handleX =
            player.x +
            Math.cos(arcBladeAngle) *
            (bladeRange - 8);

        const handleY =
            player.y +
            Math.sin(arcBladeAngle) *
            (bladeRange - 8);


        const bladeTipX =
            player.x +
            Math.cos(arcBladeAngle) *
            (bladeRange + 10);

        const bladeTipY =
            player.y +
            Math.sin(arcBladeAngle) *
            (bladeRange + 10);


        ctx.save();


        // Blade glow
        ctx.strokeStyle =
            "rgba(180, 120, 255, 0.18)";

        ctx.lineWidth = 7;

        ctx.beginPath();

        ctx.moveTo(
            handleX,
            handleY
        );

        ctx.lineTo(
            bladeTipX,
            bladeTipY
        );

        ctx.stroke();


        // Blade
        ctx.strokeStyle =
            "#d8b4ff";

        ctx.lineWidth = 4;

        ctx.beginPath();

        ctx.moveTo(
            handleX,
            handleY
        );

        ctx.lineTo(
            bladeTipX,
            bladeTipY
        );

        ctx.stroke();


        // Blade tip
        ctx.fillStyle =
            "#ffffff";

        ctx.beginPath();

        ctx.arc(
            bladeTipX,
            bladeTipY,
            2,
            0,
            Math.PI * 2
        );

        ctx.fill();


        ctx.restore();
    }


    // ========================================================
    // NORMAL PROJECTILES
    // ========================================================

    projectiles.forEach(
        function(projectile) {

            // Glow
            ctx.fillStyle =
                "rgba(80, 220, 255, 0.2)";

            ctx.beginPath();

            ctx.arc(
                projectile.x,
                projectile.y,
                projectile.radius + 5,
                0,
                Math.PI * 2
            );

            ctx.fill();


            // Projectile
            ctx.fillStyle =
                "#55eaff";

            ctx.beginPath();

            ctx.arc(
                projectile.x,
                projectile.y,
                projectile.radius,
                0,
                Math.PI * 2
            );

            ctx.fill();
        }
    );
}   
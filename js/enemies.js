import { player } from "./player.js";

import {
    levels
} from "./levels.js";

import {
    isCircleCollidingWithObstacles
} from "./obstacles.js";



export const enemies = [];



export function resetEnemies() {

    enemies.length = 0;

}



export function createEnemy(
    gameWidth,
    gameHeight,
    currentLevel,
    difficultyMultiplier = 1,
    survivalTime = 0
) {

    /*
        Infinite Mode:

        First 45 seconds:
        - Level 1 enemy roster
        - Level 1 enemy scaling

        After 45 seconds:
        - Level 5 enemy roster
        - Level 5 enemy scaling
        - Infinite difficulty multiplier applies
    */


    const isEarlyInfiniteMode =
        survivalTime < 45;


    /*
        Decide which level controls
        the enemy roster.
    */

    const rosterLevel =
        isEarlyInfiniteMode
            ? 1
            : currentLevel;


    /*
        Decide which level controls
        enemy HP and speed scaling.

        This is important because Infinite Mode
        starts using currentLevel = 5.

        During the first 45 seconds we
        specifically want Level 1 scaling.
    */

    const scalingLevel =
        isEarlyInfiniteMode
            ? 1
            : currentLevel;


    const levelData =
        levels[scalingLevel];



    const edge =
        Math.floor(
            Math.random() * 4
        );


    let x;
    let y;


    if (edge === 0) {

        x = -30;

        y =
            Math.random() *
            gameHeight;

    } else if (edge === 1) {

        x =
            gameWidth + 30;

        y =
            Math.random() *
            gameHeight;

    } else if (edge === 2) {

        x =
            Math.random() *
            gameWidth;

        y = -30;

    } else {

        x =
            Math.random() *
            gameWidth;

        y =
            gameHeight + 30;
    }



    const random =
        Math.random();


    let type;



    /*
        Enemy composition becomes harder
        as the level increases.
    */


    if (rosterLevel === 1) {


        // Mostly Ghouls

        if (random < 0.15) {

            type = "bat";

        } else {

            type = "ghoul";
        }



    } else if (rosterLevel === 2) {


        // Ghouls + more Bats

        if (random < 0.30) {

            type = "bat";

        } else {

            type = "ghoul";
        }



    } else if (rosterLevel === 3) {


        // Introduce Brutes

        if (random < 0.15) {

            type = "brute";

        } else if (
            random < 0.45
        ) {

            type = "bat";

        } else {

            type = "ghoul";
        }



    } else if (rosterLevel === 4) {


        // Necromancers appear

        if (random < 0.10) {

            type = "necromancer";

        } else if (
            random < 0.30
        ) {

            type = "brute";

        } else if (
            random < 0.60
        ) {

            type = "bat";

        } else {

            type = "ghoul";
        }



    } else {


        // Level 5

        if (random < 0.20) {

            type = "necromancer";

        } else if (
            random < 0.45
        ) {

            type = "brute";

        } else if (
            random < 0.70
        ) {

            type = "bat";

        } else {

            type = "ghoul";
        }
    }



    let radius;
    let speed;
    let baseHealth;
    let damage;



    if (type === "ghoul") {

        radius = 14;
        speed = 60;
        baseHealth = 2;
        damage = 10;



    } else if (type === "bat") {

        radius = 12;
        speed = 90;
        baseHealth = 1;
        damage = 8;



    } else if (type === "brute") {

        radius = 22;
        speed = 35;
        baseHealth = 8;
        damage = 20;



    } else {

        radius = 18;
        speed = 45;
        baseHealth = 12;
        damage = 25;
    }



    /*
        Apply level scaling.

        During the first 45 seconds of Infinite Mode,
        levelData is Level 1.

        After 45 seconds,
        levelData is Level 5.
    */

    const health =
        baseHealth *
        levelData.enemyHealth *
        difficultyMultiplier;



    const enemy = {

        type: type,

        x: x,
        y: y,

        radius: radius,

        speed:
            speed *
            levelData.enemySpeed *
            difficultyMultiplier,

        hp: health,
        maxHp: health,

        damage: damage,


        // Knockback physics

        knockbackX: 0,
        knockbackY: 0
    };


    enemies.push(enemy);


    return enemy;
}



export function updateEnemies(
    dt,
    gameWidth,
    gameHeight,
    currentLevel,
    difficultyMultiplier = 1
) {

    for (const enemy of enemies) {


        /*
            Apply knockback first.
        */


        enemy.x +=
            enemy.knockbackX * dt;


        enemy.y +=
            enemy.knockbackY * dt;


        enemy.knockbackX *=
            Math.pow(0.05, dt);


        enemy.knockbackY *=
            Math.pow(0.05, dt);



        /*
            Find direction toward player.
        */


        const dx =
            player.x -
            enemy.x;


        const dy =
            player.y -
            enemy.y;


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            ) || 1;


        const directionX =
            dx / distance;


        const directionY =
            dy / distance;



        const moveAmount =
            enemy.speed * dt;



        /*
            Try normal movement first.
        */


        const normalX =
            enemy.x +
            directionX *
                moveAmount;


        const normalY =
            enemy.y +
            directionY *
                moveAmount;


        const normalBlocked =
            isCircleCollidingWithObstacles(
                normalX,
                normalY,
                enemy.radius
            );



        if (!normalBlocked) {

            enemy.x =
                normalX;

            enemy.y =
                normalY;



        } else {


            /*
                If blocked, try moving
                horizontally.
            */


            const horizontalX =
                enemy.x +
                directionX *
                    moveAmount;


            const horizontalBlocked =
                isCircleCollidingWithObstacles(
                    horizontalX,
                    enemy.y,
                    enemy.radius
                );



            if (!horizontalBlocked) {

                enemy.x =
                    horizontalX;



            } else {


                /*
                    If horizontal movement is
                    blocked, try vertical movement.
                */


                const verticalY =
                    enemy.y +
                    directionY *
                        moveAmount;


                const verticalBlocked =
                    isCircleCollidingWithObstacles(
                        enemy.x,
                        verticalY,
                        enemy.radius
                    );



                if (!verticalBlocked) {

                    enemy.y =
                        verticalY;



                } else {


                    /*
                        Both directions are blocked.
                        Slide along the obstacle.

                        Try X/Y alternatives that
                        move around the obstacle.
                    */


                    const slideX =
                        enemy.x +
                        (-directionY) *
                            moveAmount;


                    const slideY =
                        enemy.y +
                        directionX *
                            moveAmount;



                    if (
                        !isCircleCollidingWithObstacles(
                            slideX,
                            enemy.y,
                            enemy.radius
                        )
                    ) {

                        enemy.x =
                            slideX;



                    } else if (
                        !isCircleCollidingWithObstacles(
                            enemy.x,
                            slideY,
                            enemy.radius
                        )
                    ) {

                        enemy.y =
                            slideY;
                    }
                }
            }
        }



        /*
            Keep enemies inside the arena.
        */


        enemy.x =
            Math.max(
                enemy.radius,
                Math.min(
                    gameWidth -
                        enemy.radius,
                    enemy.x
                )
            );


        enemy.y =
            Math.max(
                enemy.radius,
                Math.min(
                    gameHeight -
                        enemy.radius,
                    enemy.y
                )
            );



        /*
            Necromancers can summon ghouls.
        */


        if (
            enemy.type === "necromancer" &&
            currentLevel >= 4
        ) {

            summonGhoul(
                gameWidth,
                gameHeight,
                currentLevel,
                difficultyMultiplier
            );
        }
    }
}



function summonGhoul(
    gameWidth,
    gameHeight,
    currentLevel,
    difficultyMultiplier = 1
) {

    if (enemies.length >= 80) {

        return;
    }



    if (Math.random() > 0.002) {

        return;
    }



    /*
        Summoned Ghouls use the same
        scaling level as the current
        Infinite Mode stage.

        During the first 45 seconds,
        they would use Level 1 scaling.

        Necromancers normally cannot appear
        during that period anyway.
    */

    const scalingLevel =
        currentLevel;


    const levelData =
        levels[scalingLevel];



    const edge =
        Math.floor(
            Math.random() * 4
        );


    let x;
    let y;



    if (edge === 0) {

        x = -30;

        y =
            Math.random() *
            gameHeight;



    } else if (edge === 1) {

        x =
            gameWidth + 30;

        y =
            Math.random() *
            gameHeight;



    } else if (edge === 2) {

        x =
            Math.random() *
            gameWidth;

        y = -30;



    } else {

        x =
            Math.random() *
            gameWidth;

        y =
            gameHeight + 30;
    }



    const health =
        2 *
        levelData.enemyHealth *
        difficultyMultiplier;



    enemies.push({

        type: "ghoul",

        x: x,
        y: y,

        radius: 14,

        speed:
            60 *
            levelData.enemySpeed *
            difficultyMultiplier,

        hp: health,
        maxHp: health,

        damage: 10,

        knockbackX: 0,
        knockbackY: 0
    });
}



export function drawEnemies(ctx) {

    enemies.forEach(
        function(enemy) {


            if (
                enemy.type ===
                "ghoul"
            ) {

                drawGhoul(
                    ctx,
                    enemy
                );



            } else if (
                enemy.type ===
                "bat"
            ) {

                drawBat(
                    ctx,
                    enemy
                );



            } else if (
                enemy.type ===
                "brute"
            ) {

                drawBrute(
                    ctx,
                    enemy
                );



            } else if (
                enemy.type ===
                "necromancer"
            ) {

                drawNecromancer(
                    ctx,
                    enemy
                );
            }



            // -------------------------
            // ENEMY HP BAR
            // -------------------------


            const barWidth =
                enemy.radius *
                2.5;


            const barHeight = 5;


            const barX =
                enemy.x -
                barWidth / 2;


            const barY =
                enemy.y -
                enemy.radius -
                10;


            ctx.fillStyle =
                "#32151a";


            ctx.fillRect(
                barX,
                barY,
                barWidth,
                barHeight
            );


            const hpPercentage =
                Math.max(
                    0,
                    enemy.hp /
                        enemy.maxHp
                );


            ctx.fillStyle =
                "#39d353";


            ctx.fillRect(
                barX,
                barY,
                barWidth *
                    hpPercentage,
                barHeight
            );
        }
    );
}



function drawGhoul(
    ctx,
    enemy
) {

    ctx.fillStyle =
        "#d94b4b";


    ctx.beginPath();


    ctx.arc(
        enemy.x,
        enemy.y,
        enemy.radius,
        0,
        Math.PI * 2
    );


    ctx.fill();


    ctx.fillStyle =
        "#ffffff";


    ctx.beginPath();


    ctx.arc(
        enemy.x - 5,
        enemy.y - 3,
        3,
        0,
        Math.PI * 2
    );


    ctx.arc(
        enemy.x + 5,
        enemy.y - 3,
        3,
        0,
        Math.PI * 2
    );


    ctx.fill();
}



function drawBat(
    ctx,
    enemy
) {

    ctx.fillStyle =
        "#8f4cff";


    ctx.beginPath();


    ctx.moveTo(
        enemy.x,
        enemy.y -
            enemy.radius
    );


    ctx.lineTo(
        enemy.x -
            enemy.radius * 1.4,
        enemy.y
    );


    ctx.lineTo(
        enemy.x -
            enemy.radius * 0.6,
        enemy.y +
            enemy.radius
    );


    ctx.lineTo(
        enemy.x,
        enemy.y +
            enemy.radius * 0.4
    );


    ctx.lineTo(
        enemy.x +
            enemy.radius * 0.6,
        enemy.y +
            enemy.radius
    );


    ctx.lineTo(
        enemy.x +
            enemy.radius * 1.4,
        enemy.y
    );


    ctx.closePath();


    ctx.fill();


    ctx.fillStyle =
        "#ffe66d";


    ctx.beginPath();


    ctx.arc(
        enemy.x - 4,
        enemy.y - 2,
        2,
        0,
        Math.PI * 2
    );


    ctx.arc(
        enemy.x + 4,
        enemy.y - 2,
        2,
        0,
        Math.PI * 2
    );


    ctx.fill();
}



function drawBrute(
    ctx,
    enemy
) {

    ctx.fillStyle =
        "#7a2525";


    ctx.fillRect(
        enemy.x -
            enemy.radius,
        enemy.y -
            enemy.radius,
        enemy.radius * 2,
        enemy.radius * 2
    );


    ctx.fillStyle =
        "#ffe66d";


    ctx.fillRect(
        enemy.x - 9,
        enemy.y - 5,
        5,
        5
    );


    ctx.fillRect(
        enemy.x + 4,
        enemy.y - 5,
        5,
        5
    );
}



function drawNecromancer(
    ctx,
    enemy
) {

    ctx.strokeStyle =
        "#b47cff";


    ctx.lineWidth = 2;


    ctx.beginPath();


    ctx.arc(
        enemy.x,
        enemy.y,
        enemy.radius + 6,
        0,
        Math.PI * 2
    );


    ctx.stroke();


    ctx.fillStyle =
        "#6d35b8";


    ctx.beginPath();


    ctx.arc(
        enemy.x,
        enemy.y,
        enemy.radius,
        0,
        Math.PI * 2
    );


    ctx.fill();


    ctx.fillStyle =
        "#ff3b3b";


    ctx.beginPath();


    ctx.arc(
        enemy.x - 5,
        enemy.y - 3,
        3,
        0,
        Math.PI * 2
    );


    ctx.arc(
        enemy.x + 5,
        enemy.y - 3,
        3,
        0,
        Math.PI * 2
    );


    ctx.fill();
}
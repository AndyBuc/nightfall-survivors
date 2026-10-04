export const obstacles = [];

export function resetObstacles() {
    obstacles.length = 0;
}

export function createLevelObstacles(
    gameWidth,
    gameHeight,
    currentLevel
) {
    resetObstacles();

    if (currentLevel === 1) {
        // Graveyard
        addObstacle(
            180,
            150,
            45,
            55,
            "tombstone"
        );

        addObstacle(
            480,
            120,
            45,
            55,
            "tombstone"
        );

        addObstacle(
            780,
            160,
            45,
            55,
            "tombstone"
        );

        addObstacle(
            280,
            390,
            45,
            55,
            "tombstone"
        );

        addObstacle(
            650,
            400,
            45,
            55,
            "tombstone"
        );

    } else if (currentLevel === 2) {
        // Haunted Village
        addObstacle(
            180,
            150,
            55,
            55,
            "crate"
        );

        addObstacle(
            400,
            130,
            55,
            55,
            "crate"
        );

        addObstacle(
            700,
            170,
            55,
            55,
            "crate"
        );

        addObstacle(
            250,
            390,
            55,
            55,
            "crate"
        );

        addObstacle(
            550,
            370,
            55,
            55,
            "crate"
        );

        addObstacle(
            800,
            400,
            55,
            55,
            "crate"
        );

    } else if (currentLevel === 3) {
        // Castle Outskirts
        addObstacle(
            180,
            140,
            70,
            35,
            "wall"
        );

        addObstacle(
            480,
            120,
            70,
            35,
            "wall"
        );

        addObstacle(
            780,
            150,
            70,
            35,
            "wall"
        );

        addObstacle(
            220,
            390,
            70,
            35,
            "wall"
        );

        addObstacle(
            500,
            400,
            70,
            35,
            "wall"
        );

        addObstacle(
            760,
            390,
            70,
            35,
            "wall"
        );

    } else if (currentLevel === 4) {
        // Dark Citadel
        addObstacle(
            180,
            150,
            45,
            90,
            "pillar"
        );

        addObstacle(
            480,
            120,
            45,
            90,
            "pillar"
        );

        addObstacle(
            780,
            150,
            45,
            90,
            "pillar"
        );

        addObstacle(
            220,
            390,
            45,
            90,
            "pillar"
        );

        addObstacle(
            500,
            410,
            45,
            90,
            "pillar"
        );

        addObstacle(
            760,
            390,
            45,
            90,
            "pillar"
        );

    } else if (currentLevel === 5) {
        // Necromancer's Realm
        addObstacle(
            170,
            140,
            60,
            60,
            "magic"
        );

        addObstacle(
            480,
            110,
            60,
            60,
            "magic"
        );

        addObstacle(
            790,
            140,
            60,
            60,
            "magic"
        );

        addObstacle(
            220,
            390,
            60,
            60,
            "magic"
        );

        addObstacle(
            480,
            420,
            60,
            60,
            "magic"
        );

        addObstacle(
            760,
            390,
            60,
            60,
            "magic"
        );
    }
}

function addObstacle(
    x,
    y,
    width,
    height,
    type
) {
    obstacles.push({
        x: x,
        y: y,
        width: width,
        height: height,
        type: type
    });
}

/*
    Checks whether a circular object would
    collide with any rectangular obstacle.
*/
export function isCircleCollidingWithObstacles(
    circleX,
    circleY,
    circleRadius
) {
    for (const obstacle of obstacles) {

        // Find the closest point on the
        // rectangle to the circle centre.
        const closestX =
            Math.max(
                obstacle.x,
                Math.min(
                    circleX,
                    obstacle.x +
                        obstacle.width
                )
            );

        const closestY =
            Math.max(
                obstacle.y,
                Math.min(
                    circleY,
                    obstacle.y +
                        obstacle.height
                )
            );

        const dx =
            circleX -
            closestX;

        const dy =
            circleY -
            closestY;

        const distanceSquared =
            dx * dx +
            dy * dy;

        if (
            distanceSquared <
            circleRadius *
                circleRadius
        ) {
            return true;
        }
    }

    return false;
}

export function drawObstacles(ctx) {
    obstacles.forEach(function(obstacle) {

        if (
            obstacle.type ===
            "tombstone"
        ) {
            drawTombstone(
                ctx,
                obstacle
            );

        } else if (
            obstacle.type ===
            "crate"
        ) {
            drawCrate(
                ctx,
                obstacle
            );

        } else if (
            obstacle.type ===
            "wall"
        ) {
            drawWall(
                ctx,
                obstacle
            );

        } else if (
            obstacle.type ===
            "pillar"
        ) {
            drawPillar(
                ctx,
                obstacle
            );

        } else if (
            obstacle.type ===
            "magic"
        ) {
            drawMagicObstacle(
                ctx,
                obstacle
            );
        }
    });
}

function drawTombstone(
    ctx,
    obstacle
) {
    ctx.fillStyle = "#55505f";

    ctx.fillRect(
        obstacle.x,
        obstacle.y + 10,
        obstacle.width,
        obstacle.height - 10
    );

    ctx.beginPath();

    ctx.arc(
        obstacle.x +
            obstacle.width / 2,
        obstacle.y + 10,
        obstacle.width / 2,
        Math.PI,
        0
    );

    ctx.fill();

    ctx.strokeStyle = "#858090";
    ctx.lineWidth = 2;

    ctx.strokeRect(
        obstacle.x,
        obstacle.y + 10,
        obstacle.width,
        obstacle.height - 10
    );

    // Cross
    ctx.strokeStyle = "#aaa4b5";
    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.moveTo(
        obstacle.x +
            obstacle.width / 2,
        obstacle.y + 18
    );

    ctx.lineTo(
        obstacle.x +
            obstacle.width / 2,
        obstacle.y + 38
    );

    ctx.moveTo(
        obstacle.x +
            obstacle.width / 2 - 8,
        obstacle.y + 28
    );

    ctx.lineTo(
        obstacle.x +
            obstacle.width / 2 + 8,
        obstacle.y + 28
    );

    ctx.stroke();
}

function drawCrate(
    ctx,
    obstacle
) {
    ctx.fillStyle = "#76502f";

    ctx.fillRect(
        obstacle.x,
        obstacle.y,
        obstacle.width,
        obstacle.height
    );

    ctx.strokeStyle = "#b27a45";
    ctx.lineWidth = 3;

    ctx.strokeRect(
        obstacle.x,
        obstacle.y,
        obstacle.width,
        obstacle.height
    );

    ctx.beginPath();

    ctx.moveTo(
        obstacle.x,
        obstacle.y
    );

    ctx.lineTo(
        obstacle.x +
            obstacle.width,
        obstacle.y +
            obstacle.height
    );

    ctx.moveTo(
        obstacle.x +
            obstacle.width,
        obstacle.y
    );

    ctx.lineTo(
        obstacle.x,
        obstacle.y +
            obstacle.height
    );

    ctx.stroke();
}

function drawWall(
    ctx,
    obstacle
) {
    ctx.fillStyle = "#47404f";

    ctx.fillRect(
        obstacle.x,
        obstacle.y,
        obstacle.width,
        obstacle.height
    );

    ctx.strokeStyle = "#82778f";
    ctx.lineWidth = 2;

    ctx.strokeRect(
        obstacle.x,
        obstacle.y,
        obstacle.width,
        obstacle.height
    );

    ctx.beginPath();

    ctx.moveTo(
        obstacle.x,
        obstacle.y +
            obstacle.height / 2
    );

    ctx.lineTo(
        obstacle.x +
            obstacle.width,
        obstacle.y +
            obstacle.height / 2
    );

    ctx.stroke();
}

function drawPillar(
    ctx,
    obstacle
) {
    ctx.fillStyle = "#3c3448";

    ctx.fillRect(
        obstacle.x,
        obstacle.y,
        obstacle.width,
        obstacle.height
    );

    ctx.strokeStyle = "#78658f";
    ctx.lineWidth = 3;

    ctx.strokeRect(
        obstacle.x,
        obstacle.y,
        obstacle.width,
        obstacle.height
    );

    ctx.beginPath();

    ctx.arc(
        obstacle.x +
            obstacle.width / 2,
        obstacle.y,
        obstacle.width / 2,
        Math.PI,
        0
    );

    ctx.stroke();
}

function drawMagicObstacle(
    ctx,
    obstacle
) {
    const centerX =
        obstacle.x +
        obstacle.width / 2;

    const centerY =
        obstacle.y +
        obstacle.height / 2;

    const radius =
        obstacle.width / 2;

    ctx.strokeStyle = "#8d55d9";
    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        radius,
        0,
        Math.PI * 2
    );

    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(
        centerX,
        centerY - radius
    );

    ctx.lineTo(
        centerX + radius,
        centerY + radius
    );

    ctx.lineTo(
        centerX - radius,
        centerY + radius
    );

    ctx.closePath();

    ctx.stroke();

    ctx.fillStyle =
        "rgba(141, 85, 217, 0.15)";

    ctx.fill();
}
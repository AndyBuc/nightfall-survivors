// ============================================================
// LEVEL DATA
// ============================================================

export const levels = {

    1: {
        name: "Graveyard",
        duration: 60,
        spawnRate: 1.0,
        enemySpeed: 1.0,
        enemyHealth: 1.0
    },

    2: {
        name: "Haunted Village",
        duration: 75,
        spawnRate: 0.85,
        enemySpeed: 1.1,
        enemyHealth: 1.15
    },

    3: {
        name: "Castle Outskirts",
        duration: 90,
        spawnRate: 0.70,
        enemySpeed: 1.2,
        enemyHealth: 1.3
    },

    4: {
        name: "Dark Citadel",
        duration: 105,
        spawnRate: 0.55,
        enemySpeed: 1.35,
        enemyHealth: 1.5
    },

    5: {
        name: "Necromancer's Realm",
        duration: 120,
        spawnRate: 0.40,
        enemySpeed: 1.5,
        enemyHealth: 1.75
    }

};


// ============================================================
// LEVEL BACKGROUND
// ============================================================

export function getLevelBackground(levelNumber) {

    switch (levelNumber) {

        case 1:
            return "#11101a";

        case 2:
            return "#15111f";

        case 3:
            return "#18111c";

        case 4:
            return "#120d19";

        case 5:
            return "#0d0914";

        default:
            return "#11101a";
    }

}
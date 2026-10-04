const defaultHighScores = {

    level1: 0,

    level2: 0,

    level3: 0,

    level4: 0,

    level5: 0,

    infinite: 0,

    overall: 0

};


export function loadHighScores() {

    const savedScores =
        localStorage.getItem(
            "nightfallHighScores"
        );


    if (savedScores) {

        try {

            const parsedScores =
                JSON.parse(savedScores);

            return {
                ...defaultHighScores,
                ...parsedScores
            };

        } catch (error) {

            console.error(
                "Could not load high scores:",
                error
            );

        }

    }


    return {
        ...defaultHighScores
    };

}


export function saveHighScores(
    highScores
) {

    localStorage.setItem(
        "nightfallHighScores",
        JSON.stringify(highScores)
    );

}


export function saveLevelScore(
    highScores,
    currentLevel,
    score
) {

    const levelKey =
        "level" + currentLevel;


    if (
        score >
        highScores[levelKey]
    ) {

        highScores[levelKey] =
            score;

        saveHighScores(
            highScores
        );

    }

}


export function saveOverallScore(
    highScores,
    overallRunScore
) {

    if (
        overallRunScore >
        highScores.overall
    ) {

        highScores.overall =
            overallRunScore;

        saveHighScores(
            highScores
        );

    }

}


export function saveInfiniteScore(
    highScores,
    score
) {

    if (
        score >
        (highScores.infinite || 0)
    ) {

        highScores.infinite =
            score;

        saveHighScores(
            highScores
        );

    }

}
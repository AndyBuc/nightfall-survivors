// ------------------------------------
// AUDIO
// ------------------------------------

const sounds = {
    background: new Audio("./audio/sinister loop.wav"),
    magicBolt: new Audio("./audio/Magic Smite.wav"),
    enemyDeath: new Audio("./audio/mutantdie.wav"),
    playerHit: new Audio("./audio/playerhit.mp3"),
    levelUp: new Audio("./audio/Power Up.wav"),
    gameOver: new Audio("./audio/GAMEOVER.wav"),
    levelComplete: new Audio("./audio/game.wav")
};

    sounds.levelUp.loop = false;

    sounds.enemyDeath.volume = 0.25;
    sounds.magicBolt.volume = 0.03;
    sounds.playerHit.volume = 0.5;
    sounds.levelUp.volume = 0.6;
    sounds.levelComplete.volume = 0.6;
    sounds.gameOver.volume = 0.6;


// ------------------------------------
// BACKGROUND MUSIC
// ------------------------------------

sounds.background.loop = true;
sounds.background.volume = 0.25;


// ------------------------------------
// PLAY SOUND
// ------------------------------------

export function playSound(soundName) {
    const sound = sounds[soundName];

    if (!sound) return;

    console.log("PLAYING SOUND:", soundName);

    sound.currentTime = 0;

    sound.play().catch(function(error) {
        console.log("Audio playback error:", error);
    });
}


// ------------------------------------
// START BACKGROUND MUSIC
// ------------------------------------

export function startBackgroundMusic() {

    sounds.background.play();
}


// ------------------------------------
// STOP BACKGROUND MUSIC
// ------------------------------------

export function stopBackgroundMusic() {

    sounds.background.pause();
    sounds.background.currentTime = 0;
}

export function stopAllSounds() {
    sounds.levelUp.pause();
    sounds.magicBolt.pause();
    sounds.enemyDeath.pause();
    sounds.playerHit.pause();
}
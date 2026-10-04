# Nightfall Survivors

## 1. Game Overview

Nightfall Survivors is a 2D survival game developed using HTML5 Canvas and JavaScript.

The player controls a character inside a fixed-screen arena while enemies spawn around the arena and move towards the player. The player automatically attacks nearby enemies using projectiles and must survive while defeating enemies, collecting experience and selecting upgrades.

The game contains two game modes:

- Campaign Mode
- Infinite Mode

Campaign Mode contains five levels with increasing difficulty:

1. Graveyard
2. Haunted Village
3. Castle Outskirts
4. Dark Citadel
5. Necromancer's Realm

Each campaign level has its own survival duration and difficulty settings. Enemy health, movement speed and spawning behaviour are adjusted between levels.

Infinite Mode allows the player to continue surviving without a fixed level completion time. Enemy difficulty increases as the player's survival time increases.

The game includes:

- Player movement
- Automatic attacks
- Enemy spawning
- Enemy AI
- Projectile and enemy collisions
- Player health and damage
- Experience and level progression
- Normal upgrades
- Special upgrades
- Campaign level progression
- Infinite Mode
- Pause functionality
- Game Over conditions
- Level completion
- Final campaign victory
- High Score storage
- Google OAuth2 authentication
- MySQL database storage
- Background music and sound effects
- Multiple game screens and menus

The gameplay and interface are implemented using HTML5 Canvas, JavaScript and CSS. The server-side functionality uses Node.js and Express, with MySQL used for persistent user and score data.

## 2. Main Features

### Gameplay

- Fixed-screen 2D gameplay using HTML5 Canvas.
- Player movement using the keyboard.
- Automatic projectile attacks.
- Enemies that spawn around the arena.
- Enemies that move towards the player.
- Player and enemy collision detection.
- Projectile and enemy collision detection.
- Player health and damage system.
- Enemy knockback.
- Enemy defeat and removal.
- Experience gems dropped by defeated enemies.
- Experience collection.
- Player level progression.
- Level-up upgrade selection.
- Normal upgrades.
- Special upgrades.
- Score tracking.
- Kill tracking.
- Survival-time tracking.
- Pause and resume functionality.

### Player Upgrades

The normal upgrade system contains:

- **Magic Bolt** — increases projectile damage.
- **Rapid Cast** — increases attack speed.
- **Fire Orb** — increases the number of projectiles.
- **Vitality** — increases maximum health.

The game also contains special upgrades:

- **Chain Lightning**
- **Forking Bolt**
- **Arc Blade**

Special upgrades are selected at specific player levels and provide additional attack abilities.

### Enemy Types

The game contains four enemy types:

- **Ghoul**
- **Bat**
- **Brute**
- **Necromancer**

Different enemy types have different movement speeds, health values and damage values.

Enemy types are introduced progressively during the campaign so that later levels contain stronger and more varied enemies.

### Game Modes

#### Campaign Mode

Campaign Mode contains five levels with increasing difficulty.

The player must survive the required duration of each level to progress to the next level.

#### Infinite Mode

Infinite Mode has no fixed completion time.

The objective is to survive for as long as possible while enemy difficulty increases over time.

### Game Screens

The application contains several different screens and game states, including:

- Start screen
- Main menu
- Game mode selection
- Gameplay screen
- Pause screen
- Level-up screen
- Level Complete screen
- Game Over screen
- Victory screen
- High Scores screen
- About screen

## 3. Application Flow

The game is organised into separate screens and game states.

### Start Screen

The application initially displays the start screen.

The player can continue from the start screen to the main menu.

### Main Menu

The main menu provides access to the main areas of the application:

- Play
- High Scores
- About

Selecting **Play** opens the game mode selection screen.

### Game Mode Selection

The player can choose between:

- Campaign Mode
- Infinite Mode

The player can also return to the main menu.

### Campaign Mode

When Campaign Mode is selected, a new campaign run is started.

The campaign contains five levels:

1. Graveyard
2. Haunted Village
3. Castle Outskirts
4. Dark Citadel
5. Necromancer's Realm

The player must survive each level for its required duration.

When a level is completed, the Level Complete screen is displayed before the next level begins.

### Infinite Mode

When Infinite Mode is selected, a new infinite run is started.

The player attempts to survive for as long as possible.

There is no final level in Infinite Mode. Enemy difficulty increases as survival time increases.

### Gameplay

During gameplay the player:

- Moves around the arena.
- Automatically attacks enemies.
- Avoids enemy contact.
- Defeats enemies.
- Collects experience gems.
- Levels up.
- Selects upgrades.
- Builds their score.
- Attempts to survive until the level is completed.

### Pause

The player can press `ESC` during gameplay to pause the game.

Pressing `ESC` again resumes the game.

The pause screen also provides an option to return to the main menu.

### Level Up

When the player gains enough experience, the game displays an upgrade selection screen.

The player chooses an available upgrade before continuing the game.

Normal upgrades and special upgrades are available.

### Level Complete

When the required survival time has been reached in Campaign Mode, the current level is completed.

The player's score is saved and the Level Complete screen is displayed.

The player can then continue to the next campaign level.

After completing Level 5, the campaign reaches its final victory state.

### Game Over

If the player's health reaches zero, the current run ends.

The Game Over screen is displayed and the player's score information is saved.

The player can start another game or return to the main menu.

### High Scores

The High Scores screen displays stored score information.

Scores can be stored locally using localStorage and authenticated player scores are also stored in the MySQL database.

### About

The About screen provides information about the game.

The player can return from the About screen to the main menu.

## 4. Technologies and Project Structure

### Technologies Used

The game is developed using:

- HTML5
- HTML5 Canvas
- JavaScript
- CSS
- Node.js
- Express.js
- MySQL
- Passport.js
- Google OAuth2
- localStorage

The game does not use a dedicated game engine.

### Project Structure

The project is organised into separate files and JavaScript modules.

    Nightfall Survivors/
    │
    ├── index.html
    ├── server.js
    ├── package.json
    ├── .env
    ├── .gitignore
    ├── README.md
    │
    ├── css/
    │   └── style.css
    │
    ├── js/
    │   ├── main.js
    │   ├── player.js
    │   ├── enemies.js
    │   ├── weapons.js
    │   ├── gameplay.js
    │   ├── obstacles.js
    │   ├── levels.js
    │   ├── storage.js
    │   ├── ui.js
    │   └── audio.js
    │
    └── audio/
        └── game audio files

### Main JavaScript Modules

#### `main.js`

Contains the main application flow, game loop, input, game modes, level progression, Game Over, score saving and menu navigation.

#### `player.js`

Contains the player object and player-related properties, including health, experience, level, attack properties, projectile count and special upgrades.

#### `enemies.js`

Contains enemy creation, enemy types, enemy movement, enemy AI, enemy health, enemy damage, knockback and enemy defeat.

#### `weapons.js`

Contains the player's projectile and weapon systems, including projectile creation and projectile collision handling.

#### `gameplay.js`

Contains gameplay-related functionality used by the main game.

#### `obstacles.js`

Contains the arena obstacle and collision functionality.

#### `levels.js`

Contains the campaign level settings, including level names, durations and difficulty values.

#### `storage.js`

Handles localStorage data, including local high scores and game state.

#### `ui.js`

Handles the HUD, upgrade screens, Game Over, Level Complete, Pause and High Scores.

#### `audio.js`

Handles background music and gameplay sound effects.

### Server

The Node.js server is contained in `server.js`.

The server handles Google OAuth2 authentication, user sessions, MySQL database communication and the score API.

### Database

The MySQL database is called:

    nightfall_survivors

The database contains two tables:

- `users`
- `scores`

The `users` table stores authenticated player information.

The `scores` table stores scores associated with authenticated players.

### Environment Configuration

Database credentials, Google OAuth2 credentials and the session secret are stored in the `.env` file.

The `.env` file is excluded from the project using `.gitignore`.

## 5. Data Storage and Database

### Local Storage

The game uses the browser's `localStorage` to store local game information.

The local high-score system stores separate scores for:

- Level 1
- Level 2
- Level 3
- Level 4
- Level 5
- Infinite Mode
- Overall score

The stored scores are loaded when the game starts and updated when a level or game ends.

### MySQL Database

The game also uses a MySQL database for persistent player and score information.

The database is called:

    nightfall_survivors

It contains two tables:

- `users`
- `scores`

### Users Table

The `users` table stores information about players who log in using Google OAuth2.

The table contains:

- `id`
- `oauth_provider`
- `oauth_id`
- `display_name`
- `email`
- `created_at`

Each Google account is linked to a unique OAuth provider and OAuth ID.

### Scores Table

The `scores` table stores completed game scores for authenticated players.

The table contains:

- `id`
- `user_id`
- `score`
- `level`
- `kills`
- `survival_time`
- `created_at`

The `user_id` field links each score to the authenticated player stored in the `users` table.

Campaign scores use the current campaign level.

Infinite Mode scores use `0` as the stored level value.

### Score Saving

When a game or campaign level ends, the game sends the score information to the Node.js server.

The server stores the score in the MySQL database.

The information saved includes:

- Score
- Level
- Kills
- Survival time

### Score Retrieval

The game can request the authenticated player's stored scores from the server.

The retrieved database scores are used by the High Scores screen.

If database scores cannot be loaded, the game can use the locally stored high scores.

## 6. Physics Features

### Player Movement

The player is moved using keyboard input and updated continuously by the game loop.

Player movement uses the elapsed frame time so that movement is updated consistently between frames.

The player is also restricted to the game area.

### Enemy Movement

Enemies are dynamic objects that move towards the player.

Each enemy has its own:

- Position
- Movement speed
- Health
- Damage
- Collision radius

Enemy movement is calculated using the direction from the enemy to the player.

### Knockback

Enemies have knockback values that are applied when they are hit.

The knockback effect is gradually reduced over time, allowing the enemy to return to its normal movement behaviour.

### Static Obstacles

The game contains static level obstacles.

Obstacles are created when a level starts and are used when checking movement and collision positions.

Players and enemies check their movement against obstacles so that they cannot move through blocked areas.

### Projectile Physics

Projectiles are dynamic objects created by the player's automatic weapon system.

Each projectile has a position and movement direction and is updated every frame.

Projectiles are removed when they leave the game area or after they interact with enemies.

### Collision Detection

The game uses collision detection for interactions between game objects.

Collision systems include:

- Player and enemy collisions.
- Projectile and enemy collisions.
- Player and XP gem collection.
- Player movement and obstacle collisions.
- Enemy movement and obstacle collisions.

### Player and Enemy Collision

When an enemy collides with the player, the player can take damage.

The collision system can trigger the Game Over state when the player's health reaches zero.

### Projectile and Enemy Collision

When a projectile collides with an enemy, damage is applied to the enemy.

When the enemy's health reaches zero, the enemy is removed and the game creates an XP gem for the player to collect.

### XP Gem Movement and Collection

XP gems are created when enemies are defeated.

They remain in the arena until collected by the player.

XP gems can move towards the player when attracted and are collected when they reach the player.

The collected experience contributes towards the player's level progression.

### Frame-Based Updates

The game uses a continuous game loop.

Each update uses elapsed time (`deltaTime`) to update movement, spawning, attacks, projectiles, collisions, experience and other gameplay systems.

The game therefore uses dynamic object updates and collision detection rather than relying on a dedicated external physics engine.

## 7. Levels and Difficulty

### Campaign Levels

The Campaign Mode contains five levels.

| Level | Name | Duration | Spawn Rate | Enemy Speed | Enemy Health |
| 1 | Graveyard | 60 seconds | 1.00 | 1.00 | 1.00 |
| 2 | Haunted Village | 75 seconds | 0.85 | 1.10 | 1.15 |
| 3 | Castle Outskirts | 90 seconds | 0.70 | 1.20 | 1.30 |
| 4 | Dark Citadel | 105 seconds | 0.55 | 1.35 | 1.50 |
| 5 | Necromancer's Realm | 120 seconds | 0.40 | 1.50 | 1.75 |

The level duration determines how long the player must survive before the level is completed.

The spawn rate determines the time between enemy spawns.

The enemy speed and enemy health values act as difficulty multipliers for enemies in each level.

### Enemy Progression

Enemy types are introduced progressively as the campaign advances.

#### Level 1

The first level mainly contains Ghouls, with some Bats.

#### Level 2

The second level increases the number of Bats while continuing to use Ghouls.

#### Level 3

Brutes are introduced alongside Ghouls and Bats.

#### Level 4

Necromancers are introduced, along with Ghouls, Bats and Brutes.

#### Level 5

The final level contains all four enemy types with a higher proportion of stronger enemies.

### Infinite Mode Difficulty

Infinite Mode uses increasing difficulty tiers based on survival time.

The difficulty multiplier starts at `1.0`.

Every 60 seconds of survival time, the difficulty tier increases by `0.15`.

This multiplier affects enemy spawning and enemy difficulty, allowing the challenge to increase continuously during an Infinite Mode run.

### Fixed-Screen Levels

The game uses a fixed Canvas size rather than a scrolling game world.

Each level is played within the same fixed-screen gameplay area while the level background and difficulty settings change between campaign levels.

## 8. Lose and Win Conditions

### Campaign Level Completion

A campaign level is completed when the player's survival time reaches the duration set for the current level.

When this happens:

- The game is paused.
- The current level score is saved.
- The score is added to the overall run score.
- The Level Complete screen is displayed.
- The player can continue to the next level.

### Campaign Victory

After completing Level 5, the campaign is completed.

The game displays the Victory screen showing:

- Total kills.
- Final overall run score.

The player can then start another campaign or return to the main menu.

### Game Over

The game ends when the player is defeated through enemy contact and the player's health reaches zero.

When Game Over occurs:

- The game stops running.
- The current score is saved.
- The relevant high score is updated.
- The Game Over screen is displayed.

The Game Over screen provides options to:

- Play Again.
- Return to the Main Menu.

### Infinite Mode

Infinite Mode does not have a final level or completion time.

The objective is to survive for as long as possible.

When the player is defeated, the Infinite Mode score is saved as an Infinite Mode high score.

## 9. Game Controls

### Movement

The player can move using either the keyboard keys or the arrow keys.

| Key | Action |
|---|---|
| `W` | Move up |
| `A` | Move left |
| `S` | Move down |
| `D` | Move right |
| `↑` | Move up |
| `←` | Move left |
| `↓` | Move down |
| `→` | Move right |

### Pause

The `ESC` key is used to pause and resume the game during gameplay.

When the game is running:

- Pressing `ESC` pauses the game.
- Pressing `ESC` again resumes the game.

The game also provides a Resume button and a Main Menu button on the pause screen.

The pause system does not activate while the upgrade selection screen is open.

### Automatic Attacks

The player's weapon attacks automatically during gameplay.

The player does not need a separate attack key.

The automatic weapon system targets enemies and creates projectiles during the game.

### Upgrade Selection

When the player levels up, the game pauses and displays an upgrade selection screen.

The player selects an upgrade using the available buttons.

The game resumes after an upgrade has been selected.

## 10. Graphics and Audio

### Graphics

The game uses the HTML5 Canvas 2D API to draw the gameplay area and game objects.

The gameplay area uses a dark background and a grid.

The player is drawn as a purple circle with a glow effect.

The enemy graphics include:

- Ghoul — red circular enemy with white eyes.
- Bat — purple angular enemy with yellow eyes.
- Brute — dark red square enemy with yellow eyes.
- Necromancer — purple circular enemy with an outer magic circle.

Other graphics used in the game include:

- Projectiles.
- XP gems.
- Enemy health bars.
- Arena obstacles.
- Level backgrounds.
- Player damage flash.
- Upgrade effects.
- Special attack effects.

The game changes the background according to the current campaign level.

### Audio

The game includes background music and gameplay sound effects.

The audio system is handled by `audio.js`.

The game uses audio for:

- Background music.
- Magic Bolt attacks.
- Enemy deaths.
- Player damage.
- Level ups.
- Level completion.
- Game Over.

The background music loops during gameplay.

Sound effects are triggered by gameplay events such as attacking, defeating enemies, taking damage, levelling up, completing a level and reaching Game Over.

## 11. OAuth2 Authentication

### Google OAuth2

The game uses Google OAuth2 authentication for player login.

Google authentication is handled on the Node.js server using Passport.js and the Google OAuth2 strategy.

### Login Process

The login process works as follows:

1. The player starts the game.
2. The game checks the current authentication status.
3. If the player is not authenticated, the Login screen is displayed.
4. The player selects the Google Login button.
5. The player is redirected to Google authentication.
6. After successful authentication, Google redirects back to the Node.js server.
7. The server identifies the player or creates a new user in the MySQL `users` table.
8. A session is created for the authenticated player.
9. The player is redirected back to the game.

### Authentication Status

The game checks the authentication status using:

`/auth/status`

The server returns whether the current player is authenticated.

If the player is already authenticated, the game can continue to the Main Menu without displaying the Login screen.

### Google Authentication Route

The Google login route is:

`/auth/google`

This route starts the Google OAuth2 authentication process.

The callback route is:

`/auth/google/callback`

This route processes the response from Google after authentication.

### User Database

When a player successfully logs in, their Google account information is stored in the MySQL `users` table.

The stored information includes:

- OAuth provider
- OAuth ID
- Display name
- Email address
- Account creation time

The OAuth provider and OAuth ID are used to identify the same Google account when the player logs in again.

### Sessions

The server uses Express sessions and Passport.js to maintain the authenticated player's login session.

The authenticated session is also used when saving and retrieving the player's scores from the MySQL database.

## 12. High Score System

### Local High Scores

The game maintains local high-score data using `localStorage`.

The stored high-score categories are:

- Level 1
- Level 2
- Level 3
- Level 4
- Level 5
- Infinite Mode
- Overall Score

When a new score is higher than the stored score for that category, the stored high score is updated.

### Campaign Scores

When a campaign level is completed, the score for that level is saved.

The score is also added to the overall campaign run score.

When the fifth level is completed, the final overall run score is displayed on the Victory screen.

### Infinite Mode Scores

When an Infinite Mode run ends, the score is saved separately as the Infinite Mode high score.

Infinite Mode does not use the campaign level high-score categories.

### Database Scores

Authenticated game scores are also saved to the MySQL database.

The saved information includes:

- Score
- Level
- Number of kills
- Survival time

The High Scores screen can load the authenticated player's scores from the database.

Database scores are separated into the five campaign levels and Infinite Mode.

### High Scores Screen

The High Scores screen displays the stored scores for:

- Level 1
- Level 2
- Level 3
- Level 4
- Level 5
- Infinite Mode
- Overall Score

## 13. NPC Behaviour and Automation

### Enemy Spawning

Enemies are automatically spawned during gameplay.

The game uses a spawn timer which is controlled by the current level's spawn rate.

When the spawn timer reaches zero, a new enemy is created and the timer is reset.

Enemies are spawned from outside the visible game area around one of the four edges of the Canvas.

### Enemy AI

Enemies automatically target the player.

Each enemy calculates the direction from its current position towards the player's position.

The enemy then moves towards the player during each game update.

This allows enemies to continuously chase the player without requiring manual control.

### Enemy Movement

Enemy movement is affected by:

- Enemy type.
- Current campaign level.
- Enemy speed multiplier.
- Infinite Mode difficulty.
- Knockback effects.
- Static obstacles.

When an enemy's normal movement is blocked by an obstacle, the movement system attempts alternative horizontal or vertical movement.

### Enemy Types

The game contains four enemy types:

- **Ghoul** — basic enemy.
- **Bat** — faster enemy with lower health.
- **Brute** — slower enemy with higher health and damage.
- **Necromancer** — stronger enemy used in later levels.

Different enemy types have different base movement speeds, health values and damage values.

### Enemy Progression

Enemy types are introduced progressively during Campaign Mode.

- Level 1 mainly contains Ghouls with some Bats.
- Level 2 contains Ghouls and more Bats.
- Level 3 introduces Brutes.
- Level 4 introduces Necromancers.
- Level 5 contains all four enemy types with stronger enemy composition.

### Difficulty Automation

The enemy system automatically changes the difficulty according to the current level.

Campaign difficulty is controlled by:

- Enemy spawn rate.
- Enemy speed multiplier.
- Enemy health multiplier.
- Enemy composition.

Infinite Mode also automatically increases its difficulty according to the player's survival time.

### Automatic Player Attacks

The player's weapon system is automated.

The game continuously searches for nearby enemies and automatically creates projectiles as part of the player's attack system.

The player therefore focuses on movement and survival rather than manually firing each projectile.

### Special Attack Automation

The player can obtain special upgrades that add automated attack effects.

These include:

- **Chain Lightning** — can jump between nearby enemies.
- **Forking Bolt** — provides additional projectile behaviour.
- **Arc Blade** — creates a rotating short-range attack around the player.

These abilities are activated and updated automatically while the player is in gameplay.

### Enemy Defeat

When an enemy's health reaches zero, the enemy is removed from the active enemy list.

An XP gem is then created for the defeated enemy.

The player's kill count and score are also increased.

This creates an automated gameplay cycle of enemy spawning, enemy targeting, combat, enemy defeat and XP generation.

## 14. Maintainability and Readability

### Modular Structure

The game is separated into multiple JavaScript modules so that different parts of the application have their own responsibilities.

This separates systems such as:

- Player functionality.
- Enemy functionality.
- Weapons.
- Gameplay systems.
- Obstacles.
- Levels.
- User interface.
- Audio.
- Local storage.
- Main application flow.

### Separate Level Configuration

Level settings are stored in `levels.js`.

This keeps the level names, durations, spawn rates, enemy speed values and enemy health values in one location.

This makes the level difficulty easier to modify without changing the main game logic.

### Separate User Interface System

The user interface functionality is contained in `ui.js`.

This keeps functions for the HUD, upgrade selection, Pause, Game Over, Level Complete and High Scores separate from the main game loop.

### Separate Storage System

Local high-score functionality is contained in `storage.js`.

This keeps localStorage operations separate from the gameplay code.

### Separate Audio System

Audio functionality is contained in `audio.js`.

This keeps background music and sound effect handling separate from the main gameplay systems.

### Environment Variables

Database credentials, OAuth2 credentials and the session secret are stored in `.env`.

The `.env` file is excluded using `.gitignore`.

This keeps sensitive configuration values separate from the main source code.

### Readability

The JavaScript files are organised into named sections and functions.

Comments are used throughout the main systems to identify areas such as:

- Game state.
- Input.
- Player movement.
- Enemy movement and AI.
- Automatic weapons.
- Projectile collisions.
- XP collection.
- Level progression.
- Game Over.
- Drawing.
- User interface systems.

The separation of functionality makes the code easier to follow, debug and modify.

## 15. Installation Requirements

### Playing the Game Online

A playable front-end version of the game is available through GitHub Pages:

    https://andybuc.github.io/nightfall-survivors/

This allows the game to be opened directly in a modern web browser without installing Node.js or MySQL just to play the front-end version.

The GitHub Pages version provides access to the HTML, CSS and JavaScript game files hosted online.

### Running the Complete Project Locally

The complete project, including the backend and database functionality, can be run locally.

The complete game requires:

- Node.js
- MySQL Server
- A modern web browser
- A local web server for serving the front-end files

MySQL Workbench can be used to create and manage the MySQL database.

### Node.js

Node.js is required to run the Express server.

The project uses Node.js packages installed through npm.

The required packages are installed using:

    npm install

### MySQL

MySQL Server is required for the database functionality.

The database used by the project is:

    nightfall_survivors

The `users` and `scores` tables must be created before using the database features.

### Google OAuth2

Google OAuth2 credentials are required for the login system.

The required Google OAuth2 configuration is stored in the `.env` file.

### Local Web Server

The front-end should be served through a local web server rather than opened directly using the `file://` protocol.

The current development setup uses:

    http://localhost:5500

The Node.js server runs on:

    http://localhost:3000

### Backend Functionality

The GitHub Pages version is intended to provide a convenient way to access and play the front-end game.

The complete Node.js, MySQL and Google OAuth2 functionality is included in the project source code and can be run locally using the setup instructions provided in this README.

## 16. Database Setup

### Create the Database

The project uses MySQL for persistent user and score data.

Create the database using:

    CREATE DATABASE nightfall_survivors;

### Create the Users Table

The `users` table stores authenticated player information.

Use the following SQL:

    USE nightfall_survivors;

    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        oauth_provider VARCHAR(50) NOT NULL,
        oauth_id VARCHAR(255) NOT NULL,
        display_name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_oauth_user (oauth_provider, oauth_id)
    );

### Create the Scores Table

The `scores` table stores scores belonging to authenticated players.

Use the following SQL:

    USE nightfall_survivors;

    CREATE TABLE scores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        score INT NOT NULL DEFAULT 0,
        level INT NOT NULL,
        kills INT NOT NULL DEFAULT 0,
        survival_time INT NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

### Database Connection

The Node.js server connects to the `nightfall_survivors` database using the settings stored in the `.env` file.

The server uses the `mysql2` package to communicate with MySQL.

The database connection is used for:

- Creating and identifying authenticated users.
- Saving completed game scores.
- Retrieving stored scores for the High Scores screen.


## 17. Environment Configuration

### `.env` File

The project uses an `.env` file to store configuration values that should not be included directly in the source code.

The `.env` file contains settings for:

- MySQL database connection.
- Express session configuration.
- Google OAuth2 authentication.

The submitted GitHub repository does not contain the actual passwords, Google Client ID or Google Client Secret.

A local `.env` file must be created when running the complete backend locally.

### Example `.env` File

The `.env` file should contain values similar to:

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=YOUR_MYSQL_PASSWORD
    DB_NAME=nightfall_survivors
    DB_PORT=3306

    SESSION_SECRET=YOUR_SESSION_SECRET

    GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
    GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
    GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

The placeholder values must be replaced with the appropriate local MySQL and Google OAuth2 configuration.

### Security

The actual `.env` file contains private configuration information and should not be uploaded to GitHub.

The project includes a `.gitignore` file containing:

    .env
    node_modules/

This prevents the private environment configuration and installed Node.js packages from being included in the Git repository.

### Google OAuth2 Configuration

Anyone running the complete backend locally must provide their own Google OAuth2 credentials.

The Google OAuth2 callback used by the local development server is:

    http://localhost:3000/auth/google/callback

The Google OAuth2 credentials are not included in the submitted project.

### Server Configuration

The Node.js server reads the values from the `.env` file when `server.js` starts.

These values are used to configure:

- MySQL database connection.
- Express session configuration.
- Google OAuth2 authentication.
- Google OAuth2 callback configuration.

## 18. Running the Game

### Running the Front-End

The front-end can be accessed through the GitHub Pages version of the project:

    https://andybuc.github.io/nightfall-survivors/

This allows the game to be opened in a modern web browser without installing the backend requirements.

### Running the Complete Project Locally

To run the complete project locally, first install the required Node.js packages.

Open a terminal in the project folder and run:

    npm install

After the required packages have been installed, make sure the MySQL database has been created and the `.env` file has been configured.

Start the Node.js server using:

    node server.js

The server should then run at:

    http://localhost:3000

The front-end should be served using a local web server.

The current development setup uses:

    http://localhost:5500

Open the game through the local web server rather than directly opening `index.html` using the `file://` protocol.

### Google Login

When running the complete local version, Google OAuth2 login uses the credentials configured in the `.env` file.

The local Google OAuth2 callback is:

    http://localhost:3000/auth/google/callback

The backend must be running for Google authentication and database score functionality to work.

### Database Features

When the complete project is running locally, authenticated users can:

- Log in using Google OAuth2.
- Save game scores to MySQL.
- Retrieve stored scores from MySQL.
- View their stored scores through the High Scores screen.

The GitHub Pages version does not require the local Node.js server or MySQL installation simply to access the front-end game.

## 19. External Assets and Attribution

### Graphics

The game's main gameplay graphics were created for Nightfall Survivors using HTML5 Canvas drawing functions.

The project does not use graphics from Vampire Survivors or other copyrighted game assets.

The player icon used for the browser favicon is based on the game's player visual.

### Audio

The project contains the following audio files:

- `sinister loop.wav`
- `Magic Smite.wav`
- `mutantdie.wav`
- `playerhit.mp3`
- `Power Up.wav`
- `GAMEOVER.wav`
- `game.wav`

These files are used for the game's background music and sound effects.

### Attribution

Any externally sourced graphics or sounds used in the final project must be attributed to their original source in accordance with their licence.

The source and licence information for each externally sourced asset should be recorded here before final submission.

No external source should be claimed unless it can be verified from the original asset source.

## 20. Assignment Requirements Summary

Nightfall Survivors was developed to address the main requirements of the assignment brief.

### Physics Features

The game includes:

- Dynamic player and enemy movement.
- Static arena obstacles.
- Player and enemy collision detection.
- Projectile and enemy collisions.
- XP gem collection.
- Knockback.
- Frame-based movement using elapsed time.

### Application Flow

The application includes:

- Start Screen.
- Login.
- Main Menu.
- Game Mode Selection.
- Gameplay.
- Pause.
- Level Up.
- Level Complete.
- Game Over.
- Victory.
- High Scores.
- About.

### Levels and Screens

The game uses fixed-screen Canvas gameplay.

Campaign Mode contains five levels with different durations and difficulty settings.

Local storage is used for local high-score and game-state information between screens and game sessions.

### Lose and Win Conditions

The game includes:

- Game Over when the player's health reaches zero.
- Campaign level completion after the required survival time.
- Final campaign Victory after completing Level 5.
- Infinite Mode survival scoring.

### Game Controls

The player can use:

- `W`, `A`, `S`, `D`
- Arrow keys
- `ESC` for Pause and Resume.

The player's attacks are automatic.

### OAuth2 Authentication

The game uses Google OAuth2 authentication through Passport.js.

Authenticated users are stored in the MySQL database and their game scores are associated with their account.

### Graphics and Audio

The game uses:

- HTML5 Canvas graphics.
- Original shape-based gameplay visuals.
- Level backgrounds.
- Player and enemy effects.
- Background music.
- Gameplay sound effects.

### NPC Behaviour and Automation

The game contains automated enemy behaviour including:

- Enemy spawning.
- Enemy targeting.
- Enemy movement towards the player.
- Enemy difficulty progression.
- Multiple enemy types.
- Automated player attacks.
- Automated special attack effects.

### Maintainability and Readability

The project is separated into JavaScript modules for different systems including:

- Player.
- Enemies.
- Weapons.
- Gameplay.
- Obstacles.
- Levels.
- Storage.
- User Interface.
- Audio.
- Main application flow.

The project also includes a README containing setup instructions, feature information and project documentation.

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

app.use(express.json());

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT)
});

db.query("SELECT 1", function(error) {
    if (error) {
        console.error(
            "MySQL connection failed:",
            error.message
        );
    } else {
        console.log(
            "MySQL connection successful!"
        );
    }
});

const PORT = 3000;

app.use(
    cors({
        origin: "http://localhost:5500",
        credentials: true
    })
);


// ============================================================
// SESSION
// ============================================================

app.use
    (session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));


// ============================================================
// PASSPORT
// ============================================================

app.use(passport.initialize());
app.use(passport.session());


// ============================================================
// GOOGLE OAUTH
// ============================================================

passport.use(
    new GoogleStrategy(
        {
            clientID:
                process.env.GOOGLE_CLIENT_ID,

            clientSecret:
                process.env.GOOGLE_CLIENT_SECRET,

            callbackURL:
                process.env.GOOGLE_CALLBACK_URL
        },

        function(
            accessToken,
            refreshToken,
            profile,
            done
        ) {

            const oauthProvider = "google";
            const oauthId = profile.id;
            const displayName =
                profile.displayName;

            const email =
                profile.emails &&
                profile.emails[0]
                    ? profile.emails[0].value
                    : null;

            const findUserSql = `
                SELECT *
                FROM users
                WHERE oauth_provider = ?
                AND oauth_id = ?
            `;

            db.query(
                findUserSql,
                [
                    oauthProvider,
                    oauthId
                ],

                function(
                    error,
                    results
                ) {

                    if (error) {

                        console.error(
                            "Error finding user:",
                            error
                        );

                        return done(error);
                    }

                    if (
                        results.length > 0
                    ) {

                        console.log(
                            "Existing user logged in:",
                            displayName
                        );

                        return done(
                            null,
                            results[0]
                        );
                    }

                    const insertUserSql = `
                        INSERT INTO users
                        (
                            oauth_provider,
                            oauth_id,
                            display_name,
                            email
                        )
                        VALUES (?, ?, ?, ?)
                    `;

                    db.query(
                        insertUserSql,
                        [
                            oauthProvider,
                            oauthId,
                            displayName,
                            email
                        ],

                        function(
                            error,
                            result
                        ) {

                            if (error) {

                                console.error(
                                    "Error creating user:",
                                    error
                                );

                                return done(
                                    error
                                );
                            }

                            console.log(
                                "New user saved to MySQL:",
                                displayName
                            );

                            const newUser = {

                                id:
                                    result.insertId,

                                oauth_provider:
                                    oauthProvider,

                                oauth_id:
                                    oauthId,

                                display_name:
                                    displayName,

                                email:
                                    email
                            };

                            return done(
                                null,
                                newUser
                            );
                        }
                    );
                }
            );
        }
    )
);


// ============================================================
// SESSION SERIALIZATION
// ============================================================

passport.serializeUser(
    function(
        user,
        done
    ) {

        done(
            null,
            user
        );

    }
);


passport.deserializeUser(
    function(
        user,
        done
    ) {

        done(
            null,
            user
        );

    }
);


// ============================================================
// HOME
// ============================================================

app.get(
    "/",
    function(
        req,
        res
    ) {

        res.send(
            "Nightfall Survivors server is running!"
        );

    }
);


// ============================================================
// SAVE SCORE
// ============================================================

app.post(
    "/api/scores",
    function(
        req,
        res
    ) {

        if (!req.isAuthenticated()) {

            return res.status(401).json({
                error:
                    "Not authenticated"
            });

        }

        const userId =
            req.user.id;

        const score =
            req.body.score;

        const level =
            req.body.level;

        const kills =
            req.body.kills;

        const survivalTime =
            req.body.survivalTime;

        const sql = `
            INSERT INTO scores
            (
                user_id,
                score,
                level,
                kills,
                survival_time
            )
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                userId,
                score,
                level,
                kills,
                survivalTime
            ],

            function(
                error,
                result
            ) {

                if (error) {

                    console.error(
                        "Error saving score:",
                        error
                    );

                    return res.status(500).json({
                        error:
                            "Failed to save score"
                    });

                }

                console.log(
                    "Score saved to MySQL:",
                    result.insertId
                );

                res.json({
                    success: true,
                    scoreId:
                        result.insertId
                });

            }
        );

    }
);


// ============================================================
// GET SCORES
// ============================================================

app.get(
    "/api/scores",
    function(
        req,
        res
    ) {

        if (!req.isAuthenticated()) {

            return res.status(401).json({
                error:
                    "Not authenticated"
            });

        }

        const userId =
            req.user.id;

        const sql = `
            SELECT
                id,
                score,
                level,
                kills,
                survival_time,
                created_at
            FROM scores
            WHERE user_id = ?
            ORDER BY score DESC
        `;

        db.query(
            sql,
            [userId],

            function(
                error,
                results
            ) {

                if (error) {

                    console.error(
                        "Error loading scores:",
                        error
                    );

                    return res.status(500).json({
                        error:
                            "Failed to load scores"
                    });

                }

                res.json(
                    results
                );

            }
        );

    }
);


// ============================================================
// AUTHENTICATION STATUS
// ============================================================

app.get(
    "/auth/status",
    function(
        req,
        res
    ) {

        if (
            req.isAuthenticated()
        ) {

            res.json({
                authenticated:
                    true,

                name:
                    req.user.displayName
            });

        } else {

            res.json({
                authenticated:
                    false
            });

        }

    }
);


// ============================================================
// GOOGLE LOGIN
// ============================================================

app.get(
    "/auth/google",

    passport.authenticate(
        "google",
        {
            scope: [
                "profile",
                "email"
            ]
        }
    )
);


// ============================================================
// GOOGLE CALLBACK
// ============================================================

app.get(
    "/auth/google/callback",

    passport.authenticate(
        "google",
        {
            failureRedirect:
                "http://localhost:3000/"
        }
    ),

    function(
        req,
        res
    ) {

        res.redirect(
            "http://localhost:5500/index.html"
        );

    }
);


// ============================================================
// START SERVER
// ============================================================

app.listen(
    PORT,
    function() {

        console.log(
            `Nightfall Survivors server running at http://localhost:${PORT}`
        );

    }
);
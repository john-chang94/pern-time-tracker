const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtGenerator = require('../util/jwtGenerator');
const validate = require('../middleware/validate');
const authorizeToken = require('../middleware/authorizeToken');

router.post('/register', validate, async (req, res) => {
    try {
        // Did not take out 'password' because we cannot change a const in the hash
        let { first_name, last_name, username, email, password, is_admin } = req.body;

        // Check if user exists
        const user = await pool.query(
            `SELECT * FROM users
                WHERE email = $1
                OR username = $2`,
            [email, username]
        )
        // Throw error if user exists
        if (user.rows.length !== 0) {
            return res.status(400).send('User already exists');
        }
        // Hash new user's password
        if (user.rows.length === 0) {

            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw new Error(err);
                bcrypt.hash(password, salt, async (err, hash) => {
                    if (err) throw new Error(err);
                    password = hash;

                    // Enter new user into db
                    const newUser = await pool.query(
                        `INSERT INTO users (first_name, last_name, username, email, password, is_admin)
                            VALUES ($1, $2, $3, $4, $5, $6)
                            RETURNING *`,
                        [first_name, last_name, username, email, password, is_admin]
                    )
                    // Generate jwt token
                    const token = jwtGenerator(newUser.rows[0].user_id);
                    res.status(200).json({
                        message: 'Register success',
                        token
                    });
                })
            })
        }

    } catch (err) {
        res.status(500).send('Server error');
    }
})

router.post('/signin', validate, async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        )
        if (user.rows.length === 0) {
            return res.status(400).send('Username or password is incorrect');
        }

        // Check if hashed password is a match
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).send('Username or password is incorrect')
        }

        // Provide token if successful
        const token = jwtGenerator(user.rows[0].user_id);
        res.status(200).json({
            message: 'Sign in success',
            user: user.rows[0],
            token
        });

    } catch (err) {
        res.status(500).send('Server error');
    }
})

// Return the user id to the client for init page load
router.get('/verify/user', authorizeToken, async (req, res) => {
    try {
        res.status(200).json({ user_id: req.id })
    } catch (err) {
        res.send(500).send('Unauthorized');
    }
})

router.get('/verify/:user_id', authorizeToken, async (req, res) => {
    try {
        const { user_id } = req.params;

        const user = await pool.query(
            `SELECT user_id, first_name, last_name, username, email, is_admin
                FROM users
                WHERE user_id = $1`,
            [user_id]
        )

        res.status(200).json({
            authorized: true,
            user: user.rows[0]
        });
    } catch (err) {
        res.status(500).send('Server error');
    }
})

module.exports = router;
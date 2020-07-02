const router = require('express').Router();
const pool = require('../db');
const validate = require('../middleware/validate');
const authorizeToken = require('../middleware/authorizeToken');

// Get all time entries
router.get('/entries', authorizeToken, async (req, res) => {
    try {
        const entries = await pool.query(
            'SELECT * FROM entries ORDER BY date DESC'
        )
        if (entries.rows.length === 0) {
            return res.status(404).send('No submitted entries');
        }
        res.status(200).json(entries.rows);

    } catch (err) {
        res.status(500).send('Server error');
    }
})

// Get all projects
router.get('/projects', authorizeToken, async (req, res) => {
    try {
        const projects = await pool.query(
            'SELECT * FROM projects'
        )
        if (projects.rows.length === 0) {
            return res.status(404).send('No assigned projects');
        }
        res.status(200).json(projects.rows);

    } catch (err) {
        res.status(500).send('Server error');
    }
})

// Get all users
router.get('/users', authorizeToken, async (req, res) => {
    try {
        const users = await pool.query(
            'SELECT * FROM users'
        )
        if (users.rows.length === 0) {
            return res.status(404).send('No registered users');
        }
        res.status(200).json(users.rows);

    } catch (err) {
        res.status(500).send('Server error');
    }
})

// Get all timesheets
router.get('/timesheets', authorizeToken, async (req, res) => {
    try {
        const timesheets = await pool.query(
            'SELECT * FROM weekly_timesheets ORDER BY week_start DESC'
        )
        if (timesheets.rows.length === 0) {
            return res.status(404).send('No submitted timesheets');
        }
        res.status(200).json(timesheets.rows);

    } catch (err) {
        res.status(500).send('Server error');
    }
})

module.exports = router;
const router = require('express').Router();
const pool = require('../db');
const validate = require('../middleware/validate');
const authorizeToken = require('../middleware/authorizeToken');
const { end } = require('../db');

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

router.get('/entries/search', authorizeToken, async (req, res) => {
    try {
        const { user_id, start_date, end_date } = req.query;

        // Get all time entries for a user between two dates
        if (user_id && start_date && end_date) {
            const userEntries = await pool.query(
                `SELECT * FROM entries
                    WHERE user_id = $1
                    AND date >= $2
                    AND date <= $3`,
                [user_id, start_date, end_date]
            )
            if (userEntries.rows.length === 0) {
                return res.status(404).send('No entries found');
            }
            res.status(200).json(userEntries.rows);

            // Get all time entries for a user from a date and forward
        } else if (user_id && start_date && !end_date) {
            const userEntries = await pool.query(
                `SELECT * FROM entries
                    WHERE user_id = $1
                    AND date >= $2`,
                [user_id, start_date]
            )
            if (userEntries.rows.length === 0) {
                return res.status(404).send('No entries found');
            }
            res.status(200).json(userEntries.rows);

            // Get all time entries for a user from a date and prior
        } else if (user_id && !start_date && end_date) {
            const userEntries = await pool.query(
                `SELECT * FROM entries
                    WHERE user_id = $1
                    AND date <= $2`,
                [user_id, end_date]
            )
            if (userEntries.rows.length === 0) {
                return res.status(404).send('No entries found');
            }
            res.status(200).json(userEntries.rows);

            // Get all time entries for a user
        } else if (user_id && !start_date && !end_date) {
            const userEntries = await pool.query(
                'SELECT * FROM entries WHERE user_id = $1',
                [user_id]
            )
            if (userEntries.rows.length === 0) {
                return res.status(404).send('No entries found');
            }
            res.status(200).json(userEntries.rows);

            // Return error if a user is not selected in any search
        } else if (
            (!user_id && !start_date && !end_date)
            || (!user_id &&
                (start_date && end_date)
                || (!start_date && end_date)
                || (start_date && !end_date)
                )
            ) {
            res.status(400).send('Please select a user');
        }

    } catch (err) {
        res.status(500).send('Server error');
    }
})

router.get('/timesheets/search', authorizeToken, async (req, res) => {
    try {
        const { user_id, start_date, end_date } = req.query;
        
        if (user_id && start_date && end_date) {
            const userTimesheets = await pool.query(
                `SELECT * FROM weekly_timesheets
                    WHERE user_id = $1
                    AND week_start >= $2
                    AND week_end <= $3`,
                [user_id, start_date, end_date]
            )
            if (userTimesheets.rows.length === 0) {
                return res.status(404).send('No timesheets found');
            }
            res.status(200).json(userTimesheets.rows);

        } else if (user_id && start_date && !end_date) {
            const userTimesheets = await pool.query(
                `SELECT * FROM weekly_timesheets
                    WHERE user_id = $1
                    AND week_start >= $2`,
                [user_id, start_date]
            )
            if (userTimesheets.rows.length === 0) {
                return res.status(404).send('No timesheets found');
            }
            res.status(200).json(userTimesheets);

        } else if (user_id && !start_date && end_date) {
            const userTimesheets = await pool.query(
                `SELECT * FROM weekly_timesheets
                    WHERE user_id = $1
                    AND week_start <= $2`,
                [user_id, end_date]
            )
            if (userTimesheets.rows.length === 0) {
                return res.status(404).send('No timesheets found');
            }
            res.status(200).json(userTimesheets);

        } else if (user_id && !start_date && !end_date) {
            const userTimesheets = await pool.query(
                'SELECT * FROM weekly_timesheets WHERE user_id = $1',
                [user_id]
            )
            if (userTimesheets.rows.length === 0) {
                return res.status(404).send('No entries found');
            }
            res.status(200).json(userTimesheets.rows);
            
        } else if (
            (!user_id && !start_date && !end_date)
            || (!user_id &&
                (start_date && end_date)
                || (!start_date && end_date)
                || (start_date && !end_date)
                )
            ) {
            res.status(400).send('Please select a user');
        }

    } catch (err) {
        res.status(500).send('Server error');
    }
})

module.exports = router;
const router = require('express').Router();
const pool = require('../db');
const validate = require('../middleware/validate');
const authorizeToken = require('../middleware/authorizeToken');

// Get all projects assigned to the logged in user
router.get('/projects/:user_id', authorizeToken, async (req, res) => {
    try {
        const { user_id } = req.params;
        const projects = await pool.query(
            `SELECT p.project_id, p.status, p.project_name, p.start_date, p.due_date
                FROM projects AS p
                    JOIN user_projects AS up
                    ON p.project_id = up.project_id
                WHERE up.user_id = $1`,
            [user_id]
        )
        if (projects.rows.length === 0) {
            return res.status(404).send('No assigned projects');
        }
        res.status(200).json(projects.rows);

    } catch (err) {
        res.status(500).send('Server error');
    }
})

// Get time entries submitted by the logged in user
router.get('/entries/:user_id/:week_start/:week_end', authorizeToken, async (req, res) => {
    try {
        const { user_id, week_start, week_end } = req.params;
        // Get entries for the current week
        const entries = await pool.query(
            `SELECT p.project_name, e.date, e.hours_worked, e.entry_id
                FROM projects AS p
                    JOIN entries AS e
                    ON p.project_id = e.project_id
                WHERE e.user_id = $1
                AND e.date BETWEEN $2 AND $3
                ORDER BY date DESC LIMIT 5`,
            [user_id, week_start, week_end]
        )
        // Get aggregated for current week
        const entriesTotal = await pool.query(
            `SELECT COUNT(date) AS total_entries, SUM(hours_worked) AS total_hours
                FROM entries
                WHERE user_id = $1
                AND date BETWEEN $2 AND $3`,
            [user_id, week_start, week_end]
        )
        if (entries.rows.length === 0) {
            return res.status(404).send('No submitted entries for this work week');
        }
        res.status(200).json({
            entries: entries.rows,
            entriesTotal: entriesTotal.rows[0]
        });

    } catch (err) {
        res.status(500).send('Server error');
    }
})

// Get all time entries for a weekly timesheet submitted by the logged in user
router.get('/entries/search', authorizeToken, async (req, res) => {
    try {
        const { user_id, start_date, end_date } = req.query;
        const entries = await pool.query(
            `SELECT p.project_name, e.date, e.hours_worked, e.entry_id
                FROM projects AS p
                    JOIN entries AS e
                    ON p.project_id = e.project_id
                WHERE e.user_id = $1
                    AND date >= $2
                    AND date <= $3
                ORDER BY date DESC LIMIT 5`,
            [user_id, start_date, end_date]
        )
        if (entries.rows.length === 0) {
            return res.status(404).send('No submitted entries');
        }
        res.status(200).json(entries.rows);

    } catch (err) {
        res.status(500).send('Server error');
    }
})

// Post a time entry
router.post('/entries', validate, authorizeToken, async (req, res) => {
    try {
        const { user_id, project_id, date, hours_worked } = req.body;

        // Check if an entry exists for the same date
        const findEntry = await pool.query(
            `SELECT * FROM entries
                WHERE user_id = $1
                AND date = $2`,
            [user_id ,date]
        )
        if (findEntry.rows.length !== 0) {
            return res.status(400).send('Maximum one time entry per work day. Remove current entry.');
        }

        const entry = await pool.query(
            `INSERT INTO entries (user_id, project_id, date, hours_worked)
                VALUES ($1, $2, $3, $4)
                RETURNING *`,
            [user_id, project_id, date, hours_worked]
        )
        res.status(201).json({
            message: 'Submission success',
            entry: entry.rows[0]
        });

    } catch (err) {
        res.status(500).send('Server error');
    }
})

// Update a time entry
router.put('/entries/:entry_id', validate, authorizeToken, async (req, res) => {
    try {
        const { entry_id } = req.params;
        const { project_id, date, hours_worked } = req.body;
        const entry = await pool.query(
            `UPDATE entries
                SET project_id = $1,
                    date = $2,
                    hours_worked = $3,
                WHERE entry_id = $4
                    AND user_id = $5
                RETURNING *`,
            [project_id, date, hours_worked, entry_id, req.id] // req.id is provided in token creation
        )
        res.status(200).json({
            message: 'Update success',
            entry: entry.rows[0]
        });

    } catch (err) {
        res.status(500).send('Server error');
    }
})

// Delete a time entry
router.delete('/entries/:entry_id', authorizeToken, async (req, res) => {
    try {
        const { entry_id } = req.params;
        const deletedEntry = await pool.query(
            `DELETE FROM entries
                WHERE entry_id = $1
                AND user_id = $2
            RETURNING *`,
            [entry_id, req.id]
        )
        if (deletedEntry.rows.length === 0) {
            return res.status(404).send('Entry not found');
        }
        res.status(200).json({
            message: 'Delete success',
            deleted: deletedEntry.rows[0]
        });

    } catch (err) {
        res.status(500).send('Server error');
    }
})

// Get all timesheets submitted by the logged in user
router.get('/timesheets/:user_id', authorizeToken, async (req, res) => {
    try {
        const { user_id } = req.params;
        const timesheets = await pool.query(
            `SELECT * FROM weekly_timesheets
                WHERE user_id = $1
                ORDER BY week_start DESC`,
            [user_id]
        )
        if (timesheets.rows.length === 0) {
            return res.status(404).send('No submitted timesheets');
        }
        res.status(200).json(timesheets.rows);

    } catch (err) {
        res.status(500).send('Server error');
    }
})

// Submit a weekly timesheet
router.post('/timesheets', authorizeToken, async (req, res) => {
    try {
        const { user_id, week_start, week_end, total_entries, total_hours } = req.body;

        const findTimesheet = await pool.query(
            `SELECT * FROM weekly_timesheets
                WHERE user_id = $1
                AND week_start = $2`,
            [user_id, week_start]
        )
        if (findTimesheet.rows.length !== 0) {
            return res.status(400).send('You already submitted your timesheet for this week');
        } 

        const timesheet = await pool.query(
            `INSERT INTO weekly_timesheets (user_id, week_start, week_end, total_entries, total_hours)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *`,
            [user_id, week_start, week_end, total_entries, total_hours]
        )
        res.status(201).json({
            message: 'Submit success',
            timesheet: timesheet.rows[0]
        });

    } catch (err) {
        res.status(500).send('Server error');
    }
})

module.exports = router;
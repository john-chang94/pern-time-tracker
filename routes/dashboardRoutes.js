const router = require('express').Router();
const pool = require('../db');
const validate = require('../middleware/validate');
const authorizeToken = require('../middleware/authorizeToken');

// Get all projects assigned to the logged in user
router.get('/projects/:id', authorizeToken, async (req, res) => {
    try {
        const { id } = req.params;
        const projects = await pool.query(
            `SELECT p.project_id, p.status, p.project_name, p.details, p.start_date, p.expected_completion
                FROM projects AS p
                    JOIN user_projects AS up
                    ON p.project_id = up.project_id
                WHERE up.user_id = $1`,
            [id]
        )
        if (projects.rows.length === 0) {
            return res.status(404).send('No assigned projects');
        }
        return res.status(200).json(projects.rows);

    } catch (err) {
        res.status(500).send('Server error');
    }
})

// Get all time entries submitted by the logged in user
router.get('/entries/:id', authorizeToken, async (req, res) => {
    try {
        const { id } = req.params;
        const entries = await pool.query(
            `SELECT * FROM entries
                WHERE user_id = $1
                ORDER BY date DESC`,
            [id]
        )
        if (entries.rows.length === 0) {
            return res.status(404).send('No submitted entries');
        }
        return res.status(200).json(entries.rows);

    } catch (err) {
        res.status(500).send('Server error');
    }
})

// Post a time entry
router.post('/create_entry', validate, authorizeToken, async (req, res) => {
    try {
        const { user_id, project_id, date, hours_worked, details } = req.body;
        const project = await pool.query(
            `INSERT INTO entries (user_id, project_id, date, hours_worked, details)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *`,
            [user_id, project_id, date, hours_worked, details]
        )
        if (project.rows.length !== 0) {
            return res.status(200).json(project.rows[0]);
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
})

// Update a time entry
router.put('/update_entry/:entry_id', validate, authorizeToken, async (req, res) => {
    try {
        const { entry_id } = req.params;
        const { project_id, date, hours_worked, details } = req.body;
        const project = await pool.query(
            `UPDATE entries
                SET project_id = $1,
                    date = $2,
                    hours_worked = $3,
                    details = $4
                WHERE entry_id = $5
                    AND user_id = $6
                RETURNING *`,
            [project_id, date, hours_worked, details, entry_id, req.id] // req.id is provided in token creation
        )
        if (project.rows.length !== 0) {
            return res.status(200).json(project.rows[0]);
        }

    } catch (err) {
        res.status(500).send('Server error');
    }
})

// Delete a time entry
router.delete('/delete_entry/:entry_id', authorizeToken, async (req, res) => {
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
        return res.status(200).json(deletedEntry.rows[0]);

    } catch (err) {
        res.status(500).send('Server error');
    }
})

module.exports = router;
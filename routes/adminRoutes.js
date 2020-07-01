const router = require('express').Router();
const pool = require('../db');
const validate = require('../middleware/validate');
const authorizeToken = require('../middleware/authorizeToken');

// Get all entries
router.get('/entries', authorizeToken, async (req, res) => {
    try {
        const entries = await pool.query(
            'SELECT * FROM entries'
        )
        if (entries.rows.length === 0) {
            return res.status(404).send('No submitted entries');
        }
        return res.status(200).json(entries.rows);

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
        return res.status(200).json(projects.rows);

    } catch (err) {
        res.status(500).send('Server error');
    }
})



module.exports = router;
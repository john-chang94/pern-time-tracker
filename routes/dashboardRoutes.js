const router = require('express').Router();
const pool = require('../db');
const validate = require('../middleware/validate');
const authorizeToken = require('../middleware/authorizeToken');

router.get('/projects/:id', authorizeToken, async (req, res) => {
    try {
        const { id } = req.params;
        const projects = await pool.query(
            `SELECT p.project_id, p.status, p.project_name, p.details, p.start_date, p.expected_completion
            FROM projects AS p JOIN user_projects AS up
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

module.exports = router;
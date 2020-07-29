const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
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

// Get all users by last name 
router.get('/users', authorizeToken, async (req, res) => {
    const { is_admin } = req.query;
    try {
        if (is_admin) {
            const users = await pool.query(
                `SELECT * FROM users
                    WHERE is_admin = $1
                    ORDER BY last_name ASC`,
                [is_admin]
            )
            if (users.rows.length === 0) {
                return res.status(404).send('No registered users');
            }
            res.status(200).json(users.rows)
        }

        if (!is_admin) {
            const users = await pool.query(
                `SELECT * FROM users
                ORDER BY last_name ASC`
            )
            if (users.rows.length === 0) {
                return res.status(404).send('No registered users');
            }
            res.status(200).json(users.rows);
        }

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

// Get all entries for a timesheet
router.get('/entries/:user_id/:week_start/:week_end', authorizeToken, async (req, res) => {
    try {
        const { user_id, week_start, week_end } = req.params;
        // Get entries for the current week
        const entries = await pool.query(
            `SELECT * FROM entries
                WHERE user_id = $1
                AND date BETWEEN $2 AND $3
                ORDER BY date DESC LIMIT 5`,
            [user_id, week_start, week_end]
        )
        if (entries.rows.length === 0) {
            return res.status(404).send('No submitted entries for this work week');
        }
        res.status(200).json({
            entries: entries.rows
        });

    } catch (err) {
        res.status(500).send('Server error');
    }
})

// Get a specific user
router.get('/users/:user_id', authorizeToken, async (req, res) => {
    try {
        const { user_id } = req.params;

        const user = await pool.query(
            `SELECT * FROM users WHERE user_id = $1`,
            [user_id]
        )
        if (user.rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user.rows[0]);

    } catch (err) {
        res.status(500).send('Server error');
    }
})

// Update user info
router.put('/users/:user_id', validate, authorizeToken, async (req, res) => {
    try {
        const { user_id } = req.params;
        const { first_name, last_name, username, email, is_admin } = req.body;

        if (!first_name || !last_name || !username || !email) {
            return res.status(400).send('Missing information')
        }

        const user = await pool.query(
            `UPDATE users
                SET first_name = $1,
                    last_name = $2,
                    username = $3,
                    email = $4,
                    is_admin = $5
                WHERE user_id = $6
                RETURNING *`,
            [first_name, last_name, username, email, is_admin, user_id]
        )
        res.status(200).json({
            message: 'Update user success',
            updatedUser: user.rows[0]
        })

    } catch (err) {
        res.status(500).send('Server error');
    }
})

// Change user's password
router.put('/users/change-password/:user_id', authorizeToken, async (req, res) => {
    try {
        const { user_id } = req.params;
        let { password, newPassword, confirmNewPassword } = req.body;

        const user = await pool.query(
            `SELECT * FROM users WHERE user_id = $1`,
            [user_id]
        )

        // Check for user's current password
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) return res.status(400).send('Incorrect password');

        // Check for new password and confirm new password to match
        const newPasswordMatch = newPassword === confirmNewPassword;
        if (!newPasswordMatch) return res.status(400).send('New password does not match');

        // If password checks are fine, create a new hashed password
        if (validPassword) {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw new Error(err);
                bcrypt.hash(newPassword, salt, async (err, hash) => {
                    if (err) throw new Error(err);
                    newPassword = hash;

                    const changedPassUser = await pool.query(
                        `UPDATE users
                            SET password = $1
                            WHERE user_id = $2
                        RETURNING *`,
                        [newPassword, user_id]
                    )
                    res.status(200).json({
                        message: 'Password change success',
                        changedPassUser: changedPassUser.rows[0]
                    })
                })
            })
        }

    } catch (err) {
        res.status(500).send('Server error');
    }
})

// Get entries for a user between two periods
router.get('/entries/search', validate, authorizeToken, async (req, res) => {
    try {
        const { user_id, start_date, end_date } = req.query;

        // Get all entries for a selected user
        const userEntries = await pool.query(
            `SELECT * FROM entries
                WHERE user_id = $1
                AND date >= $2
                AND date <= $3`,
            [user_id, start_date, end_date]
        )
        // Get aggregated for a selected user
        const userEntriesTotal = await pool.query(
            `SELECT
                COUNT(entry_id) AS entry_count,
                COUNT(DISTINCT project_id) AS project_count,
                SUM(hours_worked) AS total_hours
            FROM entries
                WHERE user_id = $1`,
            [user_id]
        )
        if (userEntries.rows.length === 0) {
            return res.status(404).send('No time entries found');
        }
        res.status(200).json({
            userEntries: userEntries.rows,
            userEntriesTotal: userEntriesTotal.rows[0]
        });

    } catch (err) {
        res.status(500).send('Server error');
    }
})

router.get('/timesheets/:user_id/:start_date/:end_date', validate, authorizeToken, async (req, res) => {
    try {
        const { user_id, start_date, end_date } = req.params;

        const userTimesheets = await pool.query(
            `SELECT * FROM weekly_timesheets
                WHERE user_id = $1
                AND week_start BETWEEN $2 AND $3
                ORDER BY week_start DESC`,
            [user_id, start_date, end_date]
        )
        const userTimesheetsTotal = await pool.query(
            `SELECT
                COUNT(timesheet_id) AS total_timesheets,
                SUM(total_entries) AS total_entries,
                SUM(total_hours) AS total_hours
            FROM weekly_timesheets
                WHERE user_id = $1
                AND week_start BETWEEN $2 AND $3`,
            [user_id, start_date, end_date]
        )
        if (userTimesheets.rows.length === 0) {
            return res.status(404).send('No timesheets found');
        }
        res.status(200).json({
            userTimesheets: userTimesheets.rows,
            userTimesheetsTotal: userTimesheetsTotal.rows[0]
        });

    } catch (err) {
        res.status(500).send('Server error');
    }
})

// Post a new project
router.post('/projects', validate, authorizeToken, async (req, res) => {
    try {
        const { project_name, details, start_date, due_date } = req.body;
        // Check if project name already exists
        const findProject = await pool.query(
            'SELECT * FROM projects WHERE project_name = $1',
            [project_name]
        )
        if (findProject.rows.length !== 0) {
            return res.status(400).send('Project name already exists');
        }

        // Create a new project and add to projects table
        const project = await pool.query(
            `INSERT INTO projects (project_name, details, start_date, due_date)
                VALUES ($1, $2, $3, $4)
                RETURNING *`,
            [project_name, details, start_date, due_date]
        )
        res.status(201).json({
            message: 'Create project success',
            project: project.rows[0]
        })
    } catch (err) {
        res.status(500).send('Server error');
    }
})

// Update project info
router.put('/projects/:project_id', validate, authorizeToken, async (req, res) => {
    try {
        const { project_id } = req.params;
        const { status, project_name, details, start_date, due_date } = req.body;

        const project = await pool.query(
            `UPDATE projects
                SET status = $1,
                    project_name = $2,
                    details = $3,
                    start_date = $4,
                    due_date = $5
                WHERE project_id = $6
                RETURNING *`,
            [status, project_name, details, start_date, due_date, project_id]
        )
        res.status(200).json({
            message: 'Project update success',
            updatedProject: project.rows[0]
        })
    } catch (err) {
        res.status(500).send('Server error');
    }
})

// Get all assigned users for a project
router.get('/user-projects/:project_id', authorizeToken, async (req, res) => {
    try {
        const { project_id } = req.params;

        const projectUsers = await pool.query(
            `SELECT u.user_id, u.first_name, u.last_name
                FROM users AS u
                    JOIN user_projects AS up
                    ON u.user_id = up.user_id
                WHERE up.project_id = $1`,
            [project_id]
        )
        if (projectUsers.rows.length === 0) {
            return res.status(404).send('No assigned users');
        }
        res.status(200).json(projectUsers.rows);

    } catch (err) {
        res.status(500).send('Server error');
    }
})

// Assign a user to a project
router.post('/user-projects', authorizeToken, async (req, res) => {
    try {
        const { user_id, project_id } = req.body;

        // Check if user is already assigned to project
        const findUserProject = await pool.query(
            `SELECT * FROM user_projects
                WHERE user_id = $1
                AND project_id = $2`,
            [user_id, project_id]
        )
        if (findUserProject.rows.length !== 0) {
            return res.status(400).send('User is already assigned to this project');
        }
        // Add project to user_projects table
        const assignedProject = await pool.query(
            `INSERT INTO user_projects (user_id, project_id)
                VALUES ($1, $2)
                RETURNING *`,
            [user_id, project_id]
        )
        res.status(201).json(assignedProject.rows[0]);
    } catch (err) {
        res.status(500).send('Server error');
    }
})

// Remove user from a project
router.delete('/user-projects/:user_id/:project_id', authorizeToken, async (req, res) => {
    try {
        const { user_id, project_id } = req.params;

        const deleteUserProject = await pool.query(
            `DELETE FROM user_projects
                WHERE user_id = $1
                AND project_id = $2
            RETURNING *`,
            [user_id, project_id]
        )
        res.status(200).json({
            message: 'Removed user from project',
            removedUser: deleteUserProject.rows[0]
        })
    } catch (err) {
        res.status(500).send('Server error');
    }
})

module.exports = router;
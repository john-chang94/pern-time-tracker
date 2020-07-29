module.exports = (req, res, next) => {
    const {
        first_name,
        last_name,
        username,
        email,
        password,
        status,
        project_name,
        details,
        project_id,
        date,
        hours_worked
    } = req.body;

    const {
        user_id,
        start_date,
        end_date
    } = req.query;

    // Check if email is valid
    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    if (req.path === "/register") {
        if (![first_name, last_name, username, email, password].every(Boolean)) {
            return res.status(401).send("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401).send("Invalid Email");
        }
    } else if (req.path === '/signin') {
        if (![username, password].every(Boolean)) {
            return res.status(401).send("Missing Credentials");
        }
    } else if (req.path === '/users') {
        if (![first_name, last_name, username, email, is_admin].every(Boolean)) {
            return res.status(401).send("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401).send("Invalid Email");
        }
    } else if (req.path === '/projects') {
        if (!project_name) {
            return res.status(400).send('Project name required');
        }
        if (!details) {
            return res.status(400).send('Project details required');
        }
    } else if (req.path === '/entries') {
        if (!project_id) {
            return res.status(400).send('Project is required');
        }
        if (!date) {
            return res.status(400).send('Date is required');
        }
        if (!hours_worked) {
            return res.status(400).send('Hours worked required');
        }
    } else if (req.path === '/entries/search' || req.path === '/timesheets/search') {
        if (!user_id) {
            return res.status(400).send('Please select a user');
        }
        if (!start_date) {
            return res.status(400).send('Start date is required');
        }
        if (!end_date) {
            return res.status(400).send('End date is required');
        }
    }

    next();
};
module.exports = (req, res, next) => {
    const {
        first_name,
        last_name,
        username,
        email,
        password,
        isAdmin,
        status,
        project_name,
        details,
        user_id,
        project_id,
        date,
        hours_worked
    } = req.body;

    // Check if email is valid
    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    if (req.path === "/register") {
        if (![first_name, last_name, username, email, password, isAdmin].every(Boolean)) {
            return res.status(401).send("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401).send("Invalid Email");
        }
    } else if (req.path === '/update_user') {
        if (![first_name, last_name, username, email, password, isAdmin].every(Boolean)) {
            return res.status(401).send("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401).send("Invalid Email");
        }
    } else if (req.path === '/create_project') {
        if (![status].every(Boolean)) {
            return res.status(400).send('Project status required');
        }
        if (![project_name].every(Boolean)) {
            return res.status(400).send('Project name required');
        }
        if (![details].every(Boolean)) {
            return res.status(400).send('Project details required');
        }
    } else if (req.path === "/login") {
        if (![username, password].every(Boolean)) {
            return res.status(401).send("Missing Credentials");
        }
    } else if (req.path === '/create_entry' || req.path === '/update_entry') {
        if (![user_id].every(Boolean)) {
            return res.status(400).send("User ID is required");
        }
        if (![project_id].every(Boolean)) {
            return res.status(400).send('Project is required');
        }
        if (![date].every(Boolean)) {
            return res.status(400).send('Date is required');
        }
        if (![hours_worked].every(Boolean)) {
            return res.status(400).send('Hours worked required');
        }
    } 

    next();
};
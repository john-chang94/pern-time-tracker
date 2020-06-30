module.exports = (req, res, next) => {
    const { first_name, last_name, username, email, password, name, details, date, hours_worked } = req.body;

    // Check if email is valid
    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    if (req.path === "/register") {
        // Check if values are empty
        if (![first_name, last_name, username, email, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    } else if (req.path === "/login") {
        if (![username, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        }
    }

    next();
};
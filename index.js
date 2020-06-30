const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors());
app.use(express.json());

app.use('/auth', require('./routes/authRoutes'));
app.use('/dashboard', require('./routes/dashboardRoutes'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
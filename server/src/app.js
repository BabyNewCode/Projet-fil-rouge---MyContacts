const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contacts');
const setupSwagger = require('./swagger');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

setupSwagger(app);

app.get('/', (req, res) => res.send('API Contacts fonctionne'));

module.exports = app;

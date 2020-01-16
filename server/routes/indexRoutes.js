const express = require('express');
const app = express();

app.use(require('./login'));
app.use(require('./routes'));
app.use(require('./categoria'));
app.use(require('./productos'));
app.use(require('./uplodad'));
app.use(require('./imagenes'));
module.exports = app;
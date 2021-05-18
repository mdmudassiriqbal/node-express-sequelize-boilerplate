const express = require('express');
const app = require('../app');

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true }));

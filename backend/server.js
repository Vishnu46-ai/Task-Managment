const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected');
});

app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/tasks', (req, res) => {
  const { task } = req.body;
  db.query('INSERT INTO tasks (task) VALUES (?)', [task], (err) => {
    if (err) throw err;
    res.send('Task added');
  });
});

app.delete('/tasks/:id', (req, res) => {
  db.query('DELETE FROM tasks WHERE id=?', [req.params.id], (err) => {
    if (err) throw err;
    res.send('Task deleted');
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));


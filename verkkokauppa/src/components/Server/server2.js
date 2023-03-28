const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
////Tähän saa määrittää mitä porttia käyttää.
const port = process.env.PORT || 5000; ///<----- Portti 5000

app.use(cors());
app.use(express.json());
/// Connectionstring salaus environment fileen alla:
require('dotenv').config();

//Haetaan connectionstring tiedot .env filusta
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  ssl: true
});
/////// Haetaan Kaikki asiakkaat
app.get('/asiakkaat', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM asiakas');
    console.log(rows);
    res.json(rows);
  } catch (error) {
    console.error(error + "Asiakkaat haussa");
    res.status(500).send('Internal Server Error');
  }
});
///////// Haetaan kaikki tuotteet
app.get('/tuotteet', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM tuote');
    console.log(rows);
    res.json(rows);
  } catch (error) {
    console.error(error + "Tuotteiden haussa");
    res.status(500).send('Internal Server Error');
  }
});
////////// Haetaan kaikki kategoriat
app.get('/kategoriat', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM kategoria');
      console.log(rows);
      res.json(rows);
    } catch (error) {
      console.error(error + "Kategoriat haussa");
      res.status(500).send('Internal Server Error');
    }
  });



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

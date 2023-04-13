const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
////Tähän saa määrittää mitä porttia käyttää.
const port = process.env.PORT || 5000; ///<----- Portti 5000

app.use(bodyParser.json());
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


/////// Haetaan yksi tuote
app.get('/tuote/:id', async (req, res) => {
  try {
    //use capitalized SQL keywords
    //use dollar sign parameterized queries
    const { rows } = await pool.query('SELECT * FROM tuote WHERE "tuoteID" = $1', [req.params.id]);
    console.log(rows);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

/////// Haetaan kategoria tuotteet
app.get('/kategoria/:id', async (req, res) => {
  try {
    //use capitalized SQL keywords
    //use dollar sign parameterized queries
    const { rows } = await pool.query('SELECT * FROM tuote WHERE "kategoriaid" = $1', [req.params.id]);
    console.log(rows);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

/// Yksittäisen asiakkaan lisäys
app.post('/addasiakas', async (req, res) => {
  try {
    const { nimi, email, osoite, puhelinnro } = req.body;
    const query = `INSERT INTO asiakas (nimi, email, osoite, puhelinnro) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [nimi, email, osoite, puhelinnro];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Virhe lisättäessä asiakkaan tietoja:', error);
    res.status(500).json({ error: 'asiakkaan lisäys epäonnistui' });
  }
});

//// Tilauksen luonti uudelle asiakkaalle

app.post('/tilaus', async (req, res) => {
  try {
    const { asiakas, orderData, grandTotal } = req.body;
   
    //1: Uuden asiakkaan lisäys
    const newCustomerQuery = `INSERT INTO asiakas (nimi, email, osoite, puhelinnro) VALUES ($1, $2, $3, $4) RETURNING "asiakasID"`;
    const newCustomerValues = [asiakas.nimi, asiakas.email, asiakas.osoite, asiakas.puhelinnro];
    const newCustomerResult = await pool.query(newCustomerQuery, newCustomerValues);
    const customerId = newCustomerResult.rows[0].asiakasID;
   
    // 2: Tilauksen luonti uudelle asiakkaalle
    const newOrderQuery = `INSERT INTO tilaus (asiakasid, tilauspvm, summa) VALUES ($1, $2, $3) RETURNING "tilausID"`;
    const newOrderValues = [customerId, new Date(), grandTotal]; 
    const newOrderResult = await pool.query(newOrderQuery, newOrderValues);
    const orderId = newOrderResult.rows[0].tilausID;

    // 3: tuotteiden lisäys tilaustuotteisiin
    for (const product of orderData) {
      const newOrderItemQuery = `INSERT INTO "tilausTuotteet" (tilausid, tuoteid, kpl, summa) VALUES ($1, $2, $3, $4)`;
      const newOrderItemValues = [orderId, product.tuoteid, product.määrä, product.määrä * product.hinta]; 
      await pool.query(newOrderItemQuery, newOrderItemValues);
    }

    res.json({ message: 'Tilaus onnistui!' });
  } catch (err) {
    console.error('Virhe tilauksen luonnissa:', err);
    res.status(500).json({ error: 'Tilaus epäonnistui' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

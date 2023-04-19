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

//// Asiakastilin kirjautuminen + Asiakastiliin liitetyn tilauksen ja tuotteiden haku

/*
app.post('/login', (req, res) => {
  const { username, password } = req.body.LogInCredentials;

  /// Etsitään AsiakasTilistä tunnuksia vastaava rivi
  pool.query('SELECT "asiakasID" FROM asiakasTili WHERE Username = $1 AND Password = $2', [username, password], (error, results) => {
    if (error) {
      throw error;
    }

    if (results.rows.length > 0) {
      const customerId = results.rows[0].CustomerID;

      //// Haetaan mätsäävät asiakastiedot
      pool.query('SELECT * FROM asiakas WHERE "asiakasID" = $1', [customerId], (error, results) => {
        if (error) {
          throw error;
        }

        const customerData = results.rows[0];

        //// Haetaan kyseisen asiakkaan tilauksen tiedot
        pool.query('SELECT * FROM tilaus WHERE "asiakasid" = $1', [customerId], (error, results) => {
          if (error) {
            throw error;
          }

          const orders = results.rows;

          /// Haetaan kyseisen asiakkaan tilauksen tuotteet
          Promise.all(
            orders.map((order) =>
              pool.query('SELECT * FROM tilausTuotteet WHERE "tilausid" = $1', [order.OrderID])
            )
          ).then((orderItemsResults) => {
            const orderItems = orderItemsResults.map((result) => result.rows);

            // Tilauksen kaikki tiedot
            const data = {
              customer: customerData,
              orders,
              orderItems,
            };

            res.status(200).json(data);
          });
        });
      });
    } else {
      res.status(401).send('Tunnuksia ei löytynyt');
    }
  });
});
*/

const logIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    
     /// Etsitään AsiakasTilistä tunnuksia vastaava rivi
    const customerAccount = await pool.query(
      'SELECT * FROM "asiakasTili" WHERE Username = $1 AND Password = $2',
      [username, password]
    );
    
    if (customerAccount.rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    
    const customerID = customerAccount.rows[0].CustomerID;
    
    //// Haetaan mätsäävät asiakastiedot
    const customer = await pool.query(
      'SELECT * FROM asiakas WHERE "asiakasID" = $1',
      [customerID]
    );
    
     //// Haetaan kyseisen asiakkaan tilauksen tiedot
    const orders = await pool.query(
      'SELECT * FROM tilaus WHERE "asiakasid" = $1',
      [customerID]
    );
    
    /// Haetaan kyseisen asiakkaan tilauksen tuotteet
    const orderItems = await pool.query(
      'SELECT * FROM "tilausTuotteet" WHERE "tilausid" IN (SELECT "tilausID" FROM tilaus WHERE "asiakasid" = $1)',
      [customerID]
    );
    
    const data = {
      customer: customer.rows[0],
      orders: orders.rows,
      orderItems: orderItems.rows,
    };
    
    return res.status(200).json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Yhteysvirhe" });
  }
};


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

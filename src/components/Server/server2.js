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
    //console.log(rows);
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
    //console.log(rows);
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
      //console.log(rows);
      res.json(rows);
    } catch (error) {
      console.error(error + "Kategoriat haussa");
      res.status(500).send('Internal Server Error');
    }
  });
/// Kaikki tilauksessa olevat tuotteet
  app.get('/tilaustuotteet', async (req, res) => {
    try {
      const query = 'SELECT * FROM "tilausTuotteet"';
      const result = await pool.query(query);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.get('/tilaus', async (req, res) => {
    try {
      const query = 'SELECT * FROM "tilaus"';
      const result = await pool.query(query);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/asiakastilit', async (req, res) => {
    try {
      const query = 'SELECT * FROM "asiakasTili" ';
      const result = await pool.query(query);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
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
    console.log(JSON.stringify(values))
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
    const { userID, asiakas, orderData, grandTotal } = req.body;

    // 1: Uuden asiakkaan lisäys, jos userID on null
    let customerId;
    if (!userID) {
      const newCustomerQuery = `INSERT INTO asiakas (nimi, email, osoite, puhelinnro) VALUES ($1, $2, $3, $4) RETURNING "asiakasID"`;
      const newCustomerValues = [asiakas.nimi, asiakas.email, asiakas.osoite, asiakas.puhelinnro];
      const newCustomerResult = await pool.query(newCustomerQuery, newCustomerValues);
      customerId = newCustomerResult.rows[0].asiakasID;

      // Luodaanko asiakastili
      if (asiakas.ATluonti) {
        console.log("asiakastiliä luodaan")
        await pool.query(
          'INSERT INTO "asiakasTili" ("asiakasID", username, password) VALUES ($1, $2, $3)',
          [customerId, asiakas.email, asiakas.password]
        );
      }
    } else {
      customerId = userID;
    }

    if(orderData && orderData.length > 0){
    // 2: Tilauksen luonti uudelle tai vanhalle asiakkaalle
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
  }

    res.json({ message: 'Tilaus onnistui!' });
  } catch (error) {
    console.error('Virhe tilauksen luonnissa:', error);
    res.status(500).json({ error: 'Tilaus epäonnistui' });
  }
});


//// Asiakastilin kirjautuminen + Asiakastiliin liitetyn tilauksen ja tuotteiden haku
/*

app.post('/login', (req, res) => {
  const { username, password } = req.body.LogInCredentials;

  /// Etsitään AsiakasTilistä tunnuksia vastaava rivi
  pool.query('SELECT "asiakasID" FROM asiakasTili WHERE username = $1 AND password = $2', [username, password], (error, results) => {
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
              pool.query('SELECT * FROM "tilausTuotteet" WHERE "tilausid" = $1', [order.OrderID])
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

/*
app.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    
     /// Etsitään AsiakasTilistä tunnuksia vastaava rivi
    const customerAccount = await pool.query(
      'SELECT * FROM "asiakasTili" WHERE username = $1 AND password = $2',
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
});
*/

// Route for logging in
app.post('/login', async (req, res) => {
  try {
    const  loginData  = req.body;
    console.log("Login servulla")
    console.log(JSON.stringify(loginData))

    // Löytyykö asiakastiliä
    const accountQuery = 'SELECT * FROM "asiakasTili" WHERE username = $1 AND password = $2';
    const accountValues = [loginData.email, loginData.password];
    const accountResult = await pool.query(accountQuery, accountValues);
    if (accountResult.rows.length === 0) {
      res.status(401).send('Virheellinen tunnus tai salasana');
      return;
    }
    console.log('Asiakastilin setit:', accountResult.rows[0]);
    console.log("Asiakastili haettu")
    // Asiakkaan tiedot
    const customerId = accountResult.rows[0].asiakasID;

    //console.log("AsiakasID:")
    //console.log(JSON.stringify(customerId))
    const customerQuery = 'SELECT * FROM asiakas WHERE "asiakasID" = $1';
    const customerValues = [customerId];
    const customerResult = await pool.query(customerQuery, customerValues);
    console.log('Asiakkaan tiedot:');
    console.log(customerResult.rows);

    console.log("Asiakas haettu")
    //console.log(JSON.stringify(customerResult))
    // Get orders data
    const ordersQuery = 'SELECT * FROM tilaus WHERE asiakasid = $1';
    const ordersValues = [customerId];
    const ordersResult = await pool.query(ordersQuery, ordersValues);
    console.log("Tilaukset haettu")
    //console.log(JSON.stringify(orderResult))
    // tilauksen tuotteet
    const orderItemsQuery = 'SELECT * FROM "tilausTuotteet" WHERE tilausid IN (SELECT "tilausID" FROM tilaus WHERE asiakasid = $1)';
    const orderItemsValues = [customerId];
    const orderItemsResult = await pool.query(orderItemsQuery, orderItemsValues);
    console.log("Tilaustuotteet haettu")
    //console.log(JSON.stringify(orderItemsResult))
    
    const data = {
      customer: customerResult.rows[0],
      orders: ordersResult.rows,
      orderItems: orderItemsResult.rows
    };
    console.log("Yhteenveto asiakastilin tiedoista:")
    console.log(JSON.stringify(data))
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// EDIT TEST FOR ASIAKAS - using edit logic

app.put('/editasiakas', async (req, res) => {

  console.log(req.body); // Log the request body
  const { data, userID } = req.body;
  const customerId = userID;

  try {
    const customerQuery = 'UPDATE asiakas SET nimi = $1, email = $2, osoite = $3, puhelinnro = $4 WHERE "asiakasID" = $5';
    const customerValues = [data.nimi, data.email, data.osoite, data.puhelinnro, customerId];
    await pool.query(customerQuery, customerValues);
    console.log("Asiakas muokattu")
    res.status(200).send('Asiakas muokattu');
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: 'Server error' });
  }
});

////////////////////////////////////////////

//// tilauksen muokkausta
app.put('/edit', async (req, res) => {
  try {
    const editOrder = req.body;
    const customerId = editOrder.customer.asiakasID;
    const tilausId = editOrder.orders.tilausID;
    /*
    console.log("Muokataan asiakasid:")
    console.log(JSON.stringify(customerId))
    console.log("Muokataan tilausid:")
    console.log(JSON.stringify(tilausId))
    console.log("editorder datat:")
    console.log(JSON.stringify(editOrder))
    console.log(JSON.stringify(editOrder.customer.nimi))
    console.log(JSON.stringify(editOrder.customer.asiakasID))
    */
    // Update asiakas
    const customerQuery = 'UPDATE asiakas SET nimi = $1, email = $2, osoite = $3, puhelinnro = $4 WHERE "asiakasID" = $5';
    const customerValues = [editOrder.customer.nimi, editOrder.customer.email, editOrder.customer.osoite, editOrder.customer.puhelinnro, editOrder.customer.asiakasID];
    await pool.query(customerQuery, customerValues);

    // Update tilaus
    console.log("update tilaus")
    const orderQuery = 'UPDATE "tilaus" SET tilauspvm = $1, summa = $2 WHERE "tilausID" = $3 AND "asiakasid" = $4' ;
    const orderValues = [editOrder.orders.tilauspvm, editOrder.orders.summa, editOrder.orders.tilausID, editOrder.customer.asiakasID];
    await pool.query(orderQuery, orderValues);
/*
    // Update tilaustuotteet
    for (const item of editOrder.orderitems) {
      const orderItemsQuery = 'UPDATE "tilausTuotteet" SET kpl = $1, summa = $2 WHERE "tilaustuotteetid" = $3';
      const orderItemsValues = [item.quantity, item.sum, item.orderitemsid];
      await pool.query(orderItemsQuery, orderItemsValues);
    }
*/
    // update tilaustuotteet
    console.log(editOrder.orderitem);
    for (let i = 0; i < editOrder.orderitem.length; i++) {
      const orderitem = editOrder.orderitem[i];
      const orderitemQuery = 'UPDATE "tilausTuotteet" SET kpl = $1 WHERE "tilausid" = $2 AND "tilaustuotteetid" = $3';
      const orderitemValues = [orderitem.kpl, orderitem.tilausid, orderitem.tilaustuotteetid];
      if (orderitem.kpl === 0) {
        const deleteQuery = 'DELETE FROM "tilausTuotteet" WHERE "tilaustuotteetid" = $1';
        await pool.query(deleteQuery, [orderitem.tilaustuotteetid]);
      } else {
        await pool.query(orderitemQuery, orderitemValues);
      }
    }
    console.log("Päivitetyt setit:")
    // päivitetty asiakas
    const customerResult = await pool.query('SELECT * FROM asiakas WHERE "asiakasID" = $1', [customerId]);
    const customer = customerResult.rows[0];
    //console.log(JSON.stringify(customer))
    // päivitetty tilaus
    const orderResult = await pool.query('SELECT * FROM "tilaus" WHERE "tilausID" = $1', [tilausId]);
    const order = orderResult.rows[0];
    //console.log(JSON.stringify(order))
    // päivitetty tilaustuotteet
    const orderItemsResult = await pool.query('SELECT * FROM "tilausTuotteet" WHERE "tilausid" = $1', [tilausId]);
    const orderItems = orderItemsResult.rows;
    console.log(JSON.stringify(orderItems))

    
    const updatedData = {
      customer: customer,
      orders: order,
      orderitem: orderItems
    };
    console.log("Päivitetyt tilauksen tiedot:")
    console.log(JSON.stringify(updatedData))
    res.status(200).json(updatedData);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});










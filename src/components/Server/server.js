const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "ohj2ryhmaf@gmail.com",
    pass: "wfvfhssfpbqzrwnb",
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message; 
  const mail = {
    from: name,
    to: "ohj2ryhmaf@gmail.com",
    subject: "Yhteydenottolomake - verkkokauppa",
    html: `<p>Nimi: ${name}</p>
           <p>Sähköposti: ${email}</p>
           <p>Viesti: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "Viestin lähetys epäonnistui" });
    } else {
      res.json({ status: "Viesti lähetetty" });
    }
  });
});
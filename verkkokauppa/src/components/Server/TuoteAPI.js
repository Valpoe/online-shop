
// Tuo kaikki tuotteet
export const  getTuotteet = async () => {
  const response = await fetch('http://localhost:5000/tuotteet');
  const data = await response.json();
  console.log("Haetaan Tuotteet")
  return data;
};

// Tuo tuoteid perusteella
export const getTuote = async (tuoteID) => {
  const response = await fetch(`http://localhost:5000/tuote/${tuoteID}`);
  const data = await response.json();
  return data;
};

// Tuo kaikki saman kategorian tuotteet
export const getKategoriaTuotteet = async (kategoriaID) => {
  const response = await fetch(`http://localhost:5000/kategoria/${kategoriaID}`);
  const data = await response.json();
  return data;
};

// Tuo kaikki asiakastilit
export const getAsiakkaat = async () => {
  const response = await fetch('http://localhost:5000/asiakkaat');
  const data = await response.json();
  return data;
};

// Tuo asiakastilien sähköpostit
export const getAsiakkaatEmail = async (email) => {
  const response = await fetch('http://localhost:5000/asiakkaat');
  const data = await response.json();

  const emails = data.map((asiakas) => asiakas.email);
  //if emails contains email, return true
  //else return false
  console.log(emails.includes(email) + " was found in DB: " + email);

  return emails.includes(email);
}



  

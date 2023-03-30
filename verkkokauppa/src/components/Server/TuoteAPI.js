
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
}



  

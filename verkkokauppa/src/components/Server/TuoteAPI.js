
// Tuo kaikki tuotteet
export const  getTuotteet = async () => {
  const response = await fetch('http://localhost:5000/tuotteet');
  const data = await response.json();
  console.log("Haetaan Tuotteet")
  return data;
};

// Tuo tuoteid perusteella
export const getProductById = async (productId) => {
  const response = await fetch(`http://localhost:5000/tuotteet/${productId}`);
  const data = await response.json();
  return data;
}


  

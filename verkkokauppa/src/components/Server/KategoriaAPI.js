// Tuo kaikki kategoriat
export const  getKategoriat = async () => {
  const response = await fetch('http://localhost:5000/kategoriat');
  const data = await response.json();
  console.log("Haetaan kategoriat")
  return data;
};
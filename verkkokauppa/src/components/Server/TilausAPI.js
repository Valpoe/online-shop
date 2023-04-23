export const newTilaus = async (customerData, orderData) => {
  console.log("Tilaus apissa")
    const asiakas = luoAsiakas(customerData); 
    const grandTotal = loppuSumma(orderData);
    
    try {
      const response = await fetch('http://localhost:5000/tilaus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ asiakas, orderData, grandTotal }),
        
      });
      const data = await response.json();
      if (data.success) {
        return { success: true, message: 'Tilaus onnistui' };
      } 
    } catch (err) {
      return { success: false, message: 'Tilaus epäonnistui' };
    }
  };


export const asiakasTilaus = async (asiakasTiedot, userID, orderData) => {
  console.log("Tilaus apissa asiakkaan tilauksella")

  const asiakas = luoAsiakas(asiakasTiedot);

  let grandTotal;
  
  if(orderData){
    const grandTotal = loppuSumma(orderData)
  }

  console.log(JSON.stringify({ asiakas }))
  
  try {
    const response = await fetch('http://localhost:5000/tilaus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ asiakas, userID, orderData, grandTotal }),

    });
    const data = await response.json();
    if (data.success) {
      return { success: true, message: 'Tilaus onnistui' };
    }
    } catch (err) {
      return { success: false, message: 'Tilaus epäonnistui' };
    }
};


  export const luoAsiakas = (customerData) => {

    const { firstName, lastName, email, phone, address, zip, city, password, ATluonti } = customerData;
    const kokonimi = firstName + ' ' + lastName;
    const osoite = address + ', ' + zip + ', ' + city;
    const data = { nimi: kokonimi, email: email, osoite: osoite, puhelinnro: phone, password: password, ATluonti: ATluonti};
    console.log(JSON.stringify(data)) 
    return data;
  };

  export const loppuSumma = (orderData) => {

    let loppuSumma = 0;
    
    if(!orderData) return (loppuSumma);

    orderData.forEach((item) => {
        const itemSum = item.hinta * item.määrä;
        loppuSumma += itemSum;
      });
    return loppuSumma;
  };
  
 



  export default { newTilaus };
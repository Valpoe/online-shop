export const newTilaus = async (customerData, orderData) => {
    const asiakas = luoAsiakas(customerData); 
    const grandTotal = loppuSumma(orderData)
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

  export const luoAsiakas = (customerData) => {
    const { firstName, lastName, email, phone, address, zip, city } = customerData;
    const kokonimi = firstName + ' ' + lastName;
    const osoite = address + ', ' + zip + ', ' + city;
    const data = { nimi: kokonimi, email: email, osoite: osoite, puhelinnro: phone };
    return data;
  };

  export const loppuSumma = (orderData) => {
    let loppuSumma = 0;
    orderData.forEach((item) => {
        const itemSum = item.hinta * item.määrä;
        loppuSumma += itemSum;
      });
    return loppuSumma;
  };
  
 
  export default { newTilaus };
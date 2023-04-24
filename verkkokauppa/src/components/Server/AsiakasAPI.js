
///// Yksittäisen asiakkaan lisäys
const luoAsiakas = (formData) => {
    console.log("Luodaan asiakasta")
    const { firstName, lastName, email, phone, address } = formData;
    const kokonimi = firstName + ' ' + lastName;

    if(firstName === ""){
      const data = { nimi: " ", email: email, osoite: " ", puhelinnro: " " };
      return data;
    }
    
    else{
      const data = { nimi: kokonimi, email: email, osoite: address, puhelinnro: phone };
      return data;
    }
  };
  
  const addAsiakas = async (formData) => {
    const data = luoAsiakas(formData); 
    console.log("Lisätään asiakasta tietokantaan")
    console.log(JSON.stringify(data));
    try {
      const response = await fetch('http://localhost:5000/addasiakas', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to add customer data');
      }
    } catch (error) {
      console.error('Failed to fetch:', error);
      throw error;
    }
  };

  //voi poistaa jos ei tarvita

  const editAsiakas = async (formData, userID) => {

    const data = luoAsiakas(formData);
    data.osoite = formData.address + ', ' + formData.zip + ', ' + formData.city;
    console.log("Muokataan asiakasta tietokantaan HHHHHHHH")
    console.log(JSON.stringify(data));
    console.log(JSON.stringify(userID));
    try {
      const response = await fetch('http://localhost:5000/editasiakas', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data, userID}),
      });
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to edit customer data');
      }
    } catch (error) {
      console.error('Failed to fetch:', error);
      throw error;
    }
  };

  //

  export { addAsiakas, editAsiakas, luoAsiakas };
  //export default addAsiakas;

  
  
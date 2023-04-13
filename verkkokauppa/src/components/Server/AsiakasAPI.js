
///// Yksittäisen asiakkaan lisäys
const luoAsiakas = (formData) => {
    console.log("Luodaan asiakasta")
    const { firstName, lastName, email, phone, address } = formData;
    const kokonimi = firstName + ' ' + lastName;
    const data = { nimi: kokonimi, email: email, osoite: address, puhelinnro: phone };
    return data;
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
  export default addAsiakas;
  
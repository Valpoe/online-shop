import { newTilaus, luoAsiakas, loppuSumma } from './TilausAPI'; 

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true, message: 'Tilaus onnistui' }),
  })
);

describe('luoAsiakas', () => {

  test('should create customer object with correct properties', () => {

    const customerData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '1234 Elm Street',
      zip: '12345',
      city: 'New York',
    };

    const result = luoAsiakas(customerData);

    const expected = {
      nimi: 'John Doe',
      email: 'john.doe@example.com',
      osoite: '1234 Elm Street, 12345, New York',
      puhelinnro: '1234567890',
    };

    expect(result).toEqual(expected);
  });
});

describe('loppuSumma', () => {
  test('should calculate the correct grand total for order', () => {
    const orderData = [
      { hinta: 10, määrä: 2 }, // item 1 with price 10 and quantity 2
      { hinta: 5, määrä: 3 }, // item 2 with price 5 and quantity 3
    ];

    const result = loppuSumma(orderData);
    const expected = 35; // 10 * 2 + 5 * 3 = 20 + 15 = 35
    expect(result).toEqual(expected);
  });
});


describe('newTilaus', () => {
  test('should return success message for successful order', async () => {
    const customerData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '1234 Elm Street',
      zip: '12345',
      city: 'New York',
    };

    const orderData = [
      { hinta: 10, määrä: 2 }, 
      { hinta: 5, määrä: 3 }, 
    ];

    const result = await newTilaus(customerData, orderData);

    //const expected = { success: true, message: 'Tilaus onnistui' };
    const expected = { success: false, message: 'Tilaus epäonnistui' };
   
    expect(result).toEqual(expected);
  });
});


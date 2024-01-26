const { addAsiakas, editAsiakas, luoAsiakas } = require('./AsiakasAPI');

describe('luoAsiakas', () => {
  test('creates customer data correctly when first name is not empty', () => {
    const formData = { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '555-1234', address: '123 Main St' };
    const expectedData = { nimi: 'John Doe', email: 'john.doe@example.com', osoite: '123 Main St', puhelinnro: '555-1234' };
    expect(luoAsiakas(formData)).toEqual(expectedData);
  });

  test('creates customer data correctly when first name is empty', () => {
    const formData = { firstName: '', lastName: 'Doe', email: 'john.doe@example.com', phone: '555-1234', address: '123 Main St' };
    const expectedData = { nimi: ' ', email: 'john.doe@example.com', osoite: ' ', puhelinnro: ' ' };
    expect(luoAsiakas(formData)).toEqual(expectedData);
  });
});
/*
describe('addAsiakas', () => {
  // mock fetch so we can test without actually making a request
  global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) }));

  test('adds customer data correctly', async () => {
    const formData = { nimi: 'Erkki Esimerkki', email: 'erkki.esimerkki@example.com', puhelinnro: '5551234', osoite: '123 Riistavesi' };
    const expectedData = { nimi: 'Erkki Esimerkki', email: 'erkki.esimerkki@example.com', puhelinnro: '5551234', osoite: '123 Riistavesi' };
    console.log(JSON.stringify(formData))
    const result = await addAsiakas(formData);
    expect(fetch).toHaveBeenCalledWith('http://localhost:5000/addasiakas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expectedData),
    });
    expect(result).toEqual({});
  });
  
});
*/
describe('addAsiakas', () => {
    const formData = { nimi: 'Erkki Esimerkki', email: 'erkki.esimerkki@example.com', puhelinnro: '5551234', osoite: '123 Riistavesi' };
  
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve({ message: 'Customer data added successfully' }),
    };
  
    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve(mockResponse));
    });
  
    afterEach(() => {
      global.fetch.mockClear();
      delete global.fetch;
    });
  
    it('adds customer data correctly', async () => {
      const result = await addAsiakas(formData);
      expect(result).toEqual({ message: 'Customer data added successfully' });
    });
  });

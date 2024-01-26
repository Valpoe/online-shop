import {
    getTuotteet,
    getTuote,
    getKategoriaTuotteet
  } from './TuoteAPI'; 
  describe('Tuote API tests', () => {
    // Mock the fetch function
    global.fetch = jest.fn();
  
    it('fetch all products', async () => {
      const mockData = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
      const mockResponse = { json: () => Promise.resolve(mockData) };
      fetch.mockReturnValueOnce(Promise.resolve(mockResponse));
  
      const result = await getTuotteet();
  
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/tuotteet');
      expect(result).toEqual(mockData);
    });
  
    it('fetch product by ID', async () => {
      const tuoteID = 1;
      const mockData = { id: tuoteID, name: 'Product 1' };
      const mockResponse = { json: () => Promise.resolve(mockData) };
      fetch.mockReturnValueOnce(Promise.resolve(mockResponse));
      const result = await getTuote(tuoteID);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(`http://localhost:5000/tuote/${tuoteID}`);
      expect(result).toEqual(mockData);
    });
  
    it('fetch products by kategoriaID', async () => {
      const kategoriaID = 1;
      const mockData = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
      const mockResponse = { json: () => Promise.resolve(mockData) };
      fetch.mockReturnValueOnce(Promise.resolve(mockResponse));
  
      const result = await getKategoriaTuotteet(kategoriaID);
  
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(`http://localhost:5000/kategoria/${kategoriaID}`);
      expect(result).toEqual(mockData);
    });
  });
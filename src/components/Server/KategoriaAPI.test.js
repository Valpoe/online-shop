import { getKategoriat } from './KategoriaAPI'; 

describe('Kategoria APIT', () => {
  global.fetch = jest.fn();
  it('Tuo kategoriat', async () => {
    const mockData = [{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }];
    const mockResponse = { json: () => Promise.resolve(mockData) };
    fetch.mockReturnValueOnce(Promise.resolve(mockResponse));

    const result = await getKategoriat();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:5000/kategoriat');
    expect(result).toEqual(mockData);
  });
});

const { editOrder, loppusumma } = require('./editTilausAPI');

const testData = {
  customer: {
    asiakasID: 75, 
    nimi: 'Testo Make',
    email: 'testo.make@gmail.com',
    osoite: 'Testosikakatu 2',
    puhelinnro: '1001234567'
  },
  orders: {
    tilausID: 65, 
    asiakasID: 75, 
    tilauspvm: '2023-04-24',
    maksuid: 55, 
    summa: 56
  },
  orderitem: [
    {
      tuoteid: 5, 
      tilausid: 65,
      kpl: 1,
      tilaustuotteetid: 107,
      summa: 6
    },
    {
      tuoteid: 4,
      tilausid: 65,
      kpl: 10,
      tilaustuotteetid: 108,
      summa: 5
    },
    { 
      tuoteid: 2,
      tilausid: 65,
      kpl: 0,
      tilaustuotteetid: 109,
      summa: 3
    }
  ]
};

describe('editOrder function', () => {
  it('should update orderitem sums and orders sum correctly', async () => {
    const expectedData = {
      customer: {
        asiakasID: 75, 
        nimi: 'Testo Make',
        email: 'testo.make@gmail.com',
        osoite: 'Testosikakatu 2',
        puhelinnro: '1001234567'
      },
      orders: {
        tilausID: 65, 
        asiakasid: 75, 
        tilauspvm: '2023-04-23T21:00:00.000Z',
        maksuid: 55, 
        summa: 506.0 
      },
      orderitem: [
        {
            tuoteid: 4,
            tilausid: 65,
            kpl: 10,
            tilaustuotteetid: 108,
            summa: 5
          },
        {
          tuoteid: 5, 
          tilausid: 65,
          kpl: 1,
          tilaustuotteetid: 107,
          summa: 6
        }

      ]
    };
    const result = await editOrder(testData);
    expect(result).toEqual(expectedData);
  });
});

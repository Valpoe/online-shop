import { render, screen } from '@testing-library/react';
import Yhteenveto from './Yhteenveto';

describe('Yhteenveto component', () => {
  const items = [
    {
      tuoteid: '1',
      tuotenimi: 'Testi tuote 1',
      kuva: 'testikuva1.png',
      hinta: 10.99,
    },
    {
      tuoteid: '2',
      tuotenimi: 'Testi tuote 2',
      kuva: 'testikuva2.png',
      hinta: 20.99,
    },
    {
      tuoteid: '1',
      tuotenimi: 'Testi tuote 1',
      kuva: 'testikuva1.png',
      hinta: 10.99,
    },
  ];
  const setItems = jest.fn();

  beforeEach(() => {
    render(<Yhteenveto items={items} setItems={setItems} />);
  });

  it('should render each item in the list', () => {
    const item1 = screen.getByText('Testi tuote 1');
    const item2 = screen.getByText('Testi tuote 2');
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });

  it('should display the correct total price', () => {
    const total = screen.getByText('Yhteensä: 42.97 €');
    expect(total).toBeInTheDocument();
  });

  it('should call setItems with the updated list when an item is removed', () => {
    const removeBtn = screen.getAllByText('Poista')[0];
    removeBtn.click();
    expect(setItems).toHaveBeenCalledTimes(1);
    expect(setItems).toHaveBeenCalledWith([
      {
        tuoteid: '2',
        tuotenimi: 'Testi tuote 2',
        kuva: 'testikuva2.png',
        hinta: 20.99,
      },
      {
        tuoteid: '1',
        tuotenimi: 'Testi tuote 1',
        kuva: 'testikuva1.png',
        hinta: 10.99,
      },
    ]);
  });
});

/*These tests check that the Yhteenveto component renders each item in the list,
displays the correct total price,
and updates the list correctly when an item is removed.
You can run them with the Jest test runner.*/ 
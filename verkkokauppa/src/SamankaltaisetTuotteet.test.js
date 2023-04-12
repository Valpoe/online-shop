import { render, screen, fireEvent } from '@testing-library/react';
import SamankaltaisetTuotteet from './components/SamankaltaisetTuotteet';

const mockItems = [];
const mockSetItems = jest.fn();

const mockTuotteet = [
  {
    tuoteID: 1,
    tuotenimi: 'Tuote 1',
    hinta: 10,
    varastosaldo: 5,
    kuva: 'https://example.com/tuote1.png',
  },
  {
    tuoteID: 2,
    tuotenimi: 'Tuote 2',
    hinta: 20,
    varastosaldo: 3,
    kuva: 'https://example.com/tuote2.png',
  },
];

test('renders the component with the correct data', () => {
  render(<SamankaltaisetTuotteet tuotekategoria={mockTuotteet} items={mockItems} setItems={mockSetItems} />);

  // check that each tuote in the list is rendered
  for (const tuote of mockTuotteet) {
    const tuotenimi = screen.getByText(tuote.tuotenimi);
    expect(tuotenimi).toBeInTheDocument();
    const hinta = screen.getByText(`Hinta: ${tuote.hinta} €`);
    expect(hinta).toBeInTheDocument();
    const saldo = screen.getByText(`Saldo: ${tuote.varastosaldo}`);
    expect(saldo).toBeInTheDocument();
  }
});

test('clicking the "Lisää ostoskoriin" button calls setItems with the correct tuote data', () => {
  render(<SamankaltaisetTuotteet tuotekategoria={mockTuotteet} items={mockItems} setItems={mockSetItems} />);

  const addToCartButton = screen.getByText('Lisää ostoskoriin');
  fireEvent.click(addToCartButton);

  expect(mockSetItems).toHaveBeenCalledTimes(1);
  expect(mockSetItems).toHaveBeenCalledWith([
    {
      tuotenimi: mockTuotteet[0].tuotenimi,
      hinta: mockTuotteet[0].hinta,
      kuva: mockTuotteet[0].kuva,
      tuoteid: mockTuotteet[0].tuoteID,
    }
  ]);
});


/*
Note that in this example, we are passing mock data for the tuotekategoria,
items, and setItems props. In a real application, 
you would want to use actual data and mock any dependencies
that the component has (e.g. any API calls or state updates that it relies on).
*/
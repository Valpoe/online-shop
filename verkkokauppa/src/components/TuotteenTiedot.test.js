import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TuoteenTiedot from './TuoteenTiedot';

const tuote = {
  nimi: 'Kynä',
  tuotenimi: 'Hyvä kynä',
  kuva: 'https://example.com/kyna.jpg',
  kuvaus: 'Tämä kynä on erittäin hyvä kynä.',
  vari: 'blue',
  hinta: 2.5,
};

const items = [
  { tuote: tuote, maara: 2 },
  { tuote: tuote, maara: 1 },
];

const setItems = jest.fn();

describe('TuoteenTiedot', () => {
  test('renders product information', () => {
    render(<TuoteenTiedot tuote={tuote} items={items} setItems={setItems} />);

    const productName = screen.getByRole('heading', { name: /hyvä kynä/i });
    expect(productName).toBeInTheDocument();

    const productImage = screen.getByAltText('...');
    expect(productImage).toHaveAttribute('src', 'https://example.com/kyna.jpg');

    const productDescription = screen.getByText('Tämä kynä on erittäin hyvä kynä.');
    expect(productDescription).toBeInTheDocument();

    const productColor = screen.getByRole('button', { name: '' });
    expect(productColor).toHaveStyle({ backgroundColor: 'blue' });

    const productPrice = screen.getByText('Hinta: 2.5 €');
    expect(productPrice).toBeInTheDocument();

    const quantityInput = screen.getByLabelText('Määrä:');
    expect(quantityInput).toHaveValue(2);
  });

  test('updates item quantity', () => {
    render(<TuoteenTiedot tuote={tuote} items={items} setItems={setItems} />);

    const quantityInput = screen.getByLabelText('Määrä:');
    userEvent.clear(quantityInput);
    userEvent.type(quantityInput, '3');

    expect(setItems).toHaveBeenCalledWith([
      { tuote: tuote, maara: 3 },
      { tuote: tuote, maara: 1 },
    ]);
  });
});

/* 

These tests check that:

-The product name, image, description, color, and price are rendered correctly.
-The quantity input updates the items state correctly when the user types in a new value.

Note that the tests assume that MaaraLaskin is a separate component
that is responsible for rendering the quantity input and handling its events. 
If that's not the case, you may need to adjust the tests accordingly.

*/

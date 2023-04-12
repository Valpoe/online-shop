import { render, screen, fireEvent } from '@testing-library/react';
import MaaraLaskin from './components/MaaraLaskin';

describe('MaaraLaskin component', () => {
  const tuote = {
    tuoteID: 1,
    tuotenimi: 'Testituote',
    hinta: 10,
    kuva: 'testikuva.jpg',
    varastosaldo: 5
  };
  const setItems = jest.fn();
  const items = [];

  beforeEach(() => {
    render(<MaaraLaskin tuote={tuote} items={items} setItems={setItems} />);
  });

  it('renders the quantity input', () => {
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });

  it('renders the add to cart button', () => {
    expect(screen.getByRole('button')).toHaveTextContent('Lisää ostoskoriin');
  });

  it('decreases the quantity when minus button is clicked', () => {
    const minusButton = screen.getByLabelText('Decrease quantity');
    fireEvent.click(minusButton);
    expect(screen.getByRole('spinbutton')).toHaveValue('1');
  });

  it('increases the quantity when plus button is clicked', () => {
    const plusButton = screen.getByLabelText('Increase quantity');
    fireEvent.click(plusButton);
    expect(screen.getByRole('spinbutton')).toHaveValue('2');
  });

  it('does not decrease the quantity below 1', () => {
    const minusButton = screen.getByLabelText('Decrease quantity');
    fireEvent.click(minusButton);
    fireEvent.click(minusButton);
    expect(screen.getByRole('spinbutton')).toHaveValue('1');
  });

  it('does not increase the quantity above the available stock', () => {
    const plusButton = screen.getByLabelText('Increase quantity');
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);
    expect(screen.getByRole('spinbutton')).toHaveValue('5');
  });

  it('adds the correct amount of items to the cart when Add to Cart button is clicked', () => {
    const plusButton = screen.getByLabelText('Increase quantity');
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);
    const addToCartButton = screen.getByRole('button', { name: 'Lisää ostoskoriin' });
    fireEvent.click(addToCartButton);
    expect(setItems).toHaveBeenCalledTimes(2);
    expect(setItems).toHaveBeenCalledWith([
      { tuotenimi: 'Testituote', hinta: 10, kuva: 'testikuva.jpg', tuoteid: 1 },
      { tuotenimi: 'Testituote', hinta: 10, kuva: 'testikuva.jpg', tuoteid: 1 }
    ]);
  });
});

/*
These tests check if the component renders the quantity input and the add to cart button,
and if clicking the minus and plus buttons correctly decreases and increases the quantity value, respectively.
They also verify that the quantity value is not allowed to go below 1 or above the available stock,
and that clicking the add to cart button adds the correct amount of items to the cart.
*/

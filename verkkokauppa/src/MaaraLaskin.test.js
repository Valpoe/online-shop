import { render, screen } from '@testing-library/react';
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

  it ('renders the add to cart button', () => {
    expect(screen.getByText('Lisää ostoskoriin')).toBeInTheDocument();
  });

  it('renders plus and minus buttons', () => {
    expect(screen.getByTestId('plus')).toBeInTheDocument();
    expect(screen.getByTestId('minus')).toBeInTheDocument();
  });
});
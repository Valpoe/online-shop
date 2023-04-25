import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TuotteenTiedot from './components/TuotteenTiedot';
import { MemoryRouter } from 'react-router-dom';

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
    render(
      <MemoryRouter>
    <TuotteenTiedot tuote={tuote} items={items} setItems={setItems} />
      </MemoryRouter>);
    expect(screen.getByText('Väri:')).toBeInTheDocument();
    expect(screen.getByText('Hyvä kynä')).toBeInTheDocument();
    expect(screen.getByText('Tuotteen kuvaus:')).toBeInTheDocument();
    expect(screen.getByText('Tämä kynä on erittäin hyvä kynä.')).toBeInTheDocument();
    expect(screen.getByText('Hinta:')).toBeInTheDocument();
  });

  test('renders quantity input', () => {
    render(
      <MemoryRouter>
    <TuotteenTiedot tuote={tuote} items={items} setItems={setItems} />
      </MemoryRouter>);
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });

  test('renders add to cart button', () => {
    render(
      <MemoryRouter>
    <TuotteenTiedot tuote={tuote} items={items} setItems={setItems} />
      </MemoryRouter>);
    expect(screen.getByText('Lisää ostoskoriin')).toBeInTheDocument();
  });

  test('renders plus and minus buttons', () => {
    render(
      <MemoryRouter>
    <TuotteenTiedot tuote={tuote} items={items} setItems={setItems} />
      </MemoryRouter>);
    expect(screen.getByTestId('plus')).toBeInTheDocument();
    expect(screen.getByTestId('minus')).toBeInTheDocument();
  });

  test('clicking plus button increases quantity', () => {
    render(
      <MemoryRouter>
    <TuotteenTiedot tuote={tuote} items={items} setItems={setItems} />
      </MemoryRouter>);
    userEvent.click(screen.getByTestId('plus'));
    expect(screen.getByRole('spinbutton')).toHaveValue(1);
  });

  test('clicking minus button decreases quantity', () => {
    render(
      <MemoryRouter>
    <TuotteenTiedot tuote={tuote} items={items} setItems={setItems} />
      </MemoryRouter>);
    userEvent.click(screen.getByTestId('minus'));
    userEvent.type(screen.getByRole('spinbutton'), '2');
    expect(screen.getByRole('spinbutton')).toHaveValue(1);
  });
});

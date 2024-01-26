import React from 'react';
import { render, screen } from '@testing-library/react';
import TuoteKortit from './components/TuoteKortit';
import { MemoryRouter } from 'react-router-dom';

const mockProps = {
  verticalActive: 'kaikki-tuotteet',
  items: [],
  tuotteet: [
    {
      id: 1,
      tuotenimi: 'Testituote 1',
      hinta: 10,
      kuva: 'testikuva1.jpg',
      tuoteID: '123',
      varastosaldo: 5,
      kategoriaid: 'kategoria1',
    },
    {
      id: 2,
      tuotenimi: 'Testituote 2',
      hinta: 15,
      kuva: 'testikuva2.jpg',
      tuoteID: '456',
      varastosaldo: 10,
      kategoriaid: 'kategoria2',
    },
  ],
  kategoriat: [
    {
      id: 1,
      kategoriaID: 'kaikki-tuotteet',
      kategoriaNimi: 'Kaikki tuotteet',
    },
    {
      id: 2,
      kategoriaID: 'kategoria1',
      kategoriaNimi: 'Kategoria 1',
    },
    {
      id: 3,
      kategoriaID: 'kategoria2',
      kategoriaNimi: 'Kategoria 2',
    },
  ],
  searchResults: [],
};

describe('TuoteKortit component', () => {
  test('renders the component without crashing', () => {
    render (
      <MemoryRouter>
        <TuoteKortit {...mockProps} />
      </MemoryRouter>
    );
  });

  test('renders the correct number of products', () => {
    render (
      <MemoryRouter>
        <TuoteKortit {...mockProps} />
      </MemoryRouter>
    );
    const products = screen.getAllByTestId('product-cards');
    expect(products).toHaveLength(mockProps.tuotteet.length);
  });

  test('render the correct product name', () => {
    render (
      <MemoryRouter>
        <TuoteKortit {...mockProps} />
      </MemoryRouter>
    );
    const productName = screen.getAllByText('Testituote 1')[0];
    expect(productName).toBeInTheDocument();
  }
  );
});

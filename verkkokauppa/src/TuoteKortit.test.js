import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

  test('renders the correct number of product cards', () => {
    render (
      <MemoryRouter>
        <TuoteKortit {...mockProps} />
      </MemoryRouter>
    );
    const productCards = screen.getAllByRole('article');
    expect(productCards).toHaveLength(mockProps.tuotteet.length);
  });

  test('adds the correct product to the cart when "Lisää ostoskoriin" button is clicked', () => {
    const handleAddToCart = jest.fn();
    const testProduct = mockProps.tuotteet[0];
    render (
      <MemoryRouter>
        <TuoteKortit {...mockProps} handleAddToCart={handleAddToCart} />
      </MemoryRouter>
    );
    const addToCartButton = screen.getByRole('button', {
      name: /lisää ostoskoriin/i,
    });
    fireEvent.click(addToCartButton);
    expect(handleAddToCart).toHaveBeenCalledTimes(1);
  });
});

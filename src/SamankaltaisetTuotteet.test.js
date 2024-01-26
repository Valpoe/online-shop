import { render, screen } from '@testing-library/react';
import SamankaltaisetTuotteet from './components/SamankaltaisetTuotteet';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

test("renders correctly with props and displays Saldo", () => {
  const props = {
    tuotekategoria: "some_category",
    aktiivinenTuote: 123,
    tuote: [{ tuoteID: 123 }],
    setAktiivinenTuote: jest.fn(),
    setItems: jest.fn(),
    items: [],
    addToCart: jest.fn(),
  };

  render(
    <MemoryRouter>
  <SamankaltaisetTuotteet {...props} />
    </MemoryRouter>);
  // Assert that the component renders without error
  expect(screen.getByText("Saldo:")).toBeInTheDocument();
});

test("renders correctly with props and displays Hinta", () => {
  const props = {
    tuotekategoria: "some_category",
    aktiivinenTuote: 123,
    tuote: [{ tuoteID: 123 }],
    setAktiivinenTuote: jest.fn(),
    setItems: jest.fn(),
    items: [],
    addToCart: jest.fn(),
  };

  render(
    <MemoryRouter>
  <SamankaltaisetTuotteet {...props} />
    </MemoryRouter>);
  // Assert that the component renders without error
  expect(screen.getByText("Hinta:")).toBeInTheDocument();
});

test("renders correct amount of items", () => {
  const props = {
    tuotekategoria: "some_category",
    aktiivinenTuote: 123,
    tuote: [{ tuoteID: 123 }, { tuoteID: 123 }],
    setAktiivinenTuote: jest.fn(),
    setItems: jest.fn(),
    items: [],
    addToCart: jest.fn(),
  };

  render(
    <MemoryRouter>
  <SamankaltaisetTuotteet {...props}/>
    </MemoryRouter>);
  // Assert that the component renders without error
  expect(screen.getAllByText("Saldo:")).toHaveLength(1);
}
);


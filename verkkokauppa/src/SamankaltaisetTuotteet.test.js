import React from 'react';
import { render, screen} from "@testing-library/react";
import SamankaltaisetTuotteet from './Components/SamankaltaisetTuotteet';
import { MemoryRouter } from 'react-router-dom';

describe('SamankaltaisetTuotteet', () => {
  const mockTuotteet = [
    { tuoteID: 1, tuotenimi: 'Tuote 1', hinta: 10, kuva: 'kuva1.jpg', varastosaldo: 5 },
    { tuoteID: 2, tuotenimi: 'Tuote 2', hinta: 20, kuva: 'kuva2.jpg', varastosaldo: 10 },
  ];
  const mockItems = [];
  const mockSetItems = jest.fn();
  const mockAktiivinenTuote = 1;
  const mockSetAktiivinenTuote = jest.fn();

  it('renders the component with the correct data', () => {
    render(
      <MemoryRouter>
      <SamankaltaisetTuotteet
        tuotekategoria={mockTuotteet}
        items={mockItems}
        setItems={mockSetItems}
        aktiivinenTuote={mockAktiivinenTuote}
        setAktiivinenTuote={mockSetAktiivinenTuote}
      />
      </MemoryRouter>
    );

    // check that each tuote in the list is rendered
    for (const tuote of mockTuotteet) {0
      const tuotenimi = screen.queryByText(tuote.tuotenimi);
      expect(tuotenimi).toBeInTheDocument();
      const hinta = screen.getByText(`Hinta: ${tuote.hinta} €`);
      expect(hinta).toBeInTheDocument();
      const saldo = screen.getByText(`Saldo: ${tuote.varastosaldo}`);
      expect(saldo).toBeInTheDocument();
    }
  });
});
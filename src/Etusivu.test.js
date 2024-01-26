import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Etusivu from "./Pages/Etusivu";
import { MemoryRouter } from 'react-router-dom';

describe("Etusivu component", () => {
  it("should render without errors", () => {
    render(
    <MemoryRouter>
    <Etusivu />
    </MemoryRouter>
    );
    expect(screen.getByText('NAPSUKAUPPA')).toBeInTheDocument();
    expect(screen.getByText('Ostoksille')).toBeInTheDocument();

  });
  

  it('testaa löytyykö ostoksille nappi', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Etusivu />
        </MemoryRouter>);
        const linkElement = getByText(/Ostoksille/i);
        expect(linkElement).toBeInTheDocument();
  });
});
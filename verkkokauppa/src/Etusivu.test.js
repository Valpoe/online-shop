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

  it('navigates to the /tuotteet route when the "Ostoksille" button is clicked', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Etusivu />
      </MemoryRouter>
    );

    const button = getByText('Ostoksille');
    fireEvent.click(button);

    expect(window.location.pathname).toBe('/tuotteet');
});
});
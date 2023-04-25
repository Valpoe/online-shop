import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import AboutUs from "./Pages/AboutUs";

describe("Tuotteet component", () => {
    it("should render without errors", () => {
      render(
      <MemoryRouter>
      <AboutUs />
      </MemoryRouter>
      );

      expect(screen.getByText('Tietoa meistä')).toBeInTheDocument();
      expect(screen.getByText('Yrityksemme')).toBeInTheDocument();
     
    });

    

});
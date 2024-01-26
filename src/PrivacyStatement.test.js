import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import PrivacyStatement from "./Pages/PrivacyStatement";


describe("PrivacyStatement component", () => {
    it("should render without errors", () => {
      render(
        <MemoryRouter>
        <PrivacyStatement />
        </MemoryRouter>
        );
    });
  });
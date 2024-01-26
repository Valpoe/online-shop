import React from "react";
import { render } from "@testing-library/react";
import Tuotteet from "./Pages/Tuotteet";

describe("Tuotteet component", () => {
  it("should render without errors", () => {
    render(<Tuotteet />);
  });
});
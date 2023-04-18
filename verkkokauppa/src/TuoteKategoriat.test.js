import { render, screen, fireEvent } from "@testing-library/react";
import TuoteKategoriat from "./components/TuoteKategoriat";

const tuotteet = [
  { id: 1, nimi: "Tuote 1", hinta: 100, vari: "red" },
  { id: 2, nimi: "Tuote 2", hinta: 200, vari: "blue" },
  { id: 3, nimi: "Tuote 3", hinta: 300, vari: "green" },
];

const kategoriat = [
  { id: 1, kategoriaID: "kategoria-1", kuvaus: "Kategoria 1" },
  { id: 2, kategoriaID: "kategoria-2", kuvaus: "Kategoria 2" },
];

test("renders component with categories and filters", async () => {
  render(
    <TuoteKategoriat
      kategoriat={kategoriat}
      tuotteet={tuotteet}
      setSearchResults={() => {}}
      setVerticalActive={() => {}}
      verticalActive="kaikki-tuotteet"
    />
  );

  // Tarkistaa, että kaikki kategoriat näkyvät
  expect(screen.getByText("Kaikki tuotteet")).toBeInTheDocument();
  expect(screen.getByText("Kategoria 1")).toBeInTheDocument();
  expect(screen.getByText("Kategoria 2")).toBeInTheDocument();

  // Tarkistaa, että halvin ja kallein suodatukset näkyvät
  expect(screen.getByText("Halvin ensin")).toBeInTheDocument();
  expect(screen.getByText("Kallein ensin")).toBeInTheDocument();

  // Tarkistaa, että hintasuodattimet näkyvät
  expect(screen.getByText("Min")).toBeInTheDocument();
  expect(screen.getByText("Max")).toBeInTheDocument();

  // Tarkistaa, että värisuodattimet näkyvät
  expect(screen.getAllByTestId("colorButton")).toHaveLength(3);
});

// Tarkistaa, että kategorian valinta toimii
test("handles category tab clicks", () => {
  const setVerticalActive = jest.fn();
  render(
    <TuoteKategoriat
      kategoriat={kategoriat}
      tuotteet={tuotteet}
      setSearchResults={() => {}}
      setVerticalActive={setVerticalActive}
      verticalActive="kaikki-tuotteet"
    />
  );

  fireEvent.click(screen.getByText("Kategoria 1"));
  expect(setVerticalActive).toHaveBeenCalledWith("kategoria-1");

  fireEvent.click(screen.getByText("Kategoria 2"));
  expect(setVerticalActive).toHaveBeenCalledWith("kategoria-2");
});
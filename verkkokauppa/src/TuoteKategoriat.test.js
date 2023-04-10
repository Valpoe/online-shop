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

  // Check if all category tabs are present
  expect(screen.getByText("Kaikki tuotteet")).toBeInTheDocument();
  expect(screen.getByText("Kategoria 1")).toBeInTheDocument();
  expect(screen.getByText("Kategoria 2")).toBeInTheDocument();

  // Check if sort buttons are present
  expect(screen.getByText("Halvin ensin")).toBeInTheDocument();
  expect(screen.getByText("Kallein ensin")).toBeInTheDocument();

  // Check if price ranges are present
  expect(screen.getByText("Min")).toBeInTheDocument();
  expect(screen.getByText("Max")).toBeInTheDocument();

  // Check if color buttons are present
  expect(screen.getAllByTestId("colorButton")).toHaveLength(3);
});

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
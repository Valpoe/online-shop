import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Ostoskori from "./Ostoskori";

describe("Ostoskori", () => {
  let props;

  beforeEach(() => {
    props = {
      items: [
        {
          tuotenimi: "Item 1",
          hinta: 10,
          kuva: "https://example.com/item1.jpg",
          tuoteid: 1,
        },
        {
          tuotenimi: "Item 2",
          hinta: 20,
          kuva: "https://example.com/item2.jpg",
          tuoteid: 2,
        },
      ],
      setItems: jest.fn(),
    };
  });

  it("renders a list of items", () => {
    const { getAllByRole } = render(<Ostoskori {...props} />);
    const items = getAllByRole("listitem");
    expect(items.length).toBe(2);
  });

  it("displays the total price", () => {
    const { getByText } = render(<Ostoskori {...props} />);
    const totalPrice = getByText("Yhteensä: 30 €");
    expect(totalPrice).toBeInTheDocument();
  });

  it("removes an item when the 'minus' button is clicked", () => {
    const { getAllByText } = render(<Ostoskori {...props} />);
    const minusButtons = getAllByText("-");
    fireEvent.click(minusButtons[0]);
    expect(props.setItems).toHaveBeenCalledWith([
      {
        tuotenimi: "Item 2",
        hinta: 20,
        kuva: "https://example.com/item2.jpg",
        tuoteid: 2,
      },
    ]);
  });

  it("adds an item when the 'plus' button is clicked", () => {
    const newItem = {
      tuotenimi: "Item 3",
      hinta: 30,
      kuva: "https://example.com/item3.jpg",
      tuoteid: 3,
    };
    const { getByText } = render(<Ostoskori {...props} />);
    const addButton = getByText("+");
    fireEvent.click(addButton);
    expect(props.setItems).toHaveBeenCalledWith([...props.items, newItem]);
  });
});

//renders a list of items: checks that the component
// renders a list with the correct number of items based on the props passed in.

//displays the total price: checks that the component displays the correct total price based on the props passed in.

//removes an item when the 'minus' button is clicked: simulates a click on the "minus" button
// for the first item in the list and checks that the setItems prop is called with the expected value (i.e. the first item removed).

//adds an item when the 'plus' button is clicked: simulates a click on the "plus" button and checks
//that the setItems prop is called with the expected value (i.e. the existing items plus a new item).
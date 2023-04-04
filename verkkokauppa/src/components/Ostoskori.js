import React, { useState } from "react";

function Ostoskori() {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems([...items, item]);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <div>
        <button onClick={() => addItem({ name: "Item 1", price: 10 })}>
          Add Item 1
        </button>
        <button onClick={() => addItem({ name: "Item 2", price: 20 })}>
          Add Item 2
        </button>
      </div>
      <div>
        <h2>Items</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price}
              <button onClick={() => removeItem(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Total: ${getTotal()}</h2>
      </div>
    </div>
  );
}

export default Ostoskori;
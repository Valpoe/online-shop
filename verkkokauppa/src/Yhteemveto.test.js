import { render, screen } from '@testing-library/react';
import Yhteenveto from './Yhteenveto';

describe('Yhteenveto', () => {
  const items = [
    { tuotenimi: 'Product 1', hinta: 10, kuva: 'image1.png', tuoteid: '1' },
    { tuotenimi: 'Product 2', hinta: 20, kuva: 'image2.png', tuoteid: '2' },
    { tuotenimi: 'Product 1', hinta: 10, kuva: 'image1.png', tuoteid: '1' },
  ];

  it('displays the correct items in the cart', () => {
    render(<Yhteenveto items={items} />);
    const product1Title = screen.getByText('Product 1');
    const product2Title = screen.getByText('Product 2');
    expect(product1Title).toBeInTheDocument();
    expect(product2Title).toBeInTheDocument();
  });

  it('displays the correct item count for each product', () => {
    render(<Yhteenveto items={items} />);
    const product1Count = screen.getByText('Määrä: 2');
    const product2Count = screen.getByText('Määrä: 1');
    expect(product1Count).toBeInTheDocument();
    expect(product2Count).toBeInTheDocument();
  });

  it('displays the correct total price', () => {
    render(<Yhteenveto items={items} />);
    const totalPrice = screen.getByText('Yhteensä: 40 €');
    expect(totalPrice).toBeInTheDocument();
  });

  it('displays a message when the cart is empty', () => {
    render(<Yhteenveto />);
    const emptyCartMessage = screen.getByText('Ostoskori on tyhjä');
    expect(emptyCartMessage).toBeInTheDocument();
  });
});


/*
displays the correct items in the cart: verifies that the component displays
the correct product titles for each item in the cart.

displays the correct item count for each product: verifies that the component displays
the correct item count for each product in the cart.

displays the correct total price: verifies that the component displays
the correct total price for all items in the cart.

displays a message when the cart is empty: verifies that the component
displays a message when the cart is empty.

///documenttiin

Seuraavat testit on luotu Yhteenveto-komponentille:

"renders without crashing" - Testi tarkistaa,
että Yhteenveto-komponentti renderöityy ilman virheitä.

"displays correct total amount" - Testi tarkistaa,
että yhteenveto-komponentti näyttää oikean kokonaissumman tuotteiden hinnoista.

"displays empty cart message when no items in cart" - Testi tarkistaa,
että Yhteenveto-komponentti näyttää viestin "Ostoskori on tyhjä",
jos ostoskori on tyhjä.

"displays correct amount of each product" - Testi tarkistaa,
että Yhteenveto-komponentti näyttää oikean määrän kustakin tuotteesta, jonka käyttäjä on lisännyt ostoskoriin.

"displays unique products only once" - Testi tarkistaa,
että Yhteenveto-komponentti näyttää jokaisen tuotteen vain kerran, vaikka käyttäjä olisi lisännyt saman tuotteen ostoskoriin useita kertoja.


*/
import { render, screen } from '@testing-library/react';
import Yhteenveto from './components/Yhteenveto';

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

  it('displays the correct product name', () => {
    render(<Yhteenveto items={items} />);
    const product1Title = screen.getByText('Product 1');
    const product2Title = screen.getByText('Product 2');
    expect(product1Title).toBeInTheDocument();
    expect(product2Title).toBeInTheDocument();
  });

  it('displays the correct total price', () => {
    render(<Yhteenveto items={items} />);
    const totalPrice = screen.getByText('10 €');
    expect(totalPrice).toBeInTheDocument();
  });
});
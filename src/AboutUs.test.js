import React from "react";
import { render, screen,  } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import AboutUs from "./Pages/AboutUs";
import { MDBTypography} from "mdb-react-ui-kit";

describe("AboutUs component", () => {
    it("should render without errors", () => {
      render(
      <MemoryRouter>
      <AboutUs />
      </MemoryRouter>
      );

      expect(screen.getByText('Tietoa meistä')).toBeInTheDocument();
      expect(screen.getByText('Yrityksemme')).toBeInTheDocument();
     
    });

    describe('AboutUs component', () => {
        it('should render three images', () => {
          render(<AboutUs />);
          const images = screen.getAllByRole('img');
          expect(images).toHaveLength(3);
        });
      
        it('should render the correct alt text for each image', () => {
          render(<AboutUs />);
          const images = screen.getAllByRole('img');
          const altTexts = ['Kuva 1', 'Kuva 2', 'Kuva 3'];
          images.forEach((img, index) => {
            expect(img).toHaveAttribute('alt', altTexts[index]);
          });
        });
    });


});
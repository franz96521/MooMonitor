import { render } from "@testing-library/react";
import Footer from "../../../components/footer/Footer.component";

describe("Footer component", () => {
  it("should render the logo", () => {
    const { getByAltText } = render(<Footer />);
    const logo = getByAltText("logo");
    expect(logo).toBeInTheDocument();
  });

  it("should render the company name", () => {
    const { getByText } = render(<Footer />);
    const companyName = getByText(/limited/i);
    expect(companyName).toBeInTheDocument();
  });

  it("should render the current year", () => {
    const { getByText } = render(<Footer />);
    const  year = new Date().getFullYear().toString();
    console.log("hello",year);
    const currentYear = getByText(`Copyright © ${year} Limited`);
    expect(currentYear).toBeInTheDocument();
  });
});

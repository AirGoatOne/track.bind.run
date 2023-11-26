import { render, screen } from "@testing-library/react";
import Altitude from "./Altitude";
test("altitude should display current altitude value", () => {
  const alt = 1250;
  render(<Altitude altitude={alt} />);
  const val = screen.getByTestId("altitude");
  expect(val.textContent).toContain(1250);
});

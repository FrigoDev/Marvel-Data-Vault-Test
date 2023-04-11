import { render } from "@testing-library/react";

import Loader from "./index";

describe("Loader", () => {
  it("should render", () => {
    const { container } = render(<Loader />);
    expect(container).toMatchSnapshot();
  });
});

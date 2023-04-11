import { test } from "@jest/globals";
import { render } from "@testing-library/react";

import Home from "./index";

test("The content should be renderer", () => {
  const component = render(<Home />);
  component.getByText("Marvel Data Vault");
});

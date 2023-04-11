import { render } from "@testing-library/react";

import formats from "../../constants/formats";

import FilterSelect from "./index";

describe("FilterSelect", () => {
  it("should render", () => {
    const change = jest.fn();
    const { container } = render(
      <FilterSelect
        data={formats}
        defaultValue="All"
        name="test"
        onChange={change}
      />
    );
    const select = container.querySelector("select");
    expect(select?.childNodes[1].textContent).toBe(formats[1]);
  });
});

export {};

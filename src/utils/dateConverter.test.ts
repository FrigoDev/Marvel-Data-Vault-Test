import dateConverter from "./dateConverter";

describe("dateConverter function", () => {
  it("should convert a valid date string to DD/MM/YYYY format", () => {
    expect(dateConverter("2014-04-29T14:18:17-0400")).toBe("29/4/2014");
    expect(dateConverter("2013-09-18T15:54:04-0400")).toBe("18/9/2013");
    expect(dateConverter("1969-12-31T19:00:00-0500")).toBe("31/12/1969");
  });

  it("should handle empty input string", () => {
    expect(dateConverter("")).toBeNull();
  });

  it("should handle invalid date strings", () => {
    expect(dateConverter("invalid date")).toBeNull();
    expect(dateConverter("2023-13-01T00:00:00-0400")).toBeNull();
  });
});

export default dateConverter;

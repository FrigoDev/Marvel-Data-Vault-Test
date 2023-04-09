import paramsToObject from "./paramsToObject";
describe("paramsToObject", () => {
  it("should return an object with the params", () => {
    const params = new URLSearchParams("foo=bar&baz=qux");
    const result = paramsToObject(params.entries());
    expect(result).toEqual({ foo: "bar", baz: "qux" });
  });
});

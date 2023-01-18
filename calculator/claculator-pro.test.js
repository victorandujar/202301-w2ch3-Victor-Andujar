import sum from "./calculator_pro";

describe("Given a function sum", () => {
  describe("When it recives number 5 and 5", () => {
    test("Then it should return 10", () => {
      const number1 = 5;
      const number2 = 5;
      const expectedResult = 10;

      const result = sum(number1, number2);

      expect(result).toBe(expectedResult);
    });
  });
});

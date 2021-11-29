import * as timeHelpers from '../timeHelpers';

describe("to12H", () => {
  const { to12H } = timeHelpers;
  it("exists", () => {
    expect(to12H).toBeDefined();
  })
  it("returns a single value when given one argument", () => {
    expect(typeof to12H(2)).toBe("number");
    expect(typeof to12H(15)).toBe("number");
  })
  it("returns an array when given multiple arguments", () => {
    expect(to12H(2, 15)).toBeInstanceOf(Array)
    expect(to12H(0, 15, 20, 23, 2)).toBeInstanceOf(Array)
    expect(to12H(0, 15, 20, 23, 2)).toHaveLength(5)
  })
  it("returns the correct 12h values for each input", () => {
    expect(to12H(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
                 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23))
      .toStrictEqual([12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
                      12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  })
})

describe("getHM24", () => {

})

describe("getHMO12", () => {
  const { getHMO12 } = timeHelpers
  it("exists", () => {
    
  })
})
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
    expect(getHMO12).toBeDefined();
  })
  it("returns the correct hour, minute, and offset for all non-12 and -24 times", () => {
    const testDate = new Date();
    for (let h = 1; h < 12; h++) {
      for (let m = 0; m < 60; m++) {
        testDate.setHours(h, m);
        expect(getHMO12(testDate)).toStrictEqual([h, m, 0])
      }
    }

    for (let h = 13; h < 24; h++) {
      for (let m = 0; m < 60; m++) {
        testDate.setHours(h, m);
        expect(getHMO12(testDate)).toStrictEqual([h - 12, m, 12])
      }
    }
  })
  it("returns the correct hour, minute, and offset for 0 and 12 hour values", () => {
    const testDate = new Date();
    testDate.setHours(0)
    for (let m = 0; m < 60; m++) {
      testDate.setMinutes(m);
      expect(getHMO12(testDate)).toStrictEqual([12, m, 0])
    }
    testDate.setHours(12)
    for (let m = 0; m < 60; m++) {
      testDate.setMinutes(m);
      expect(getHMO12(testDate)).toStrictEqual([12, m, 0])
    }
  })
})
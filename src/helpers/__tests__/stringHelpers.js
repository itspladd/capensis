import * as stringHelpers from '../stringHelpers';

describe("amOrPm", () =>{
  const { amOrPm } = stringHelpers;
  it('exists', () => {
    expect(amOrPm).toBeDefined();
  })
  it('returns "am" for inputs under 12', () => {
    expect(amOrPm(0)).toBe("am")
  })
  it('returns "pm" for inputs over or equal to 12', () => {
    expect(amOrPm(12)).toBe("pm")
    expect(amOrPm(13)).toBe("pm")
    expect(amOrPm(23)).toBe("pm")
  })
})

describe("intervalAMPM", () =>{
  const { intervalAMPM } = stringHelpers;
  it('exists', () => {
    expect(intervalAMPM).toBeDefined();
  })
  it('returns ["", "am/pm"] for inputs with the same AM and PM', () => {
    expect(intervalAMPM(12, 13)).toStrictEqual(["", "pm"])
    expect(intervalAMPM(0, 11)).toStrictEqual(["", "am"])
  })
  it('returns ["am", "pm"] for inputs with the differing AM and PM', () => {
    expect(intervalAMPM(11, 13)).toStrictEqual(["am", "pm"])
    expect(intervalAMPM(0, 14)).toStrictEqual(["am", "pm"])
  })
})
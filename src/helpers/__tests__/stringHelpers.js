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

describe("intervalAMPM", () => {
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
    expect(intervalAMPM(1, 12)).toStrictEqual(["am", "pm"])
  })
})

describe("makeShortIntervalString", () => {
  const { makeShortIntervalString } = stringHelpers;
  const time1 = new Date();
  const time2 = new Date();
  it('exists', () => {
    expect(makeShortIntervalString).toBeDefined();
  })
  it("Displays single-digit hours and double-digit minutes with AM/PM", () => {
    time1.setHours(1, 45);
    time2.setHours(12, 30);
    expect(makeShortIntervalString(time1, time2)).toStrictEqual("1:45am – 12:30pm")
  })
  it("Omits minutes if they are 0", () => {
    time1.setHours(1, 0);
    time2.setHours(2, 0);
    expect(makeShortIntervalString(time1, time2)).toStrictEqual("1 – 2am")
  })
  it("Properly accounts for PM hours in 12h format", () => {
    time1.setHours(12, 45)
    time2.setHours(18, 0)
    expect(makeShortIntervalString(time1, time2)).toStrictEqual("12:45 – 6pm")
    time1.setHours(0, 45)
    time2.setHours(23, 15)
    expect(makeShortIntervalString(time1, time2)).toStrictEqual("12:45am – 11:15pm")
  })
})
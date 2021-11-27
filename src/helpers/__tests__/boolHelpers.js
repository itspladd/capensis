import * as boolHelpers from '../boolHelpers';

describe("truthyOrLengthy", () =>{
  const { truthyOrLengthy } = boolHelpers;
  it('exists', () => {
    expect(truthyOrLengthy).toBeDefined();
  })
  it('returns false for all falsy values', () => {
    expect(truthyOrLengthy(false)).toBe(false)
    expect(truthyOrLengthy(0)).toBe(false)
    expect(truthyOrLengthy(-0)).toBe(false)
    expect(truthyOrLengthy(0n)).toBe(false)
    expect(truthyOrLengthy("")).toBe(false)
    expect(truthyOrLengthy(null)).toBe(false)
    expect(truthyOrLengthy(undefined)).toBe(false)
    expect(truthyOrLengthy(NaN)).toBe(false)
  })
})